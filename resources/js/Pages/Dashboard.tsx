import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import {
    Users,
    Building2,
    Wrench,
    CalendarDays,
    ArrowUpRight,
    TrendingUp,
    Shield,
    Activity,
    CheckCircle2,
    Clock,
    AlertTriangle,
} from 'lucide-react';
import { User, Laboratory, Equipment, DashboardBooking, DashboardStats } from '@/types';

interface Props {
    stats: DashboardStats;
    recent_users: User[];
    recent_equipment: Equipment[];
    recent_bookings: DashboardBooking[];
}

export default function Dashboard({ stats, recent_users, recent_equipment, recent_bookings }: Props) {
    const authUser = usePage().props.auth.user;
    const userRole = authUser.roles?.[0]?.name || 'Super Administrator';

    const getBookingStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1 w-fit"><CheckCircle2 className="h-3 w-3" /> Approved</Badge>;
            case 'pending_supervisor':
                return <Badge className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1 w-fit"><Clock className="h-3 w-3" /> Pending Supervisor</Badge>;
            case 'pending_admin':
                return <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 w-fit"><Clock className="h-3 w-3" /> Pending Admin</Badge>;
            case 'rejected':
                return <Badge className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-1 w-fit"><AlertTriangle className="h-3 w-3" /> Rejected</Badge>;
            case 'cancelled':
                return <Badge variant="secondary" className="flex items-center gap-1 w-fit"><Clock className="h-3 w-3" /> Cancelled</Badge>;
            default:
                return null;
        }
    };

    const getEquipmentStatusBadge = (status: string) => {
        switch (status) {
            case 'available':
                return <Badge className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-250">Available</Badge>;
            case 'reserved':
                return <Badge className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-250">Reserved</Badge>;
            case 'borrowed':
                return <Badge className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border border-indigo-250">Borrowed</Badge>;
            case 'maintenance':
                return <Badge className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-750 dark:text-amber-400 border border-amber-250">Maintenance</Badge>;
            case 'damaged':
                return <Badge className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-250">Damaged</Badge>;
            case 'retired':
                return <Badge variant="outline">Retired</Badge>;
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Dashboard Overview
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Real-time statistics and activities for FTKIP Portal.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 px-3 py-1.5 rounded-lg text-sm text-indigo-700 dark:text-indigo-400 font-semibold w-fit">
                        <Shield className="h-4 w-4" /> {userRole} Portal
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl space-y-8">
                {/* Welcome Card */}
                <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 md:p-8 text-white shadow-md">
                    <div className="relative z-10 max-w-2xl space-y-2">
                        <h3 className="text-xl md:text-2xl font-bold">
                            Welcome back, {authUser.name}!
                        </h3>
                        <p className="text-sm md:text-base text-zinc-100/90 leading-relaxed">
                            You are logged in as a <strong>{userRole}</strong>. You have full access to manage laboratory details, register new equipment assets, authorize bookings, and administer system users.
                        </p>
                    </div>
                    {/* Decorative blurred background shapes */}
                    <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/10 rounded-l-full blur-2xl transform translate-x-12"></div>
                </div>

                {/* Statistics Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Card 1: Users */}
                    <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Total Users</CardTitle>
                            <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <Users className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight">{stats.total_users}</div>
                            <div className="flex items-center gap-1 mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                                <Link href={route('users.index')} className="flex items-center gap-0.5 hover:underline">
                                    Manage accounts <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 2: Laboratories */}
                    <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Laboratories</CardTitle>
                            <div className="h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Building2 className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight">{stats.total_laboratories}</div>
                            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                                <Link href={route('laboratories.index')} className="flex items-center gap-0.5 hover:underline">
                                    View laboratories <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 3: Equipment */}
                    <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Total Equipment</CardTitle>
                            <div className="h-9 w-9 rounded-lg bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Wrench className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight">{stats.total_equipment}</div>
                            <div className="flex items-center gap-1 mt-1 text-xs text-purple-600 dark:text-purple-400 font-semibold">
                                <Link href={route('equipment.index')} className="flex items-center gap-0.5 hover:underline">
                                    Manage assets <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 4: Bookings */}
                    <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Active Bookings</CardTitle>
                            <div className="h-9 w-9 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                <CalendarDays className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight">{stats.total_bookings}</div>
                            <div className="flex items-center gap-1 mt-1 text-xs text-zinc-500">
                                <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                                    System wide metrics <TrendingUp className="h-3.5 w-3.5" />
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Status Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Labs Status */}
                    <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                        <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
                            <CardTitle className="text-md font-bold flex items-center gap-2">
                                <Activity className="h-4.5 w-4.5 text-zinc-500" /> Laboratory Status Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Active Laboratories</span>
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{stats.lab_status_counts.active} / {stats.total_laboratories}</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-850 overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full"
                                        style={{ width: `${stats.total_laboratories > 0 ? (stats.lab_status_counts.active / stats.total_laboratories) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Under Maintenance</span>
                                    <span className="font-bold text-amber-600 dark:text-amber-400">{stats.lab_status_counts.maintenance} / {stats.total_laboratories}</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-850 overflow-hidden">
                                    <div
                                        className="h-full bg-amber-500 rounded-full"
                                        style={{ width: `${stats.total_laboratories > 0 ? (stats.lab_status_counts.maintenance / stats.total_laboratories) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Inactive/Closed</span>
                                    <span className="font-bold text-zinc-600">{stats.lab_status_counts.inactive} / {stats.total_laboratories}</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-850 overflow-hidden">
                                    <div
                                        className="h-full bg-zinc-400 dark:bg-zinc-600 rounded-full"
                                        style={{ width: `${stats.total_laboratories > 0 ? (stats.lab_status_counts.inactive / stats.total_laboratories) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Equipment Status Counts */}
                    <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                        <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
                            <CardTitle className="text-md font-bold flex items-center gap-2">
                                <Wrench className="h-4.5 w-4.5 text-zinc-500" /> Equipment Availability Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-850 flex flex-col">
                                    <span className="text-xs text-zinc-500">Available</span>
                                    <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                                        {stats.equipment_status_counts.available}
                                    </span>
                                </div>

                                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-850 flex flex-col">
                                    <span className="text-xs text-zinc-500">Reserved / Borrowed</span>
                                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                                        {stats.equipment_status_counts.reserved + stats.equipment_status_counts.borrowed}
                                    </span>
                                </div>

                                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-850 flex flex-col">
                                    <span className="text-xs text-zinc-500">Under Maintenance</span>
                                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                                        {stats.equipment_status_counts.maintenance}
                                    </span>
                                </div>

                                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-850 flex flex-col">
                                    <span className="text-xs text-zinc-500">Damaged / Broken</span>
                                    <span className="text-xl font-bold text-rose-600 mt-1">
                                        {stats.equipment_status_counts.damaged}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activities Section */}
                <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
                    <Tabs defaultValue="bookings" className="w-full">
                        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <CardTitle className="text-md font-bold flex items-center gap-2">
                                <Activity className="h-4.5 w-4.5 text-zinc-500" /> Recent System Activities
                            </CardTitle>
                            <TabsList className="bg-zinc-100 dark:bg-zinc-900 p-0.5 h-8 rounded-lg self-start sm:self-auto border border-zinc-200/20">
                                <TabsTrigger value="bookings" className="h-7 text-xs rounded-md">Recent Bookings</TabsTrigger>
                                <TabsTrigger value="equipment" className="h-7 text-xs rounded-md">New Equipment</TabsTrigger>
                                <TabsTrigger value="users" className="h-7 text-xs rounded-md">New Users</TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Recent Bookings Tab */}
                        <TabsContent value="bookings" className="m-0 focus-visible:outline-none">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-zinc-50/30 dark:bg-zinc-900/10">
                                        <TableRow>
                                            <TableHead className="font-semibold">User</TableHead>
                                            <TableHead className="font-semibold">Laboratory</TableHead>
                                            <TableHead className="font-semibold">Start Time</TableHead>
                                            <TableHead className="font-semibold">Purpose</TableHead>
                                            <TableHead className="font-semibold">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recent_bookings.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-28 text-center text-zinc-500">
                                                    No recent booking requests.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            recent_bookings.map((booking) => (
                                                <TableRow key={booking.id}>
                                                    <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                                                        {booking.user_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                                                            {booking.laboratory_code}
                                                        </span>
                                                        <span className="block text-xs text-zinc-400">
                                                            {booking.laboratory_name}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                                                        {new Date(booking.start_time).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell className="max-w-[180px] truncate text-zinc-650">
                                                        {booking.purpose}
                                                    </TableCell>
                                                    <TableCell>
                                                        {getBookingStatusBadge(booking.status)}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        {/* New Equipment Tab */}
                        <TabsContent value="equipment" className="m-0 focus-visible:outline-none">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-zinc-50/30 dark:bg-zinc-900/10">
                                        <TableRow>
                                            <TableHead className="font-semibold">Asset Tag</TableHead>
                                            <TableHead className="font-semibold">Name</TableHead>
                                            <TableHead className="font-semibold">Laboratory</TableHead>
                                            <TableHead className="font-semibold">Serial Number</TableHead>
                                            <TableHead className="font-semibold">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recent_equipment.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-28 text-center text-zinc-500">
                                                    No equipment registered yet.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            recent_equipment.map((eq) => (
                                                <TableRow key={eq.id}>
                                                    <TableCell className="font-mono font-bold text-zinc-950 dark:text-zinc-50">
                                                        {eq.asset_tag}
                                                    </TableCell>
                                                    <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                                                        {eq.name}
                                                    </TableCell>
                                                    <TableCell className="text-zinc-600 dark:text-zinc-400 text-xs">
                                                        {eq.laboratory ? `${eq.laboratory.code} - ${eq.laboratory.name}` : 'Unassigned'}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs text-zinc-500">
                                                        {eq.serial_number || 'N/A'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {getEquipmentStatusBadge(eq.status)}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        {/* New Users Tab */}
                        <TabsContent value="users" className="m-0 focus-visible:outline-none">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-zinc-50/30 dark:bg-zinc-900/10">
                                        <TableRow>
                                            <TableHead className="font-semibold">Name</TableHead>
                                            <TableHead className="font-semibold">Username</TableHead>
                                            <TableHead className="font-semibold">Email</TableHead>
                                            <TableHead className="font-semibold">Registered Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recent_users.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="h-28 text-center text-zinc-500">
                                                    No users registered yet.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            recent_users.map((u) => (
                                                <TableRow key={u.id}>
                                                    <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                                                        {u.name}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-zinc-600 dark:text-zinc-400">
                                                        @{u.username}
                                                    </TableCell>
                                                    <TableCell className="text-zinc-600 dark:text-zinc-400">
                                                        {u.email}
                                                    </TableCell>
                                                    <TableCell className="text-zinc-500 text-xs">
                                                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
