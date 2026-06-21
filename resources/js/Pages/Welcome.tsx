import { Head, Link } from '@inertiajs/react';
import { CalendarDays, ClipboardCheck, Package, ShieldCheck } from 'lucide-react';
import { PageProps } from '@/types';

export default function Welcome({ auth }: PageProps) {
    const bookingUrl = auth.user ? route('bookings.index') : route('login');

    return <>
        <Head title="Laboratory Booking" />
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white text-zinc-900">
            <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
                <div><p className="font-bold tracking-tight">SPMP-FTKIP</p><p className="text-xs text-zinc-500">Laboratory Booking Portal</p></div>
                <nav className="flex items-center gap-3">
                    {auth.user ? <Link href={route('bookings.index')} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">My Bookings</Link> : <><Link href={route('login')} className="px-3 py-2 text-sm font-medium">Sign In</Link><Link href={route('register')} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Create Account</Link></>}
                </nav>
            </header>
            <main className="mx-auto max-w-7xl px-6 pb-20 pt-14 text-center sm:pt-24">
                <div className="mx-auto max-w-3xl"><div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white"><CalendarDays /></div><p className="font-semibold text-indigo-600">FTKIP Laboratory Booking</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Book laboratories and equipment with confidence.</h1><p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">Reserve your laboratory, choose the equipment you need, and track your approval status in one place.</p><Link href={bookingUrl} className="mt-8 inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200">Start a Booking</Link>{!auth.user && <p className="mt-3 text-sm text-zinc-500">Sign in is required before submitting a booking.</p>}</div>
                <div className="mt-16 grid gap-5 text-left md:grid-cols-3"><Feature icon={<CalendarDays />} title="Choose a time" text="Select a laboratory, date, and time that suits your activity."/><Feature icon={<Package />} title="Reserve equipment" text="Request the equipment and quantity required for your booking."/><Feature icon={<ClipboardCheck />} title="Track approval" text="Follow Supervisor and Assistant Engineer approval in real time."/></div>
                <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-5 text-sm text-indigo-900"><ShieldCheck className="mr-2 inline h-4 w-4"/>Safety confirmation is required for every laboratory booking.</div>
            </main>
        </div>
    </>;
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
    return <div className="rounded-2xl border bg-white p-6 shadow-sm"><div className="mb-4 text-indigo-600">{icon}</div><h2 className="font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-zinc-600">{text}</p></div>;
}
