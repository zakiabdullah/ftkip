<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLaboratoryRequest;
use App\Http\Requests\UpdateLaboratoryRequest;
use App\Models\Laboratory;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class LaboratoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Laboratory::with('responsibleOfficer');
        $isAssistantEngineer = $request->user()->hasRole('Assistant Engineer');
        $isLecturer = $request->user()->hasRole('Lecturer / Supervisor');
        $isStudent = ! $isAssistantEngineer && ! $isLecturer && ! $request->user()->hasRole('Super Administrator');

        if ($isAssistantEngineer) {
            $query->where('responsible_officer_id', $request->user()->id);
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $laboratories = $query->latest()->paginate(10)->withQueryString();
        $users = $isAssistantEngineer
            ? collect()
            : User::select('id', 'name', 'email')->get();

        return Inertia::render('LaboratoryManagement/Index', [
            'laboratories' => $laboratories,
            'users' => $users,
            'filters' => $request->only(['search', 'status']),
            'is_assistant_engineer' => $isAssistantEngineer,
            'is_lecturer' => $isLecturer,
            'is_student' => $isStudent,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLaboratoryRequest $request): RedirectResponse
    {
        abort_unless($request->user()->hasRole('Super Administrator'), 403);

        Laboratory::create($request->validated());

        return redirect()->route('laboratories.index')->with('success', 'Laboratory created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLaboratoryRequest $request, Laboratory $laboratory): RedirectResponse
    {
        if ($request->user()->hasRole('Assistant Engineer')) {
            abort_unless($laboratory->responsible_officer_id === $request->user()->id, 403);
            $laboratory->update(['status' => $request->validated('status')]);

            return redirect()->route('laboratories.index')->with('success', 'Laboratory status updated successfully.');
        }

        abort_unless($request->user()->hasRole('Super Administrator'), 403);

        $laboratory->update($request->validated());

        return redirect()->route('laboratories.index')->with('success', 'Laboratory updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Laboratory $laboratory): RedirectResponse
    {
        abort_unless(request()->user()->hasRole('Super Administrator'), 403);

        $laboratory->delete();

        return redirect()->route('laboratories.index')->with('success', 'Laboratory deleted successfully.');
    }
}
