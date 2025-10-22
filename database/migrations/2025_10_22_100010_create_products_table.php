<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            // Use BIGINT id for scale
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            // price stored in cents to avoid float issues
            $table->unsignedBigInteger('price_cents')->default(0);
            $table->unsignedInteger('stock')->default(0);
            $table->boolean('is_active')->default(true)->index();
            // use jsonb on Postgres for metadata
            $table->jsonb('metadata')->nullable();
            $table->timestamps();
        });

        // Create a tsvector generated column for fast full-text search and a GIN index
        // Generated columns require Postgres >= 12. If not available, you can maintain the
        // column via triggers or update from application code.
        DB::statement("ALTER TABLE products ADD COLUMN IF NOT EXISTS search_vector tsvector GENERATED ALWAYS AS (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,''))) STORED;");
        DB::statement('CREATE INDEX IF NOT EXISTS products_search_gin_idx ON products USING GIN (search_vector);');
    }

    public function down(): void
    {
        // Drop index and column if exist then drop table
        DB::statement('DROP INDEX IF EXISTS products_search_gin_idx');
        Schema::dropIfExists('products');
    }
};
