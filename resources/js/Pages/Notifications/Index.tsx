import { Head, Link, router } from '@inertiajs/react';
import { Bell, CheckCheck } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { PaginatedData } from '@/types';

type Notification = { id: string; title: string; message: string; url?: string; read_at?: string; created_at: string };

export default function Index({ notifications }: { notifications: PaginatedData<Notification> }) {
    return <AuthenticatedLayout header={<div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold">Notifications</h2><p className="text-sm text-zinc-500">Booking updates and actions that need your attention.</p></div><Button variant="outline" onClick={() => router.patch(route('notifications.read-all'))}><CheckCheck className="mr-2 h-4 w-4" />Mark all as read</Button></div>}><Head title="Notifications" /><div className="mx-auto max-w-4xl space-y-3 p-6">{notifications.data.length === 0 ? <Card><CardContent className="p-10 text-center text-zinc-500"><Bell className="mx-auto mb-3 h-8 w-8" />No notifications yet.</CardContent></Card> : notifications.data.map((notification) => <Card key={notification.id} className={notification.read_at ? 'opacity-75' : 'border-indigo-200 bg-indigo-50/30 dark:border-indigo-900'}><CardContent className="flex items-start justify-between gap-4 p-5"><div><p className="font-semibold">{notification.title}</p><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{notification.message}</p><p className="mt-2 text-xs text-zinc-400">{new Date(notification.created_at).toLocaleString()}</p></div><div className="flex shrink-0 gap-2">{notification.url && <Button size="sm" asChild><Link href={notification.url} onClick={() => !notification.read_at && router.patch(route('notifications.read', notification.id))}>View</Link></Button>}{!notification.read_at && <Button size="sm" variant="ghost" onClick={() => router.patch(route('notifications.read', notification.id))}>Read</Button>}</div></CardContent></Card>)}</div></AuthenticatedLayout>;
}
