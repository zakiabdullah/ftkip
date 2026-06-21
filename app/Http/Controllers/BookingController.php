<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\BookingItem;
use App\Models\EquipmentInventoryItem;
use App\Models\Laboratory;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $query = Booking::with(['user:id,name', 'supervisor:id,name', 'laboratory:id,name,code', 'items.equipment:id,name,quantity,unit_type']);
        $view = 'student';

        if ($user->hasRole('Assistant Engineer')) {
            $query->whereHas('laboratory', fn ($labs) => $labs->where('responsible_officer_id', $user->id));
            $view = 'assistant';
        } elseif ($user->hasRole('Lecturer / Supervisor')) {
            $query->where('supervisor_id', $user->id);
            $view = 'supervisor';
        } elseif (! $user->hasRole('Super Administrator')) {
            $query->where('user_id', $user->id);
        } else {
            $view = 'admin';
        }

        $summaryQuery = clone $query;

        return Inertia::render('Bookings/Index', [
            'bookings' => $query->latest()->paginate(15)->withQueryString(),
            'laboratories' => Laboratory::select('id', 'name', 'code')->orderBy('name')->get(),
            'equipment' => EquipmentInventoryItem::where('status', 'available')->select('id', 'laboratory_id', 'name', 'quantity', 'unit_type')->orderBy('name')->get(),
            'supervisors' => User::role('Lecturer / Supervisor')->select('id', 'name', 'email')->orderBy('name')->get(),
            'can_approve' => $user->hasRole(['Assistant Engineer', 'Lecturer / Supervisor', 'Super Administrator']),
            'booking_view' => $view,
            'summary' => [
                'total' => (clone $summaryQuery)->count(),
                'pending' => (clone $summaryQuery)->whereIn('status', ['pending_supervisor', 'pending_admin'])->count(),
                'approved' => (clone $summaryQuery)->where('status', 'approved')->count(),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'laboratory_id' => ['required', 'exists:laboratories,id'],
            'supervisor_id' => ['required', 'exists:users,id'],
            'start_time' => ['required', 'date', 'after:now'],
            'end_time' => ['required', 'date', 'after:start_time'],
            'purpose' => ['required', 'string', 'max:2000'],
            'safety_declared' => ['accepted'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.equipment_inventory_item_id' => ['required', 'exists:equipment_inventory_items,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        DB::transaction(function () use ($data, $request) {
            foreach ($data['items'] as $index => $item) {
                $equipment = EquipmentInventoryItem::findOrFail($item['equipment_inventory_item_id']);
                if ($equipment->laboratory_id !== (int) $data['laboratory_id']) {
                    throw ValidationException::withMessages(["items.{$index}.equipment_inventory_item_id" => 'Equipment must belong to the selected laboratory.']);
                }

                $reserved = BookingItem::query()
                    ->where('equipment_inventory_item_id', $equipment->id)
                    ->whereHas('booking', fn ($bookings) => $bookings
                        ->whereIn('status', ['pending_admin', 'approved'])
                        ->where('start_time', '<', $data['end_time'])
                        ->where('end_time', '>', $data['start_time']))
                    ->sum('quantity');

                if ($item['quantity'] + $reserved > $equipment->quantity) {
                    throw ValidationException::withMessages(["items.{$index}.quantity" => "Only ".max(0, $equipment->quantity - $reserved)." {$equipment->unit_type}(s) are available for this time."]);
                }
            }

            $booking = Booking::create([
                'user_id' => $request->user()->id,
                'laboratory_id' => $data['laboratory_id'],
                'supervisor_id' => $data['supervisor_id'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time'],
                'purpose' => $data['purpose'],
                'safety_declared' => true,
                'status' => 'pending_supervisor',
            ]);

            foreach ($data['items'] as $item) {
                $booking->items()->create($item);
            }
        });

        return redirect()->route('bookings.index')->with('success', 'Booking request submitted for supervisor approval.');
    }

    public function update(Request $request, Booking $booking): RedirectResponse
    {
        $data = $request->validate(['action' => ['required', 'in:approve,reject,cancel,edit'], 'rejection_reason' => ['nullable', 'string', 'max:1000']]);
        $user = $request->user();

        if ($data['action'] === 'edit' && $booking->user_id === $user->id && $booking->status === 'pending_supervisor') {
            $edited = $request->validate([
                'laboratory_id' => ['required', 'exists:laboratories,id'], 'supervisor_id' => ['required', 'exists:users,id'],
                'start_time' => ['required', 'date', 'after:now'], 'end_time' => ['required', 'date', 'after:start_time'],
                'purpose' => ['required', 'string', 'max:2000'], 'safety_declared' => ['accepted'],
                'items' => ['required', 'array', 'min:1'], 'items.*.equipment_inventory_item_id' => ['required', 'exists:equipment_inventory_items,id'], 'items.*.quantity' => ['required', 'integer', 'min:1'],
            ]);
            foreach ($edited['items'] as $index => $item) {
                $equipment = EquipmentInventoryItem::findOrFail($item['equipment_inventory_item_id']);
                if ($equipment->laboratory_id !== (int) $edited['laboratory_id']) throw ValidationException::withMessages(["items.{$index}.equipment_inventory_item_id" => 'Equipment must belong to the selected laboratory.']);
                $reserved = BookingItem::where('equipment_inventory_item_id', $equipment->id)->whereHas('booking', fn ($q) => $q->whereKeyNot($booking->id)->whereIn('status', ['pending_admin', 'approved'])->where('start_time', '<', $edited['end_time'])->where('end_time', '>', $edited['start_time']))->sum('quantity');
                if ($item['quantity'] + $reserved > $equipment->quantity) throw ValidationException::withMessages(["items.{$index}.quantity" => 'Requested quantity is not available for this time.']);
            }
            DB::transaction(function () use ($booking, $edited) {
                $booking->update(['laboratory_id' => $edited['laboratory_id'], 'supervisor_id' => $edited['supervisor_id'], 'start_time' => $edited['start_time'], 'end_time' => $edited['end_time'], 'purpose' => $edited['purpose'], 'safety_declared' => true]);
                $booking->items()->delete();
                foreach ($edited['items'] as $item) $booking->items()->create($item);
            });
            return redirect()->route('bookings.index')->with('success', 'Booking request updated.');
        }

        if ($data['action'] === 'cancel' && $booking->user_id === $user->id && in_array($booking->status, ['pending_supervisor', 'pending_admin'], true)) {
            $booking->update(['status' => 'cancelled']);

            return redirect()->route('bookings.index')->with('success', 'Booking request cancelled.');
        }

        if ($booking->status === 'pending_supervisor' && $booking->supervisor_id === $user->id && $user->hasRole('Lecturer / Supervisor')) {
            $booking->update(['status' => $data['action'] === 'approve' ? 'pending_admin' : 'rejected', 'rejection_reason' => $data['action'] === 'reject' ? $data['rejection_reason'] : null, 'approved_by_supervisor_id' => $data['action'] === 'approve' ? $user->id : null]);
        } elseif ($booking->status === 'pending_admin' && ($user->hasRole('Super Administrator') || ($user->hasRole('Assistant Engineer') && $booking->laboratory->responsible_officer_id === $user->id))) {
            $booking->update(['status' => $data['action'] === 'approve' ? 'approved' : 'rejected', 'rejection_reason' => $data['action'] === 'reject' ? $data['rejection_reason'] : null, 'approved_by_admin_id' => $data['action'] === 'approve' ? $user->id : null]);
        } else {
            abort(403);
        }

        return redirect()->route('bookings.index')->with('success', 'Booking request updated.');
    }
}
