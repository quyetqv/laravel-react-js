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
        Schema::table('shippings', function (Blueprint $table) {
            $table->string('shipping_type')->default('internal')->after('order_id'); // internal, external
            $table->foreignId('shipping_provider_id')->nullable()->after('shipping_type')->constrained('shipping_providers')->onDelete('set null');
            $table->foreignId('staff_id')->nullable()->after('shipping_provider_id')->constrained('staff')->onDelete('set null');
            $table->integer('shipping_fee_cents')->default(0)->after('staff_id');
            $table->decimal('weight_kg', 8, 2)->nullable()->after('shipping_fee_cents');
            $table->text('notes')->nullable()->after('weight_kg');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shippings', function (Blueprint $table) {
            $table->dropForeign(['shipping_provider_id']);
            $table->dropForeign(['staff_id']);
            $table->dropColumn(['shipping_type', 'shipping_provider_id', 'staff_id', 'shipping_fee_cents', 'weight_kg', 'notes']);
        });
    }
};
