<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Laboratory;
use App\Models\EquipmentInventoryItem;
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
        $isAssistantEngineer = $user->hasRole('Assistant Engineer');
        $isLecturer = $user->hasRole('Lecturer / Supervisor');
        $laboratoriesQuery = Laboratory::query();

        if ($isAssistantEngineer) {
            $laboratoriesQuery->where('responsible_officer_id', $user->id);
        }

        $laboratoryIds = (clone $laboratoriesQuery)->pluck('id');
        $equipmentQuery = EquipmentInventoryItem::query();
        $bookingsQuery = DB::table('bookings');

        if ($isAssistantEngineer) {
            $equipmentQuery->whereIn('laboratory_id', $laboratoryIds);
            $bookingsQuery->whereIn('laboratory_id', $laboratoryIds);
        } elseif ($isLecturer) {
            $bookingsQuery->where('supervisor_id', $user->id);
        }

        // Core counts
        $totalUsers = User::count();
        $totalLaboratories = (clone $laboratoriesQuery)->count();
        $totalEquipment = (clone $equipmentQuery)->sum('quantity');
        $totalBookings = (clone $bookingsQuery)->count();

        // Laboratory Status counts
        $labStatusCounts = [
            'active' => (clone $laboratoriesQuery)->where('status', 'active')->count(),
            'inactive' => (clone $laboratoriesQuery)->where('status', 'inactive')->count(),
            'maintenance' => (clone $laboratoriesQuery)->where('status', 'maintenance')->count(),
        ];

        // Equipment Status counts
        $equipmentStatusCounts = [
            'available' => (clone $equipmentQuery)->where('status', 'available')->sum('quantity'),
            'reserved' => 0,
            'borrowed' => 0,
            'maintenance' => (clone $equipmentQuery)->where('status', 'maintenance')->sum('quantity'),
            'damaged' => (clone $equipmentQuery)->where('status', 'damaged')->sum('quantity'),
            'retired' => (clone $equipmentQuery)->where('status', 'retired')->sum('quantity'),
        ];

        // Recent users
        $recentUsers = User::latest()->limit(5)->get();

        // Recent equipment
        $recentEquipment = (clone $equipmentQuery)->with('laboratory')->latest()->limit(5)->get();

        // Recent bookings
        $recentBookingsQuery = DB::table('bookings')
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
            );

        if ($isAssistantEngineer) {
            $recentBookingsQuery->whereIn('bookings.laboratory_id', $laboratoryIds);
        } elseif ($isLecturer) {
            $recentBookingsQuery->where('bookings.supervisor_id', $user->id);
        }

        $recentBookings = $recentBookingsQuery->latest('bookings.created_at')->limit(5)->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_users' => $totalUsers,
                'total_laboratories' => $totalLaboratories,
                'total_equipment' => $totalEquipment,
                'total_bookings' => $totalBookings,
                'lab_status_counts' => $labStatusCounts,
                'equipment_status_counts' => $equipmentStatusCounts,
                'pending_bookings' => (clone $bookingsQuery)->where('status', $isLecturer ? 'pending_supervisor' : 'pending_admin')->count(),
            ],
            'recent_users' => $recentUsers,
            'recent_equipment' => $recentEquipment,
            'recent_bookings' => $recentBookings,
            'is_assistant_engineer' => $isAssistantEngineer,
            'is_lecturer' => $isLecturer,
        ]);
    }
}
