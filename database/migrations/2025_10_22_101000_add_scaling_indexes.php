<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Products: common filters
        Schema::table('products', function (Blueprint $table) {
            $table->index(['is_active', 'created_at'], 'products_active_created_idx');
            $table->index('price_cents', 'products_price_idx');
        });

        // Carts: lookup by session
        Schema::table('carts', function (Blueprint $table) {
            $table->index('session_id', 'carts_session_idx');
            $table->index('user_id', 'carts_user_idx');
        });

        // Cart items: lookup product in cart
        Schema::table('cart_items', function (Blueprint $table) {
            $table->index('product_id', 'cart_items_product_idx');
        });

        // Orders: customer history and reporting
        Schema::table('orders', function (Blueprint $table) {
            $table->index(['user_id', 'placed_at'], 'orders_user_placed_idx');
            $table->index('placed_at', 'orders_placed_idx');
            $table->index('order_number', 'orders_order_number_idx');
        });

        // Order items: analytics by product
        Schema::table('order_items', function (Blueprint $table) {
            $table->index('product_id', 'order_items_product_idx');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_active_created_idx');
            $table->dropIndex('products_price_idx');
        });

        Schema::table('carts', function (Blueprint $table) {
            $table->dropIndex('carts_session_idx');
            $table->dropIndex('carts_user_idx');
        });

        Schema::table('cart_items', function (Blueprint $table) {
            $table->dropIndex('cart_items_product_idx');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex('orders_user_placed_idx');
            $table->dropIndex('orders_placed_idx');
            $table->dropIndex('orders_order_number_idx');
        });

        Schema::table('order_items', function (Blueprint $table) {
            $table->dropIndex('order_items_product_idx');
        });
    }
};
