<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => fn () => $request->user()?->loadMissing('roles:id,name'),
            ],
            'notifications' => fn () => $request->user() ? [
                'unread_count' => $request->user()->unreadNotifications()->count(),
                'recent' => $request->user()->notifications()->latest()->limit(5)->get()->map(fn ($notification) => [
                    'id' => $notification->id,
                    'title' => $notification->data['title'] ?? 'System notification',
                    'message' => $notification->data['message'] ?? '',
                    'url' => $notification->data['url'] ?? null,
                    'read_at' => $notification->read_at?->toISOString(),
                ]),
            ] : ['unread_count' => 0, 'recent' => []],
        ];
    }
}
