<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::query();

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }
        // Filter by date range
        if ($request->filled('from')) {
            $query->whereDate('placed_at', '>=', $request->input('from'));
        }
        if ($request->filled('to')) {
            $query->whereDate('placed_at', '<=', $request->input('to'));
        }

        $perPage = (int) $request->input('perPage', 10);
        $orders = $query->orderByDesc('placed_at')->paginate($perPage)->withQueryString();

        return Inertia::render('admin/AdminOrders', [
            'orders' => $orders,
            'filters' => $request->only(['status', 'from', 'to', 'perPage'])
        ]);
    }

    public function show(Order $order)
    {
        $order->load('items.product', 'user');
        return Inertia::render('admin/AdminOrderDetail', [
            'order' => $order
        ]);
    }
}
