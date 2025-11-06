<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shipping_providers', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // GHN, GHTK, Viettel Post, etc.
            $table->string('code')->unique(); // ghn, ghtk, viettel_post
            $table->text('description')->nullable();
            $table->integer('base_price_cents')->default(0); // Phí cơ bản (cents)
            $table->decimal('price_per_kg_cents', 10, 2)->default(0); // Phí/kg (cents)
            $table->boolean('is_active')->default(true);
            $table->json('config')->nullable(); // API keys, webhook URLs, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipping_providers');
    }
};
