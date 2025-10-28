<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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

        return Inertia::render('cart/CartList', [
            'items' => $items,
            'cart' => $cart,
        ]);
    }

    // Add product to card
    public function addToCart(Request $request)
    {
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);

        $cart = session()->get('cart', []);
        $cart[$productId] = ($cart[$productId] ?? 0) + $quantity;
        session(['cart' => $cart]);

        return back()->with('success', 'Đã thêm vào giỏ hàng!');
    }

    public function removeFromCart($productId)
    {
        $cart = session()->get('cart', []);
        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            session(['cart' => $cart]);
        }

        return back()->with('success', 'Đã xóa sản phẩm khỏi giỏ hàng!');
    }

    // Checkout form
    public function checkoutForm()
    {
        return Inertia::render('cart/CheckoutForm');
    }

    public function checkout()
    {
        // Logic for checkout process
        // This could involve creating an order, processing payment, etc.

        // For now, we'll just clear the cart
        session()->forget('cart');

        return back()->with('success', 'Thanh toán thành công!');
    }
}
