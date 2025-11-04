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

    public function checkout(Request $request)
    {
        $cart = session()->get('cart', []);
        if (empty($cart)) {
            return back()->with('error', 'Giỏ hàng trống!');
        }

        $user = $request->user();
        $productIds = array_keys($cart);
        $products = \App\Models\Product::whereIn('id', $productIds)->get();

        $totalCents = 0;
        foreach ($products as $product) {
            $totalCents += $product->price_cents * ($cart[$product->id] ?? 1);
        }

        // Validate thông tin khách hàng
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:32',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:255',
            'payment_method' => 'required|string',
        ]);

        // Tạo order
        $order = \App\Models\Order::create([
            'user_id' => $user ? $user->id : null,
            'order_number' => 'ORD' . time() . rand(100, 999),
            'total_cents' => $totalCents,
            'status' => 'pending',
            'payment_status' => strtoupper($data['payment_method'] ?? 'COD'),
            'placed_at' => now(),
            'customer_name' => $data['name'],
            'customer_phone' => $data['phone'],
            'customer_email' => $data['email'],
            'customer_address' => $data['address'],
            'payment_method' => $data['payment_method'],
        ]);

        // Tạo order_items
        foreach ($products as $product) {
            \App\Models\OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $cart[$product->id] ?? 1,
                'price_cents' => $product->price_cents,
                'meta' => json_encode([
                    'title' => $product->title,
                ]),
            ]);
        }

        session()->forget('cart');

        return back()->with('success', 'Đặt hàng thành công! Đơn hàng của bạn đã được ghi nhận.');
    }

    // Update cart quantities
    public function updateCart(Request $request)
    {
        $data = $request->validate([
            'cart' => 'required|array',
            'cart.*' => 'integer|min:1',
        ]);
        session(['cart' => $data['cart']]);
        return back()->with('success', 'Cập nhật giỏ hàng thành công!');
    }
}
