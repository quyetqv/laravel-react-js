<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categoryIds = DB::table('categories')->pluck('id')->toArray();
        $total = DB::table('products')->count();
        $batch = 5000;

        for ($offset = 0; $offset < $total; $offset += $batch) {
            $products = DB::table('products')->select('id')->offset($offset)->limit($batch)->get();
            $rows = [];

            foreach ($products as $p) {
                // attach 1-3 random categories
                $count = rand(1, 3);
                $picked = (array) array_rand(array_flip($categoryIds), $count);

                foreach ($picked as $catId) {
                    $rows[] = [
                        'product_id' => $p->id,
                        'category_id' => $catId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            if (!empty($rows)) {
                DB::table('category_product')->insertOrIgnore($rows);
            }

            $this->command->info('Assigned categories to products up to offset ' . $offset);
        }
    }
}
