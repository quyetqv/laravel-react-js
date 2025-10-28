<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        // Bộ lọc
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->input('search') . '%');
        }
        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }
        // Thêm các bộ lọc khác nếu cần

        $perPage = (int) $request->input('perPage', 10);
        $products = $query->orderByDesc('created_at')->paginate($perPage)->withQueryString();

        return Inertia::render('admin/AdminProducts', [
            'products' => $products,
            'filters' => $request->only(['search', 'is_active', 'perPage'])
        ]);
    }
}
