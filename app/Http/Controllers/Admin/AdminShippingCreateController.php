<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Shipping;
use App\Models\ShippingProvider;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminShippingCreateController extends Controller
{
    public function create(Order $order)
    {
        // Lấy danh sách providers và staff
        $providers = ShippingProvider::where('is_active', true)->get();
        $staffList = Staff::with('user')
            ->where('is_active', true)
            ->get()
            ->map(function ($staff) {
                return [
                    'id' => $staff->id,
                    'name' => $staff->user->name,
                    'position' => $staff->position,
                    'phone' => $staff->phone,
                ];
            });

        return response()->json([
            'providers' => $providers,
            'staff' => $staffList,
        ]);
    }

    public function store(Request $request, Order $order)
    {
        $validated = $request->validate([
            'shipping_type' => 'required|in:internal,external',
            'shipping_provider_id' => 'required_if:shipping_type,external|nullable|exists:shipping_providers,id',
            'staff_id' => 'required_if:shipping_type,internal|nullable|exists:staff,id',
            'weight_kg' => 'required|numeric|min:0.1',
            'notes' => 'nullable|string',
        ]);

        // Tính phí vận chuyển
        $shippingFee = 0;
        $carrierName = '';

        if ($validated['shipping_type'] === 'external' && $validated['shipping_provider_id']) {
            $provider = ShippingProvider::find($validated['shipping_provider_id']);
            $shippingFee = $provider->calculateFee($validated['weight_kg']);
            $carrierName = $provider->name;
        } else if ($validated['shipping_type'] === 'internal' && $validated['staff_id']) {
            $staff = Staff::with('user')->find($validated['staff_id']);
            $carrierName = 'Giao hàng nội bộ - ' . $staff->user->name;
            // Phí nội bộ có thể cố định hoặc tính theo cách khác
            $shippingFee = 1000000; // 10,000 VND cố định
        }

        // Tạo tracking code
        $trackingCode = 'SHIP-' . strtoupper(Str::random(8));

        // Tạo shipping
        $shipping = Shipping::create([
            'order_id' => $order->id,
            'shipping_type' => $validated['shipping_type'],
            'shipping_provider_id' => $validated['shipping_provider_id'] ?? null,
            'staff_id' => $validated['staff_id'] ?? null,
            'tracking_code' => $trackingCode,
            'carrier_name' => $carrierName,
            'method' => $validated['shipping_type'] === 'external' ? 'express' : 'standard',
            'status' => 'pending',
            'shipping_fee_cents' => $shippingFee,
            'weight_kg' => $validated['weight_kg'],
            'notes' => $validated['notes'],
        ]);

        // Cập nhật trạng thái đơn hàng
        $order->update([
            'status' => 'processing',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đã tạo vận chuyển thành công',
            'shipping' => $shipping->load(['shippingProvider', 'staff.user']),
        ]);
    }

    public function calculateFee(Request $request)
    {
        $validated = $request->validate([
            'shipping_type' => 'required|in:internal,external',
            'shipping_provider_id' => 'nullable|exists:shipping_providers,id',
            'weight_kg' => 'required|numeric|min:0.1',
        ]);

        $fee = 0;

        if ($validated['shipping_type'] === 'external' && isset($validated['shipping_provider_id'])) {
            $provider = ShippingProvider::find($validated['shipping_provider_id']);
            if ($provider) {
                $fee = $provider->calculateFee($validated['weight_kg']);
            }
        } else {
            $fee = 1000000; // 10,000 VND cho internal
        }

        return response()->json([
            'fee_cents' => $fee,
            'fee_vnd' => $fee / 100,
        ]);
    }
}
