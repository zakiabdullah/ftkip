import { useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/Components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/Components/ui/alert-dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import InputError from '@/Components/InputError';
import { Plus, Search, Edit2, Trash2, ShieldAlert } from 'lucide-react';
import { User, Role, PaginatedData } from '@/types';

interface Props {
    users: PaginatedData<User>;
    roles: Role[];
    filters: {
        search?: string;
        role?: string;
    };
}

export default function Index({ users, roles, filters }: Props) {
    const authUser = usePage().props.auth.user;
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || 'all');
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data, setData, post, patch, processing, errors, reset, clearErrors } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('users.index'),
            {
                search: search || undefined,
                role: roleFilter !== 'all' ? roleFilter : undefined,
            },
            { preserveState: true }
        );
    };

    const handleResetFilter = () => {
        setSearch('');
        setRoleFilter('all');
        router.get(route('users.index'));
    };

    const openCreateModal = () => {
        clearErrors();
        reset();
        setEditId(null);
        setIsOpen(true);
    };

    const openEditModal = (u: User) => {
        clearErrors();
        setEditId(u.id);
        setData({
            name: u.name,
            username: u.username,
            email: u.email,
            password: '',
            password_confirmation: '',
            role: u.roles?.[0]?.name || '',
        });
        setIsOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            patch(route('users.update', editId), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        } else {
            post(route('users.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const confirmDelete = (id: number) => {
        if (id === authUser.id) return; // Prevent deleting self UI side
        setDeleteId(id);
        setIsDeleteOpen(true);
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(route('users.destroy', deleteId), {
                onSuccess: () => setIsDeleteOpen(false),
            });
        }
    };

    const getRoleBadgeColor = (roleName: string) => {
        switch (roleName) {
            case 'Super Administrator':
                return 'bg-red-500 hover:bg-red-600 text-white font-medium';
            case 'Assistant Engineer':
                return 'bg-blue-500 hover:bg-blue-600 text-white font-medium';
            case 'Lecturer / Supervisor':
                return 'bg-purple-500 hover:bg-purple-600 text-white font-medium';
            case 'Student':
                return 'bg-zinc-500 hover:bg-zinc-600 text-white font-medium';
            default:
                return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200';
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        User Management & Roles
                    </h2>
                    <Button
                        onClick={openCreateModal}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
                    >
                        <Plus className="h-4 w-4" /> Add User
                    </Button>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl space-y-6">
                {/* Search and Filters */}
                <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md">
                    <CardContent className="p-4 sm:p-6">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                <Input
                                    placeholder="Search by name, username, or email..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
                                />
                            </div>

                            <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                                <div className="w-[200px]">
                                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
                                            <SelectValue placeholder="Filter by role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Roles</SelectItem>
                                            {roles.map((r) => (
                                                <SelectItem key={r.id} value={r.name}>
                                                    {r.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <Button type="submit" variant="secondary" className="flex-1 sm:flex-initial">
                                        Apply
                                    </Button>
                                    {(filters.search || filters.role) && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={handleResetFilter}
                                            className="text-zinc-500 hover:text-zinc-900"
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card className="overflow-hidden border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-zinc-50 dark:bg-zinc-900/30">
                                <TableRow>
                                    <TableHead className="font-semibold">User Details</TableHead>
                                    <TableHead className="font-semibold">Username</TableHead>
                                    <TableHead className="font-semibold">Email Address</TableHead>
                                    <TableHead className="font-semibold">Role Assigned</TableHead>
                                    <TableHead className="w-[120px] text-right font-semibold">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.data.map((u) => (
                                        <TableRow key={u.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 border border-zinc-200/50">
                                                        <AvatarFallback className="bg-indigo-50 text-indigo-700 font-semibold text-xs dark:bg-zinc-900 dark:text-indigo-400">
                                                            {getInitials(u.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <span className="font-medium text-zinc-900 dark:text-zinc-50 block">
                                                            {u.name}
                                                        </span>
                                                        {u.id === authUser.id && (
                                                            <span className="inline-flex items-center text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-1.5 py-0.5 rounded-full">
                                                                Logged In
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-mono font-semibold text-zinc-600 dark:text-zinc-400">
                                                @{u.username}
                                            </TableCell>
                                            <TableCell className="text-zinc-600 dark:text-zinc-400">
                                                {u.email}
                                            </TableCell>
                                            <TableCell>
                                                {u.roles && u.roles.length > 0 ? (
                                                    <Badge className={getRoleBadgeColor(u.roles[0].name)}>
                                                        {u.roles[0].name}
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-zinc-400 border-zinc-200">
                                                        No Role
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1.5">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        onClick={() => openEditModal(u)}
                                                        className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        disabled={u.id === authUser.id}
                                                        onClick={() => confirmDelete(u.id)}
                                                        className={`text-rose-600 hover:text-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/20 ${u.id === authUser.id ? 'opacity-30 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent' : ''}`}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {users.links && users.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 sm:px-6">
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                        Showing <span className="font-medium">{users.from}</span> to{' '}
                                        <span className="font-medium">{users.to}</span> of{' '}
                                        <span className="font-medium">{users.total}</span> results
                                    </p>
                                </div>
                                <div className="flex gap-1.5">
                                    {users.links.map((link, idx) => (
                                        <Button
                                            key={idx}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => {
                                                if (link.url) router.get(link.url, {}, { preserveState: true });
                                            }}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={!link.url ? 'opacity-50 pointer-events-none' : ''}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>
                            {editId ? 'Edit User Details & Role' : 'Add User Account'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Full Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-rose-500' : ''}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                className={errors.username ? 'border-rose-500' : ''}
                                required
                            />
                            <InputError message={errors.username} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@utem.edu.my"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={errors.email ? 'border-rose-500' : ''}
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="role">Role Type</Label>
                            <Select
                                value={data.role}
                                onValueChange={(val) => setData('role', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Assign a role..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((r) => (
                                        <SelectItem key={r.id} value={r.name}>
                                            {r.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.role} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder={editId ? 'Keep empty to skip' : '••••••••'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={errors.password ? 'border-rose-500' : ''}
                                    required={!editId}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    placeholder={editId ? 'Keep empty to skip' : '••••••••'}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className={errors.password_confirmation ? 'border-rose-500' : ''}
                                    required={!editId}
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>

                        {editId && (
                            <p className="text-[11px] text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5">
                                <ShieldAlert className="h-3.5 w-3.5 text-zinc-400" />
                                Leaving the password fields empty will preserve the user's current password.
                            </p>
                        )}

                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-indigo-600 text-white hover:bg-indigo-700">
                                {editId ? 'Save Changes' : 'Create User'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Alert Dialog */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this user account. All their records and associations will be updated. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-rose-600 hover:bg-rose-700 text-white">
                            Delete Account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AuthenticatedLayout>
    );
}
