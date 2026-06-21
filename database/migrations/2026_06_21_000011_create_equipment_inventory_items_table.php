<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipment_inventory_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('laboratory_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->unsignedInteger('quantity')->default(1);
            $table->enum('unit_type', ['unit', 'set', 'piece', 'license'])->default('unit');
            $table->boolean('track_individually')->default(false);
            $table->enum('status', ['available', 'maintenance', 'damaged', 'retired'])->default('available');
            $table->text('source_text')->nullable();
            $table->timestamps();

            $table->unique(['laboratory_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment_inventory_items');
    }
};
