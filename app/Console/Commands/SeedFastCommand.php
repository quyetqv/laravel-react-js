<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class SeedFastCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:seed:fast {--no-index-drop : Skip dropping heavy indexes}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run db:seed with optional dropping and recreating heavy indexes (Postgres-specific).';

    public function handle(): int
    {
        $conn = config('database.default');
        if ($conn !== 'pgsql') {
            $this->error("This command is intended for Postgres local setups. Current DB connection: {$conn}");
            return 1;
        }

        $this->info('Running fast seed wrapper...');

        $skip = $this->option('no-index-drop');

        try {
            if (!$skip) {
                $this->info('Dropping GIN index products_search_gin_idx if exists...');
                DB::statement('DROP INDEX IF EXISTS products_search_gin_idx');
            }

            $this->info('Running db:seed (this may take a while)...');
            // call the main seeder
            Artisan::call('db:seed', [], $this->getOutput());

            if (!$skip) {
                $this->info('Recreating GIN index and analyzing...');
                DB::statement("CREATE INDEX IF NOT EXISTS products_search_gin_idx ON products USING GIN (search_vector);");
                DB::statement('ANALYZE products');
            }

            $this->info('Seeding finished.');
            return 0;
        } catch (\Exception $e) {
            $this->error('Error during fast seeding: ' . $e->getMessage());
            return 1;
        }
    }
}
