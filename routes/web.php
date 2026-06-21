<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LaboratoryController;
use App\Http\Controllers\EquipmentInventoryController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\SystemSettingController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\BookingCalendarController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/dashboard/default', function () {
    return Inertia::render('DashboardDefault');
})->middleware(['auth', 'verified'])->name('dashboard.default');

Route::middleware('auth')->group(function () {
    Route::get('dashboard/users/{user}/edit', [UserManagementController::class, 'edit'])->name('dashboard.users.edit');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('laboratories', LaboratoryController::class);
    Route::resource('equipment', EquipmentInventoryController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('bookings', BookingController::class)->only(['index', 'store', 'update']);
    Route::get('bookings/{bookingId}', fn (int $bookingId) => redirect()->route('bookings.show', ['booking' => 'bk-'.str_pad((string) $bookingId, 6, '0', STR_PAD_LEFT)]))->whereNumber('bookingId');
    Route::get('bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');
    Route::get('booking-calendar', [BookingCalendarController::class, 'index'])->name('booking-calendar.index');
    Route::get('notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');
    Route::patch('notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::get('settings', [SystemSettingController::class, 'edit'])->name('settings.edit');
    Route::patch('settings', [SystemSettingController::class, 'update'])->name('settings.update');
    Route::resource('users', UserManagementController::class);
});

require __DIR__.'/auth.php';
