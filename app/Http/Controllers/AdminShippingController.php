<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Shipping;
use Faker\Calculator\Inn;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class AdminShippingController extends Controller
{
    public function index(Request $request)
    {
        // Logic to retrieve and display shipping information
        $shippings = Shipping::orderBy('created_at', 'desc')
            ->when($request->status, function ($q, $status) {
                if ($status === 'active') return $q->where('is_active', true);
                if ($status === 'inactive') return $q->where('is_active', false);
            })
            ->with('order')
            ->paginate($request->input('perPage', 10))
            ->withQueryString();

        return Inertia::render('admin/AdminShippings', [
            'shippings' => $shippings,
            'filters' => $request->only(['status', 'perPage']),
        ]);
    }
}
