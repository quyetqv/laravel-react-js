<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // Lightweight category seeding always safe
        $this->call(CategorySeeder::class);

        // Heavy product seeding is controlled via env var PRODUCT_SEED_CONFIRM
        // Set PRODUCT_SEED_CONFIRM=true and PRODUCT_SEED_COUNT to start heavy seeding
        if (filter_var(env('PRODUCT_SEED_CONFIRM'), FILTER_VALIDATE_BOOLEAN)) {
            $this->command->info('Starting heavy product seeding...');
            $this->call(ProductSeeder::class);
            $this->call(ProductCategorySeeder::class);
        } else {
            $this->command->info('Skipping heavy product seeding. Set PRODUCT_SEED_CONFIRM=true to enable.');
        }

        // Heavy order seeding is controlled separately
        if (filter_var(env('ORDER_SEED_CONFIRM'), FILTER_VALIDATE_BOOLEAN)) {
            $this->command->info('Starting heavy order seeding...');
            $this->call(OrderSeeder::class);
        } else {
            $this->command->info('Skipping heavy order seeding. Set ORDER_SEED_CONFIRM=true to enable.');
        }

        // User::factory(10)->create();

        $this->call([
            AdminUserSeeder::class,
            ShippingSeeder::class,
            ShippingDemoSeeder::class,
        ]);
    }
}
