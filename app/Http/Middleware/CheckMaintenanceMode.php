<?php

namespace App\Http\Middleware;

use App\Models\SystemSetting;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckMaintenanceMode
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! SystemSetting::value('maintenance_enabled', '0')) return $next($request);
        if ($request->is('maintenance') || $request->user()?->hasRole('Super Administrator')) return $next($request);
        return response()->view('maintenance', ['message' => SystemSetting::value('maintenance_message')], 503);
    }
}
