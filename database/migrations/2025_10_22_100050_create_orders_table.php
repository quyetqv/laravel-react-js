<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Create a partitioned orders table by range on placed_at for Postgres
        // This uses declarative partitioning available in Postgres
        // Note: parent partitioned tables in Postgres cannot have UNIQUE/PRIMARY
        // constraints unless the partitioning column(s) are included. To keep
        // the parent table partitionable we create it without PRIMARY KEY or
        // UNIQUE on order_number. Individual partitions can define their own
        // primary keys if desired.
        DB::statement("CREATE TABLE IF NOT EXISTS orders (
            id bigserial,
            user_id bigint REFERENCES users(id) ON DELETE SET NULL,
            order_number varchar,
            total_cents bigint DEFAULT 0,
            status varchar DEFAULT 'pending',
            payment_status varchar,
            shipping_address_id bigint,
            billing_address_id bigint,
            placed_at timestamptz,
            created_at timestamptz DEFAULT now(),
            updated_at timestamptz DEFAULT now()
        ) PARTITION BY RANGE (placed_at);");

        // Create a default partition to catch rows without placed_at
        DB::statement("CREATE TABLE IF NOT EXISTS orders_default PARTITION OF orders DEFAULT;");
    }

    public function down(): void
    {
        // Drop partitions and partitioned table
        DB::statement('DROP TABLE IF EXISTS orders_default');
        DB::statement('DROP TABLE IF EXISTS orders');
    }
};
