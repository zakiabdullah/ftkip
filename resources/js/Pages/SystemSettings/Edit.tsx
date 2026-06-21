import { Head, useForm } from '@inertiajs/react';
import { CalendarClock, Clock3, Save, Settings2 } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

export default function Edit({ settings }: { settings: Record<string, string> }) {
    const { data, setData, patch, processing } = useForm(settings);
    const submit = (event: React.FormEvent) => { event.preventDefault(); patch(route('settings.update')); };

    return <AuthenticatedLayout header={<div><h2 className="text-2xl font-bold">System Settings</h2><p className="text-sm text-zinc-500">Configure portal information and booking rules.</p></div>}><Head title="System Settings"/>
        <div className="mx-auto max-w-4xl space-y-6 p-6"><div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 text-sm text-indigo-950"><Settings2 className="mr-2 inline h-4 w-4"/><b>Administrator only.</b> Changes apply to all future booking activity once booking rule enforcement is enabled.</div>
            <form onSubmit={submit} className="space-y-6"><Card className="shadow-sm"><CardHeader><CardTitle>Portal Information</CardTitle><CardDescription>Displayed across the booking portal and landing page.</CardDescription></CardHeader><CardContent><div className="grid gap-2"><Label>Portal Name</Label><Input value={data.portal_name} onChange={event => setData('portal_name', event.target.value)} /><p className="text-xs text-zinc-500">Use a short, recognisable name for staff and students.</p></div></CardContent></Card>
                <Card className="shadow-sm"><CardHeader><CardTitle>General & Appearance</CardTitle><CardDescription>Set portal identity, support details, and the default colour mode.</CardDescription></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><div className="grid gap-2"><Label>Organisation Name</Label><Input value={data.organization_name} onChange={event => setData('organization_name', event.target.value)} /></div><div className="grid gap-2"><Label>Support Email</Label><Input type="email" value={data.support_email} onChange={event => setData('support_email', event.target.value)} /></div><div className="grid gap-2"><Label>Default Theme</Label><Select value={data.default_theme} onValueChange={value => setData('default_theme', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="light">Light</SelectItem><SelectItem value="dark">Dark</SelectItem><SelectItem value="system">System</SelectItem></SelectContent></Select></div></CardContent></Card>
                <Card className="border-amber-200 shadow-sm"><CardHeader><CardTitle>Maintenance Mode</CardTitle><CardDescription>Temporarily restrict the portal while Super Administrators retain access.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="flex items-center gap-2"><Checkbox checked={data.maintenance_enabled === '1'} onCheckedChange={value => setData('maintenance_enabled', value === true ? '1' : '0')} /><Label>Enable maintenance mode</Label></div><div className="grid gap-2"><Label>Maintenance Message</Label><Textarea value={data.maintenance_message} onChange={event => setData('maintenance_message', event.target.value)} /></div></CardContent></Card>
                <Card className="shadow-sm"><CardHeader><CardTitle>Booking Availability</CardTitle><CardDescription>Define the daily time window in which bookings are allowed.</CardDescription></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><SettingField icon={<Clock3 />} label="Opening Time" help="Earliest available booking start time."><Input type="time" value={data.booking_start_time} onChange={event => setData('booking_start_time', event.target.value)} /></SettingField><SettingField icon={<Clock3 />} label="Closing Time" help="Latest allowed booking end time."><Input type="time" value={data.booking_end_time} onChange={event => setData('booking_end_time', event.target.value)} /></SettingField></CardContent></Card>
                <Card className="shadow-sm"><CardHeader><CardTitle>Booking Limits</CardTitle><CardDescription>Prevent excessive reservations and give all users fair access.</CardDescription></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><SettingField icon={<CalendarClock />} label="Maximum Booking Hours" help="Maximum duration allowed for one booking."><Input type="number" min="1" max="24" value={data.max_booking_hours} onChange={event => setData('max_booking_hours', event.target.value)} /></SettingField><SettingField icon={<CalendarClock />} label="Advance Booking Days" help="How far ahead users may submit a booking."><Input type="number" min="1" max="365" value={data.advance_booking_days} onChange={event => setData('advance_booking_days', event.target.value)} /></SettingField></CardContent></Card>
                <div className="sticky bottom-4 flex justify-end rounded-xl border bg-white/95 p-3 shadow-lg backdrop-blur"><Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4"/>{processing ? 'Saving...' : 'Save Settings'}</Button></div>
            </form>
        </div>
    </AuthenticatedLayout>;
}

function SettingField({ icon, label, help, children }: { icon: React.ReactNode; label: string; help: string; children: React.ReactNode }) {
    return <div className="rounded-xl border bg-zinc-50/70 p-4"><div className="mb-3 flex items-center gap-2 text-indigo-600">{icon}<Label>{label}</Label></div>{children}<p className="mt-2 text-xs text-zinc-500">{help}</p></div>;
}
