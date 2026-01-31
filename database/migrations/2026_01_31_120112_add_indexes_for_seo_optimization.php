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
        // Properties tábla indexek
        Schema::table('properties', function (Blueprint $table) {
            // Slug index - egyedi URL-ek gyors kereséséhez
            $table->index('slug');
            
            // City ID index - városonkénti szűréshez
            $table->index('city_id');
            
            // Created at index - legújabb ingatlanok listázásához
            $table->index('created_at');
            
            // Updated at index - sitemap lastmod-hoz
            $table->index('updated_at');
        });

        // Cities tábla indexek
        Schema::table('cities', function (Blueprint $table) {
            // Slug index - egyedi URL-ek gyors kereséséhez
            $table->index('slug');
            
            // Updated at index - sitemap lastmod-hoz
            $table->index('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropIndex(['slug']);
            $table->dropIndex(['city_id']);
            $table->dropIndex(['created_at']);
            $table->dropIndex(['updated_at']);
        });

        Schema::table('cities', function (Blueprint $table) {
            $table->dropIndex(['slug']);
            $table->dropIndex(['updated_at']);
        });
    }
};
