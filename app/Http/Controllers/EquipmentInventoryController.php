<?php

namespace App\Http\Controllers;

use App\Models\EquipmentInventoryItem;
use App\Models\Laboratory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EquipmentInventoryController extends Controller
{
    public function index(Request $request): Response
    {
        $isAssistantEngineer = $request->user()->hasRole('Assistant Engineer');
        $laboratories = Laboratory::query();

        if ($isAssistantEngineer) {
            $laboratories->where('responsible_officer_id', $request->user()->id);
        }

        $laboratoryIds = (clone $laboratories)->pluck('id');
        $itemsQuery = EquipmentInventoryItem::query()
            ->when($isAssistantEngineer, fn ($query) => $query->whereIn('laboratory_id', $laboratoryIds));

        $summary = [
            'item_count' => (clone $itemsQuery)->count(),
            'total_quantity' => (clone $itemsQuery)->sum('quantity'),
            'available_quantity' => (clone $itemsQuery)->where('status', 'available')->sum('quantity'),
            'attention_quantity' => (clone $itemsQuery)->whereIn('status', ['maintenance', 'damaged'])->sum('quantity'),
        ];

        $items = $itemsQuery->with('laboratory:id,name,code')
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->string('search')->trim()->value();
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($request->filled('laboratory_id'), fn ($query) => $query->where('laboratory_id', $request->integer('laboratory_id')))
            ->when($request->filled('status'), fn ($query) => $query->where('status', $request->string('status')->value()))
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('EquipmentInventory/Index', [
            'items' => $items,
            'laboratories' => $laboratories->select('id', 'name', 'code')->orderBy('name')->get(),
            'filters' => $request->only(['search', 'laboratory_id', 'status']),
            'is_assistant_engineer' => $isAssistantEngineer,
            'summary' => $summary,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validatedData($request);
        $this->ensureLaboratoryAccess($request, $data['laboratory_id']);

        EquipmentInventoryItem::create($data);

        return redirect()->route('equipment.index')->with('success', 'Equipment item created successfully.');
    }

    public function update(Request $request, EquipmentInventoryItem $inventory): RedirectResponse
    {
        $data = $this->validatedData($request);
        $this->ensureLaboratoryAccess($request, $inventory->laboratory_id);
        $this->ensureLaboratoryAccess($request, $data['laboratory_id']);

        $inventory->update($data);

        return redirect()->route('equipment.index')->with('success', 'Equipment item updated successfully.');
    }

    public function destroy(Request $request, EquipmentInventoryItem $inventory): RedirectResponse
    {
        abort_if($request->user()->hasRole('Assistant Engineer'), 403);

        $inventory->delete();

        return redirect()->route('equipment.index')->with('success', 'Equipment item deleted successfully.');
    }

    private function validatedData(Request $request): array
    {
        return $request->validate([
            'laboratory_id' => ['required', 'exists:laboratories,id'],
            'name' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'integer', 'min:1'],
            'unit_type' => ['required', 'in:unit,set,piece,license'],
            'track_individually' => ['required', 'boolean'],
            'status' => ['required', 'in:available,maintenance,damaged,retired'],
        ]);
    }

    private function ensureLaboratoryAccess(Request $request, int $laboratoryId): void
    {
        if (! $request->user()->hasRole('Assistant Engineer')) {
            return;
        }

        abort_unless(
            Laboratory::whereKey($laboratoryId)
                ->where('responsible_officer_id', $request->user()->id)
                ->exists(),
            403,
        );
    }
}
