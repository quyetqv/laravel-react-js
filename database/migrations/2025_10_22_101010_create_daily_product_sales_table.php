<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('daily_product_sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->date('sales_date')->index();
            $table->unsignedBigInteger('units_sold')->default(0);
            $table->unsignedBigInteger('revenue_cents')->default(0);
            $table->timestamps();
            $table->unique(['product_id', 'sales_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('daily_product_sales');
    }
};
