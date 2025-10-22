<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Use env var PRODUCT_SEED_COUNT or default to 100000
        $total = (int) (env('PRODUCT_SEED_COUNT') ?: 100000);
        $batch = 2000; // insert per batch to avoid large memory
        $now = now();

        for ($i = 0; $i < $total; $i += $batch) {
            $rows = [];
            $limit = min($batch, $total - $i);

            for ($j = 0; $j < $limit; $j++) {
                $idx = $i + $j + 1;
                $title = 'Product ' . $idx;
                $rows[] = [
                    'title' => $title,
                    'slug' => Str::slug($title) . '-' . $idx,
                    'description' => 'Description for ' . $title,
                    'price_cents' => rand(100, 100000),
                    'stock' => rand(0, 1000),
                    'is_active' => true,
                    'metadata' => json_encode(['color' => 'var-' . rand(1, 10)]),
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }

            DB::table('products')->insert($rows);
            $this->command->info('Inserted ' . min($i + $batch, $total) . ' / ' . $total . ' products');
        }
    }
}
