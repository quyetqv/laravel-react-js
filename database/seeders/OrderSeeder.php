<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $total = (int) (env('ORDER_SEED_COUNT') ?: 10000);
        $batch = 500; // orders per batch
        $maxItemsPerOrder = (int) (env('ORDER_MAX_ITEMS') ?: 5);

        $userIds = DB::table('users')->pluck('id')->toArray();
        $addressIds = DB::table('addresses')->pluck('id')->toArray();

        // Avoid loading all products into memory. We'll sample product ids using min/max id
        $minId = DB::table('products')->min('id');
        $maxId = DB::table('products')->max('id');
        if (is_null($minId) || is_null($maxId)) {
            $this->command->error('No products found. Run ProductSeeder first.');
            return;
        }

        // small in-memory cache for price lookups to reduce queries
        $priceCache = [];

        $now = now();
        for ($i = 0; $i < $total; $i += $batch) {
            $orders = [];
            $orderNumbers = [];
            $limit = min($batch, $total - $i);

            for ($j = 0; $j < $limit; $j++) {
                $idx = $i + $j + 1;
                $orderNumber = 'ORD-' . date('YmdHis') . '-' . $idx . '-' . Str::random(6);
                $placedAt = now()->subDays(rand(0, 365))->subSeconds(rand(0, 86400));
                $userId = (count($userIds) && rand(1, 100) <= 70) ? $userIds[array_rand($userIds)] : null; // 70% users
                $shipping = (count($addressIds) ? $addressIds[array_rand($addressIds)] : null);

                $orders[] = [
                    'user_id' => $userId,
                    'order_number' => $orderNumber,
                    'total_cents' => 0, // will update after items
                    'status' => 'paid',
                    'payment_status' => 'paid',
                    'shipping_address_id' => $shipping,
                    'billing_address_id' => $shipping,
                    'placed_at' => $placedAt,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

                $orderNumbers[] = $orderNumber;
            }

            // Wrap inserts and related operations in a transaction for consistency.
            DB::transaction(function () use ($orders, $orderNumbers, $now, $maxItemsPerOrder, $minId, $maxId, &$priceCache, &$orderTotals, &$orderItems) {
                DB::table('orders')->insert($orders);

                // Fetch inserted orders to get their IDs. Restrict by created_at to avoid matching
                // any pre-existing rows with the same order_numbers (extremely unlikely but safer).
                $inserted = DB::table('orders')
                    ->whereIn('order_number', $orderNumbers)
                    ->where('created_at', $now)
                    ->get(['id', 'order_number']);

                $orderTotals = [];
                $orderItems = [];

                foreach ($inserted as $ord) {
                    $itemsCount = rand(1, $maxItemsPerOrder);
                    // pick random products (allow duplicates)
                    for ($k = 0; $k < $itemsCount; $k++) {
                        // pick a random product id in range and resolve an existing product
                        $attempts = 0;
                        $pid = null;
                        while ($attempts < 5) {
                            $candidate = rand($minId, $maxId);
                            $exists = DB::table('products')->where('id', $candidate)->exists();
                            if ($exists) {
                                $pid = $candidate;
                                break;
                            }
                            $attempts++;
                        }

                        if (is_null($pid)) {
                            // fallback: pick a random product by query
                            $row = DB::table('products')->inRandomOrder()->select('id', 'price_cents')->first();
                            if (!$row) continue;
                            $pid = $row->id;
                            $price = $row->price_cents;
                        } else {
                            if (isset($priceCache[$pid])) {
                                $price = $priceCache[$pid];
                            } else {
                                $price = DB::table('products')->where('id', $pid)->value('price_cents') ?: 0;
                                $priceCache[$pid] = $price;
                                // keep cache small
                                if (count($priceCache) > 1000) {
                                    array_shift($priceCache);
                                }
                            }
                        }
                        $qty = rand(1, 3);
                        $orderItems[] = [
                            'order_id' => $ord->id,
                            'product_id' => $pid,
                            'quantity' => $qty,
                            'price_cents' => $price,
                            'meta' => json_encode([]),
                            'created_at' => $now,
                            'updated_at' => $now,
                        ];

                        $orderTotals[$ord->id] = ($orderTotals[$ord->id] ?? 0) + ($price * $qty);
                    }
                }

                // Insert order items in chunks
                foreach (array_chunk($orderItems, 2000) as $chunk) {
                    DB::table('order_items')->insert($chunk);
                }

                // Update orders totals
                foreach ($orderTotals as $orderId => $totalCents) {
                    DB::table('orders')->where('id', $orderId)->update(['total_cents' => $totalCents]);
                }
            });

            $this->command->info('Inserted orders up to ' . min($i + $batch, $total));
        }
    }
}
