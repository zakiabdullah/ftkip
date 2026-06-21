<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Laboratory;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class BookingCalendarController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $month = $request->string('month', now()->format('Y-m'))->value();
        $start = Carbon::createFromFormat('Y-m', $month)->startOfMonth();
        $end = $start->copy()->endOfMonth();
        $query = Booking::with(['laboratory:id,name,code', 'user:id,name'])->whereBetween('start_time', [$start, $end])->whereNotIn('status', ['rejected', 'cancelled']);

        if ($user->hasRole('Assistant Engineer')) {
            $query->whereHas('laboratory', fn ($labs) => $labs->where('responsible_officer_id', $user->id));
        } elseif ($user->hasRole('Lecturer / Supervisor')) {
            $query->where('supervisor_id', $user->id);
        } elseif (! $user->hasRole('Super Administrator')) {
            $query->where('user_id', $user->id);
        }

        if ($request->filled('laboratory_id')) {
            $query->where('laboratory_id', $request->integer('laboratory_id'));
        }

        return Inertia::render('BookingCalendar/Index', [
            'bookings' => $query->orderBy('start_time')->get()->map(fn (Booking $booking) => [
                'id' => $booking->id, 'start_time' => $booking->start_time->toISOString(), 'end_time' => $booking->end_time->toISOString(),
                'status' => $booking->status, 'laboratory' => $booking->laboratory, 'user' => $booking->user,
            ]),
            'laboratories' => Laboratory::select('id', 'name', 'code')->orderBy('name')->get(),
            'month' => $start->format('Y-m'),
            'filters' => $request->only('laboratory_id'),
        ]);
    }
}
