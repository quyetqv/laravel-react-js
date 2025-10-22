<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            // Do not add a foreign key to partitioned 'orders' parent table here.
            // Postgres requires the referenced columns to have a unique constraint
            // including the partition key. We store order_id and add an index.
            $table->unsignedBigInteger('order_id')->index();
            $table->foreignId('product_id')->constrained()->onDelete('restrict');
            $table->unsignedInteger('quantity')->default(1);
            $table->unsignedBigInteger('price_cents')->default(0);
            $table->json('meta')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
