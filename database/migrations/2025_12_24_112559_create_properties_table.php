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
        Schema::create('properties', function (Blueprint $table) {
                    $table->id();
            $table->foreignId('city_id')->constrained()->onDelete('cascade');
            $table->foreignId('featured_img_id')->nullable()->constrained('media')->onDelete('set null');
            
            $table->string('street');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();

            // Number típusú mezők string-ként
            $table->string('rental_price')->nullable();
            $table->string('size')->nullable();
            $table->string('sale_price')->nullable();
            $table->string('minimum_rental_period')->nullable();
            $table->string('year_built')->nullable();
            $table->string('building_floors')->nullable();
            $table->string('floor')->nullable();
            $table->string('balcony')->nullable();

            $table->string('furniture')->default('igen');
            $table->string('appliances')->default('igen');
            $table->string('view')->nullable();
            $table->string('heating_type')->nullable();
            $table->string('parking')->nullable();

            // Boolean mezők string-ként
            $table->string('air_conditioning')->default('nem');
            $table->string('smoking')->default('nem');
            $table->string('pets')->default('nem');
            $table->string('elevator')->default('nem');
            $table->string('is_featured')->default('nem');

            $table->string('floor_area')->nullable();
            $table->text('short_description')->nullable();
            $table->text('description')->nullable();
            
            // SEO meta mezők
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
