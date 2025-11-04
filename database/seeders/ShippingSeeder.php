<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ShippingSeeder extends Seeder
{
    public function run(): void
    {
        // Lấy 3 đơn hàng đầu tiên để gán shipping mẫu
        $orders = DB::table('orders')->orderBy('id')->limit(3)->get();
        $shippingData = [
            [
                'method' => 'internal',
                'carrier_name' => 'Nguyễn Văn Ship',
                'tracking_code' => 'SHIP001',
                'status' => 'shipping',
                'meta' => json_encode(['phone' => '0901234567', 'note' => 'Giao giờ hành chính']),
            ],
            [
                'method' => 'grab',
                'carrier_name' => 'GrabExpress',
                'tracking_code' => 'GRAB123456',
                'status' => 'pending',
                'meta' => json_encode(['note' => 'Chờ tài xế nhận đơn']),
            ],
            [
                'method' => 'ghn',
                'carrier_name' => 'GHN',
                'tracking_code' => 'GHN78910',
                'status' => 'delivered',
                'meta' => json_encode(['note' => 'Đã giao thành công']),
            ],
        ];
        foreach ($orders as $i => $order) {
            DB::table('shippings')->insert([
                'order_id' => $order->id,
                'method' => $shippingData[$i]['method'],
                'carrier_name' => $shippingData[$i]['carrier_name'],
                'tracking_code' => $shippingData[$i]['tracking_code'],
                'status' => $shippingData[$i]['status'],
                'meta' => $shippingData[$i]['meta'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
