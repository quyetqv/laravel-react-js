<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingProvider extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
        'base_price_cents',
        'price_per_kg_cents',
        'is_active',
        'config',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'config' => 'array',
        'base_price_cents' => 'integer',
        'price_per_kg_cents' => 'decimal:2',
    ];

    public function shippings()
    {
        return $this->hasMany(Shipping::class);
    }

    public function calculateFee($weightKg)
    {
        return $this->base_price_cents + ($this->price_per_kg_cents * $weightKg * 100);
    }
}
