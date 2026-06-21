<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Notifications/Index', [
            'notifications' => $request->user()->notifications()->latest()->paginate(20)->through(fn ($notification) => [
                'id' => $notification->id,
                'title' => $notification->data['title'] ?? 'System notification',
                'message' => $notification->data['message'] ?? '',
                'url' => $notification->data['url'] ?? null,
                'read_at' => $notification->read_at?->toISOString(),
                'created_at' => $notification->created_at->toISOString(),
            ]),
        ]);
    }

    public function markAsRead(Request $request, string $notification): RedirectResponse
    {
        $item = $request->user()->notifications()->findOrFail($notification);
        $item->markAsRead();

        return back();
    }

    public function markAllAsRead(Request $request): RedirectResponse
    {
        $request->user()->unreadNotifications->markAsRead();

        return back();
    }
}
