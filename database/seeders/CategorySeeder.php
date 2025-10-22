<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Electronics',
            'Books',
            'Clothing',
            'Home & Kitchen',
            'Toys',
            'Garden',
            'Sports',
            'Health',
            'Beauty',
            'Automotive',
            'Grocery',
            'Office',
            'Pets',
            'Music',
            'Games',
            'Tools',
            'Jewelry',
            'Shoes',
            'Outdoors',
            'Baby'
        ];

        $now = now();
        $rows = [];

        foreach ($categories as $name) {
            $rows[] = [
                'name' => $name,
                'slug' => Str::slug($name),
                'description' => $name . ' products',
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        DB::table('categories')->insertOrIgnore($rows);
    }
}
