<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->input('perPage', 12);
        $products = Product::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Welcome', [
            'products' => $products,
            // check if a 'register' route exists
            'canRegister' => Route::has('register'),
        ]);
    }
    public function show(Product $product)
    {
        return Inertia::render('ProductDetail', [
            'product' => $product,
        ]);
    }
}
