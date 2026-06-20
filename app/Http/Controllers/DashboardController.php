<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Laboratory;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard page with metrics and activities.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Core counts
        $totalUsers = User::count();
        $totalLaboratories = Laboratory::count();
        $totalEquipment = Equipment::count();
        $totalBookings = DB::table('bookings')->count();

        // Laboratory Status counts
        $labStatusCounts = [
            'active' => Laboratory::where('status', 'active')->count(),
            'inactive' => Laboratory::where('status', 'inactive')->count(),
            'maintenance' => Laboratory::where('status', 'maintenance')->count(),
        ];

        // Equipment Status counts
        $equipmentStatusCounts = [
            'available' => Equipment::where('status', 'available')->count(),
            'reserved' => Equipment::where('status', 'reserved')->count(),
            'borrowed' => Equipment::where('status', 'borrowed')->count(),
            'maintenance' => Equipment::where('status', 'maintenance')->count(),
            'damaged' => Equipment::where('status', 'damaged')->count(),
            'retired' => Equipment::where('status', 'retired')->count(),
        ];

        // Recent users
        $recentUsers = User::latest()->limit(5)->get();

        // Recent equipment
        $recentEquipment = Equipment::with('laboratory')->latest()->limit(5)->get();

        // Recent bookings
        $recentBookings = DB::table('bookings')
            ->join('users', 'bookings.user_id', '=', 'users.id')
            ->join('laboratories', 'bookings.laboratory_id', '=', 'laboratories.id')
            ->select(
                'bookings.id',
                'bookings.start_time',
                'bookings.end_time',
                'bookings.purpose',
                'bookings.status',
                'bookings.created_at',
                'users.name as user_name',
                'laboratories.name as laboratory_name',
                'laboratories.code as laboratory_code'
            )
            ->latest('bookings.created_at')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_users' => $totalUsers,
                'total_laboratories' => $totalLaboratories,
                'total_equipment' => $totalEquipment,
                'total_bookings' => $totalBookings,
                'lab_status_counts' => $labStatusCounts,
                'equipment_status_counts' => $equipmentStatusCounts,
            ],
            'recent_users' => $recentUsers,
            'recent_equipment' => $recentEquipment,
            'recent_bookings' => $recentBookings,
        ]);
    }
}
