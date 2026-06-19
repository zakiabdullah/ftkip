<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('laboratory_id')->constrained('laboratories')->onDelete('cascade');
            $table->foreignId('equipment_id')->nullable()->constrained('equipment')->onDelete('set null');
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->text('purpose');
            $table->boolean('safety_declared')->default(false);
            $table->enum('status', ['pending_supervisor', 'pending_admin', 'approved', 'rejected', 'cancelled'])->default('pending_supervisor');
            $table->foreignId('supervisor_id')->constrained('users');
            $table->foreignId('approved_by_supervisor_id')->nullable()->constrained('users');
            $table->foreignId('approved_by_admin_id')->nullable()->constrained('users');
            $table->text('rejection_reason')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};