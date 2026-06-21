import * as React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';
import {
    SidebarProvider,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '@/Components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Separator } from '@/Components/ui/separator';
import { TooltipProvider } from '@/Components/ui/tooltip';
import {
    LayoutDashboard,
    Building2,
    Wrench,
    CalendarDays,
    Settings,
    Users,
    LogOut,
    User,
    ChevronsUpDown,
    Command,
    Sun,
    Moon,
    Monitor,
} from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const userRole = user.roles?.[0]?.name || 'Super Administrator';
    const isAssistantEngineer = userRole === 'Assistant Engineer';
    const canManageUsers = userRole === 'Super Administrator';

    const userInitials = user.name
        ? user.name
              .split(' ')
              .map((n: string) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()
        : 'US';

    const [theme, setThemeState] = React.useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as Theme) || 'system';
        }
        return 'system';
    });

    React.useEffect(() => {
        const root = window.document.documentElement;
        
        const applyTheme = (currentTheme: Theme) => {
            root.classList.remove('light', 'dark');
            
            if (currentTheme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                root.classList.add(systemDark ? 'dark' : 'light');
            } else {
                root.classList.add(currentTheme);
            }
        };

        applyTheme(theme);

        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => applyTheme('system');
            
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        localStorage.setItem('theme', newTheme);
        setThemeState(newTheme);
    };

    const isDashboardActive = route().current('dashboard');
    const isLaboratoriesActive = route().current('laboratories.*');
    const isEquipmentActive = route().current('equipment.*');
    const isBookingsActive = route().current('bookings.*');
    const isSettingsActive = route().current('settings.*');
    const isUsersActive = route().current('users.*');

    const getBreadcrumbs = () => {
        if (route().current('dashboard')) {
            return [{ label: 'Overview', url: route('dashboard') }, { label: 'Dashboard', active: true }];
        }
        if (route().current('laboratories.*')) {
            return [{ label: isAssistantEngineer ? 'Daily Operations' : 'Management', url: '#' }, { label: isAssistantEngineer ? 'My Laboratories' : 'Laboratories', active: true }];
        }
        if (route().current('equipment.*')) {
            return [{ label: isAssistantEngineer ? 'Daily Operations' : 'Management', url: '#' }, { label: 'Equipment', active: true }];
        }
        if (route().current('bookings.*')) {
            return [{ label: isAssistantEngineer ? 'Daily Operations' : 'Management', url: '#' }, { label: 'Bookings', active: true }];
        }
        if (route().current('settings.*')) return [{ label: 'Management', url: '#' }, { label: 'System Settings', active: true }];
        if (route().current('users.*')) {
            return [{ label: 'Management', url: '#' }, { label: 'Users', active: true }];
        }
        if (route().current('profile.edit')) {
            return [{ label: 'Account', url: '#' }, { label: 'Profile Settings', active: true }];
        }
        return [{ label: 'Portal', active: true }];
    };

    return (
        <TooltipProvider>
            <SidebarProvider defaultOpen={true}>
                <div className="flex min-h-screen w-full bg-zinc-50 dark:bg-zinc-950">
                    {/* Left Sidebar */}
                    <Sidebar variant="sidebar" collapsible="icon">
                        {/* Header */}
                        <SidebarHeader className="border-b border-sidebar-border/50 p-4">
                            <div className="flex items-center gap-3 px-1.5 py-1">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
                                    <Command className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-tight group-data-[collapsible=icon]:hidden">
                                    <span className="font-bold tracking-tight text-zinc-900 dark:text-zinc-50">SPMP-FTKIP</span>
                                    <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider dark:text-zinc-400">Portal</span>
                                </div>
                            </div>
                        </SidebarHeader>

                        {/* Navigation Content */}
                        <SidebarContent className="p-2 gap-4">
                            {/* Overview Group */}
                            <div className="px-2 py-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 group-data-[collapsible=icon]:hidden">
                                    Overview
                                </span>
                                <SidebarMenu className="mt-1.5">
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isDashboardActive}
                                            tooltip="Dashboard"
                                        >
                                            <Link href={route('dashboard')} className="flex items-center gap-3">
                                                <LayoutDashboard className="h-4.5 w-4.5 shrink-0" />
                                                <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                </SidebarMenu>
                            </div>

                            {/* Daily Operations Group */}
                            <div className="px-2 py-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 group-data-[collapsible=icon]:hidden">
                                    Daily Operations
                                </span>
                                <SidebarMenu className="mt-1.5 gap-1">
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isLaboratoriesActive}
                                            tooltip={isAssistantEngineer ? 'My Laboratories' : 'Laboratories'}
                                        >
                                            <Link href={route('laboratories.index')} className="flex items-center gap-3">
                                                <Building2 className="h-4.5 w-4.5 shrink-0" />
                                                <span className="group-data-[collapsible=icon]:hidden">{isAssistantEngineer ? 'My Laboratories' : 'Laboratories'}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isEquipmentActive}
                                            tooltip={isAssistantEngineer ? 'My Equipment' : 'Equipment'}
                                        >
                                            <Link href={route('equipment.index')} className="flex items-center gap-3">
                                                <Wrench className="h-4.5 w-4.5 shrink-0" />
                                                <span className="group-data-[collapsible=icon]:hidden">{isAssistantEngineer ? 'My Equipment' : 'Equipment'}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={isBookingsActive} tooltip="Bookings">
                                            <Link href={route('bookings.index')} className="flex items-center gap-3">
                                                <CalendarDays className="h-4.5 w-4.5 shrink-0" />
                                                <span className="group-data-[collapsible=icon]:hidden">Bookings</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                </SidebarMenu>
                            </div>
                            {canManageUsers && <div className="px-2 py-1.5"><span className="text-[10px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 group-data-[collapsible=icon]:hidden">Administration</span><SidebarMenu className="mt-1.5 gap-1"><SidebarMenuItem><SidebarMenuButton asChild isActive={isUsersActive} tooltip="User Accounts"><Link href={route('users.index')} className="flex items-center gap-3"><Users className="h-4.5 w-4.5 shrink-0" /><span className="group-data-[collapsible=icon]:hidden">User Accounts</span></Link></SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton asChild isActive={isSettingsActive} tooltip="System Settings"><Link href={route('settings.edit')} className="flex items-center gap-3"><Settings className="h-4.5 w-4.5 shrink-0" /><span className="group-data-[collapsible=icon]:hidden">System Settings</span></Link></SidebarMenuButton></SidebarMenuItem></SidebarMenu></div>}
                        </SidebarContent>

                        {/* Footer / User Widget */}
                        <SidebarFooter className="border-t border-sidebar-border/50 p-2">
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuButton
                                                size="lg"
                                                className="w-full justify-between data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                            >
                                                <div className="flex items-center gap-2 text-left">
                                                    <Avatar className="h-8 w-8 rounded-lg">
                                                        <AvatarFallback className="rounded-lg font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                                            {userInitials}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                                        <span className="truncate font-semibold text-zinc-900 dark:text-zinc-50">{user.name}</span>
                                                        <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">{userRole}</span>
                                                    </div>
                                                </div>
                                                <ChevronsUpDown className="ml-auto size-4 text-zinc-500 dark:text-zinc-400 group-data-[collapsible=icon]:hidden" />
                                            </SidebarMenuButton>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                            side="bottom"
                                            align="end"
                                            sideOffset={4}
                                        >
                                            <DropdownMenuLabel className="p-0 font-normal">
                                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                                    <Avatar className="h-8 w-8 rounded-lg">
                                                        <AvatarFallback className="rounded-lg font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                                            {userInitials}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                                        <span className="truncate font-semibold text-zinc-900 dark:text-zinc-50">{user.name}</span>
                                                        <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">{user.email}</span>
                                                    </div>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href={route('profile.edit')} className="w-full flex items-center gap-2 cursor-pointer">
                                                    <User className="size-4" />
                                                    <span>Profile Settings</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="w-full flex items-center gap-2 text-red-600 dark:text-red-400 cursor-pointer focus:bg-red-50 dark:focus:bg-red-950/20 focus:text-red-600 text-left"
                                                >
                                                    <LogOut className="size-4" />
                                                    <span>Log Out</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarFooter>
                    </Sidebar>

                    {/* Right Content View */}
                    <SidebarInset className="flex flex-col flex-1">
                        {/* Top Header Bar */}
                        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 bg-white dark:bg-zinc-950">
                            <SidebarTrigger className="-ml-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50" />
                            <Separator orientation="vertical" className="mr-2 h-4 bg-zinc-200 dark:bg-zinc-800" />
                            
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                                {getBreadcrumbs().map((item, index) => (
                                    <React.Fragment key={index}>
                                        {index > 0 && <span className="text-zinc-300 dark:text-zinc-700">/</span>}
                                        {item.active ? (
                                            <span className="font-semibold text-zinc-900 dark:text-zinc-50">{item.label}</span>
                                        ) : (
                                            <span className="text-zinc-400 dark:text-zinc-500">{item.label}</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="flex-1" />

                            {/* Top Right Quick Actions */}
                            <div className="flex items-center gap-3">
                                {/* Theme Switcher */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200/80 bg-white text-zinc-500 hover:text-zinc-900 focus:outline-none dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                                            {theme === 'light' && <Sun className="h-4.5 w-4.5" />}
                                            {theme === 'dark' && <Moon className="h-4.5 w-4.5" />}
                                            {theme === 'system' && <Monitor className="h-4.5 w-4.5" />}
                                            <span className="sr-only">Toggle theme</span>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-32 rounded-lg">
                                        <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer gap-2">
                                            <Sun className="h-4 w-4" />
                                            <span>Light</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer gap-2">
                                            <Moon className="h-4 w-4" />
                                            <span>Dark</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer gap-2">
                                            <Monitor className="h-4 w-4" />
                                            <span>System</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <span className="hidden sm:inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 px-2.5 py-1 rounded-full text-xs text-indigo-700 dark:text-indigo-400 font-semibold">
                                    {userRole}
                                </span>
                            </div>
                        </header>

                        {/* Page Main Header (Optional slot) */}
                        {header && (
                            <div className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 py-6 px-6 sm:px-8">
                                <div className="mx-auto max-w-7xl">
                                    {header}
                                </div>
                            </div>
                        )}

                        {/* Main Content Area */}
                        <main className="flex-1 overflow-y-auto">
                            {children}
                        </main>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </TooltipProvider>
    );
}
