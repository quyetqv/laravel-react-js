<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shipping extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'shipping_type',
        'shipping_provider_id',
        'staff_id',
        'method',
        'carrier_name',
        'tracking_code',
        'status',
        'shipping_fee_cents',
        'weight_kg',
        'notes',
        'meta',
        'price_cents',
    ];

    protected $casts = [
        'meta' => 'array',
        'shipping_fee_cents' => 'integer',
        'weight_kg' => 'decimal:2',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function shippingProvider(): BelongsTo
    {
        return $this->belongsTo(ShippingProvider::class);
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }
}
