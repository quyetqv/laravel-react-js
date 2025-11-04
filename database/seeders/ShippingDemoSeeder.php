<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Shipping;
use App\Models\User;

class ShippingDemoSeeder extends Seeder
{
    public function run(): void
    {
        // Tạo 5 user mẫu
        $users = User::factory()->count(5)->create();

        // Tạo 5 order mẫu, mỗi order có shipping
        foreach ($users as $user) {
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => 'ORD' . now()->timestamp . rand(100, 999),
                'total_cents' => rand(100000, 500000),
                'status' => 'pending',
                'payment_status' => 'COD',
                'placed_at' => now(),
                'customer_name' => $user->name,
                'customer_phone' => '09' . rand(10000000, 99999999),
                'customer_email' => $user->email,
                'customer_address' => 'Số ' . rand(1, 100) . ' Đường ABC, Quận XYZ',
                'payment_method' => 'cod',
            ]);

            Shipping::create([
                'order_id' => $order->id,
                'method' => 'internal',
                'carrier_name' => 'Shipper ' . rand(1, 5),
                'tracking_code' => 'TRACK' . rand(10000, 99999),
                'status' => 'pending',
                'meta' => json_encode(['note' => 'Giao giờ hành chính']),
                'is_active' => true,
                'price_cents' => rand(10000, 30000),
            ]);
        }
    }
}
