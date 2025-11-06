<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShippingProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $providers = [
            [
                'name' => 'Giao Hàng Nhanh',
                'code' => 'ghn',
                'description' => 'Giao hàng nhanh - GHN',
                'base_price_cents' => 2000000, // 20,000 VND
                'price_per_kg_cents' => 500000, // 5,000 VND/kg
                'is_active' => true,
            ],
            [
                'name' => 'Giao Hàng Tiết Kiệm',
                'code' => 'ghtk',
                'description' => 'Giao hàng tiết kiệm - GHTK',
                'base_price_cents' => 1800000, // 18,000 VND
                'price_per_kg_cents' => 450000, // 4,500 VND/kg
                'is_active' => true,
            ],
            [
                'name' => 'Viettel Post',
                'code' => 'viettel_post',
                'description' => 'Viettel Post - Bưu điện Viettel',
                'base_price_cents' => 2200000, // 22,000 VND
                'price_per_kg_cents' => 550000, // 5,500 VND/kg
                'is_active' => true,
            ],
            [
                'name' => 'Vietnam Post',
                'code' => 'vnpost',
                'description' => 'Bưu điện Việt Nam',
                'base_price_cents' => 1500000, // 15,000 VND
                'price_per_kg_cents' => 400000, // 4,000 VND/kg
                'is_active' => true,
            ],
        ];

        foreach ($providers as $provider) {
            \App\Models\ShippingProvider::create($provider);
        }
    }
}
