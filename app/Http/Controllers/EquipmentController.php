<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Requests\UpdateEquipmentRequest;
use App\Models\Equipment;
use App\Models\Laboratory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class EquipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Equipment::with('laboratory');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('asset_tag', 'like', "%{$search}%")
                  ->orWhere('serial_number', 'like', "%{$search}%");
            });
        }

        if ($request->filled('laboratory_id')) {
            $query->where('laboratory_id', $request->input('laboratory_id'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $equipment = $query->latest()->paginate(10)->withQueryString();
        $laboratories = Laboratory::select('id', 'name', 'code')->get();

        return Inertia::render('EquipmentManagement/Index', [
            'equipment' => $equipment,
            'laboratories' => $laboratories,
            'filters' => $request->only(['search', 'laboratory_id', 'status']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEquipmentRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('equipment', 'public');
            $data['image_path'] = $path;
        }

        Equipment::create($data);

        return redirect()->route('equipment.index')->with('success', 'Equipment created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEquipmentRequest $request, Equipment $equipment): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($equipment->image_path) {
                Storage::disk('public')->delete($equipment->image_path);
            }
            $path = $request->file('image')->store('equipment', 'public');
            $data['image_path'] = $path;
        }

        $equipment->update($data);

        return redirect()->route('equipment.index')->with('success', 'Equipment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipment $equipment): RedirectResponse
    {
        if ($equipment->image_path) {
            Storage::disk('public')->delete($equipment->image_path);
        }
        $equipment->delete();

        return redirect()->route('equipment.index')->with('success', 'Equipment deleted successfully.');
    }
}
