<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function add(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'nullable|integer|min:1',
        ]);

        $quantity = $data['quantity'] ?? 1;

        $cart = Session::get('cart', []);

        if (isset($cart[$data['product_id']])) {
            $cart[$data['product_id']] += $quantity;
        } else {
            $cart[$data['product_id']] = $quantity;
        }

        Session::put('cart', $cart);

        return response()->json(['success' => true, 'cart' => $cart]);
    }

    public function get()
    {
        $cart = Session::get('cart', []);
        $productIds = array_keys($cart);
        $items = [];
        if (count($productIds)) {
            $items = DB::table('products')->whereIn('id', $productIds)->get();
        }

        return response()->json(['cart' => $cart, 'items' => $items]);
    }
}
