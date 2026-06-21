import { Head, Link, router } from '@inertiajs/react';
import { addMonths, format, parseISO } from 'date-fns';
import { Calendar } from '@/Components/ui/calendar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

type Event = { id: number; start_time: string; end_time: string; status: string; laboratory: { code: string; name: string }; user: { name: string } };

export default function Index({ bookings, laboratories, month, filters }: { bookings: Event[]; laboratories: Array<{ id: number; code: string; name: string }>; month: string; filters: { laboratory_id?: string } }) {
    const viewMonth = new Date(`${month}-01T12:00:00`);
    const selectedDate = undefined;
    const bookingDays = [...new Set(bookings.map((booking) => format(parseISO(booking.start_time), 'yyyy-MM-dd')))].map((day) => new Date(`${day}T12:00:00`));
    const showMonth = (date: Date) => router.get(route('booking-calendar.index'), { month: format(date, 'yyyy-MM'), laboratory_id: filters.laboratory_id }, { preserveState: true });
    const statusLabel = (status: string) => status === 'pending_admin' ? 'Pending Assistant Engineer' : status.replaceAll('_', ' ');

    return <AuthenticatedLayout header={<div><h2 className="text-2xl font-bold">Booking Calendar</h2><p className="text-sm text-zinc-500">View scheduled laboratory bookings and availability at a glance.</p></div>}><Head title="Booking Calendar" /><div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-2"><Button variant="outline" onClick={() => showMonth(addMonths(viewMonth, -1))}>Previous month</Button><Button variant="outline" onClick={() => showMonth(new Date())}>Today</Button><Button variant="outline" onClick={() => showMonth(addMonths(viewMonth, 1))}>Next month</Button></div><Select value={filters.laboratory_id || 'all'} onValueChange={(value) => router.get(route('booking-calendar.index'), { month, laboratory_id: value === 'all' ? undefined : value }, { preserveState: true })}><SelectTrigger className="w-[260px]"><SelectValue placeholder="All laboratories" /></SelectTrigger><SelectContent><SelectItem value="all">All Laboratories</SelectItem>{laboratories.map((lab) => <SelectItem key={lab.id} value={String(lab.id)}>{lab.code} — {lab.name}</SelectItem>)}</SelectContent></Select></div>
        <div className="grid gap-6 lg:grid-cols-[420px_1fr]"><Card><CardHeader><CardTitle>{format(viewMonth, 'MMMM yyyy')}</CardTitle><CardDescription>Highlighted dates have scheduled bookings.</CardDescription></CardHeader><CardContent><Calendar mode="single" selected={selectedDate} month={viewMonth} onMonthChange={showMonth} modifiers={{ booked: bookingDays }} modifiersClassNames={{ booked: 'bg-indigo-100 text-indigo-900 font-bold dark:bg-indigo-950 dark:text-indigo-100' }} className="rounded-md border p-3" /></CardContent></Card><Card><CardHeader><CardTitle>Scheduled Bookings</CardTitle><CardDescription>{bookings.length} active booking{bookings.length === 1 ? '' : 's'} in this month.</CardDescription></CardHeader><CardContent className="space-y-3">{bookings.length === 0 ? <p className="rounded-lg border border-dashed p-8 text-center text-sm text-zinc-500">No active bookings for this month.</p> : bookings.map((booking) => <Link key={booking.id} href={route('bookings.show', booking.id)} className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"><div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{format(parseISO(booking.start_time), 'EEE, d MMM · h:mm a')} – {format(parseISO(booking.end_time), 'h:mm a')}</p><p className="text-sm text-zinc-500">{booking.laboratory.code} · {booking.laboratory.name}</p><p className="text-xs text-zinc-400">Requested by {booking.user.name}</p></div><span className="capitalize text-sm font-medium text-indigo-600">{statusLabel(booking.status)}</span></div></Link>)}</CardContent></Card></div>
    </div></AuthenticatedLayout>;
}
