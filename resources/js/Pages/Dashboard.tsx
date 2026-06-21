import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import {
    ArrowUpRight,
    Users,
    Building2,
    Wrench,
    CalendarDays,
    TrendingUp,
    Shield,
    LogOut,
} from 'lucide-react';
import { User, EquipmentInventoryItem, DashboardBooking, DashboardStats } from '@/types';
import CustomDateRangePicker from "@/Components/custom-date-range-picker";
import {
    ChatWidget,
    ExerciseMinutes,
    RecentBookingsTable,
    PaymentMethodCard,
    SubscriptionsCard,
    TeamMembersCard,
    TotalRevenueCard
} from "@/Components/Dashboard";

interface Props {
    stats: DashboardStats;
    recent_users: User[];
    recent_equipment: EquipmentInventoryItem[];
    recent_bookings: DashboardBooking[];
    is_assistant_engineer: boolean;
}

export default function Dashboard({ stats, recent_users, recent_bookings, is_assistant_engineer: isAssistantEngineer }: Props) {
    const authUser = usePage().props.auth.user;
    const userRole = authUser.roles?.[0]?.name || 'Super Administrator';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            {isAssistantEngineer ? 'Operations Dashboard' : 'Dashboard Overview'}
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {isAssistantEngineer ? 'Your assigned laboratories, equipment, and booking activity.' : 'Real-time statistics and activities for FTKIP Portal.'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 px-3 py-1.5 rounded-lg text-sm text-indigo-700 dark:text-indigo-400 font-semibold w-fit">
                            <Shield className="h-4.5 w-4.5" /> {userRole} Portal
                        </div>
                        <CustomDateRangePicker />
                        <Button variant="destructive" asChild size="sm">
                            <Link href={route('logout')} method="post" as="button" className="flex items-center">
                                <LogOut className="h-4 w-4 mr-2" />
                                <span>Log Out</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl space-y-6">
                {/* Welcome Card */}
                <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 md:p-8 text-white shadow-md">
                    <div className="relative z-10 max-w-2xl space-y-2">
                        <h3 className="text-xl md:text-2xl font-bold">
                            Welcome back, {authUser.name}!
                        </h3>
                        <p className="text-sm md:text-base text-zinc-100/90 leading-relaxed">
                            {isAssistantEngineer ? (
                                <>Manage your assigned laboratories, equipment assets, and booking activity from one place.</>
                            ) : (
                                <>You are logged in as a <strong>{userRole}</strong>. You have full access to manage laboratory details, register new equipment assets, authorize bookings, and administer system users.</>
                            )}
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
                            <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{isAssistantEngineer ? 'My Laboratories' : 'Total Users'}</CardTitle>
                            <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <Users className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight">{isAssistantEngineer ? stats.total_laboratories : stats.total_users}</div>
                            <div className="flex items-center gap-1 mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                                <Link href={route(isAssistantEngineer ? 'laboratories.index' : 'users.index')} className="flex items-center gap-0.5 hover:underline">
                                    {isAssistantEngineer ? 'View my laboratories' : 'Manage accounts'} <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 2: Laboratories */}
                    <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{isAssistantEngineer ? 'Active Laboratories' : 'Laboratories'}</CardTitle>
                            <div className="h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Building2 className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight">{isAssistantEngineer ? stats.lab_status_counts.active : stats.total_laboratories}</div>
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
                                    Manage equipment <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 4: Bookings */}
                    <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{isAssistantEngineer ? 'Booking Requests' : 'Active Bookings'}</CardTitle>
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

                {/* Symmetrical Shadcn Grid Layout */}
                <div className="gap-4 space-y-4 lg:grid lg:grid-cols-3 lg:space-y-0">
                    {!isAssistantEngineer && <TeamMembersCard users={recent_users} />}
                    {!isAssistantEngineer && <SubscriptionsCard />}
                    {!isAssistantEngineer && <TotalRevenueCard />}
                    {!isAssistantEngineer && <ChatWidget />}
                    {!isAssistantEngineer && <div className="lg:col-span-2">
                        <ExerciseMinutes />
                    </div>}
                    <div className="lg:col-span-2">
                        <RecentBookingsTable bookings={recent_bookings} />
                    </div>
                    <PaymentMethodCard />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
