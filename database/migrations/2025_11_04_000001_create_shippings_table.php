<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('shippings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id')->index();
            $table->string('method'); // internal, grab, ghn, etc
            $table->string('carrier_name')->nullable(); // Tên đơn vị vận chuyển hoặc nhân viên
            $table->string('tracking_code')->nullable();
            $table->string('status')->default('pending'); // pending, shipping, delivered, failed, cancelled
            $table->json('meta')->nullable(); // Thông tin bổ sung (số điện thoại shipper, ghi chú, ...)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shippings');
    }
};
