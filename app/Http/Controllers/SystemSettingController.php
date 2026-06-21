<?php

namespace App\Http\Controllers;

use App\Models\SystemSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SystemSettingController extends Controller
{
    private const DEFAULTS = ['portal_name' => 'SPMP-FTKIP', 'organization_name' => 'Faculty of Mechanical and Manufacturing Engineering Technology', 'support_email' => 'ftkip@utem.edu.my', 'default_theme' => 'system', 'maintenance_enabled' => '0', 'maintenance_message' => 'The portal is currently undergoing scheduled maintenance. Please try again later.', 'booking_start_time' => '08:00', 'booking_end_time' => '18:00', 'max_booking_hours' => '4', 'advance_booking_days' => '30'];

    public function edit(Request $request): Response
    {
        abort_unless($request->user()->hasRole('Super Administrator'), 403);
        return Inertia::render('SystemSettings/Edit', ['settings' => collect(self::DEFAULTS)->map(fn ($default, $key) => SystemSetting::value($key, $default))]);
    }

    public function update(Request $request): RedirectResponse
    {
        abort_unless($request->user()->hasRole('Super Administrator'), 403);
        $data = $request->validate(['portal_name' => ['required', 'string', 'max:100'], 'organization_name' => ['required','string','max:255'], 'support_email' => ['required','email'], 'default_theme' => ['required','in:light,dark,system'], 'maintenance_enabled' => ['required','boolean'], 'maintenance_message' => ['required','string','max:500'], 'booking_start_time' => ['required', 'date_format:H:i'], 'booking_end_time' => ['required', 'date_format:H:i','after:booking_start_time'], 'max_booking_hours' => ['required','integer','min:1','max:24'], 'advance_booking_days' => ['required','integer','min:1','max:365']]);
        foreach ($data as $key => $value) SystemSetting::put($key, $value);
        return redirect()->route('settings.edit')->with('success', 'System settings updated.');
    }
}
