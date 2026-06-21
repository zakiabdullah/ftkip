import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
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
import InputError from '@/Components/InputError';
import { Plus, Search, Edit2, Trash2, SlidersHorizontal } from 'lucide-react';
import { Laboratory, User, PaginatedData } from '@/types';

interface Props {
    laboratories: PaginatedData<Laboratory>;
    users: User[];
    filters: {
        search?: string;
        status?: string;
    };
    is_assistant_engineer: boolean;
    is_lecturer: boolean;
    is_student: boolean;
}

export default function Index({ laboratories, users, filters, is_assistant_engineer: isAssistantEngineer, is_lecturer: isLecturer, is_student: isStudent }: Props) {
    const canManageLaboratories = !isLecturer && !isStudent;
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data, setData, post, patch, processing, errors, reset, clearErrors } = useForm({
        name: '',
        code: '',
        capacity: 20,
        location: '',
        status: 'active' as 'active' | 'inactive' | 'maintenance',
        responsible_officer_id: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('laboratories.index'),
            {
                search: search || undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined,
            },
            { preserveState: true }
        );
    };

    const handleResetFilter = () => {
        setSearch('');
        setStatusFilter('all');
        router.get(route('laboratories.index'));
    };

    const openCreateModal = () => {
        clearErrors();
        reset();
        setEditId(null);
        setIsOpen(true);
    };

    const openEditModal = (lab: Laboratory) => {
        clearErrors();
        setEditId(lab.id);
        setData({
            name: lab.name,
            code: lab.code,
            capacity: lab.capacity,
            location: lab.location,
            status: lab.status,
            responsible_officer_id: lab.responsible_officer_id.toString(),
        });
        setIsOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            patch(route('laboratories.update', editId), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        } else {
            post(route('laboratories.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const confirmDelete = (id: number) => {
        setDeleteId(id);
        setIsDeleteOpen(true);
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(route('laboratories.destroy', deleteId), {
                onSuccess: () => setIsDeleteOpen(false),
            });
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium">Active</Badge>;
            case 'inactive':
                return <Badge variant="secondary" className="font-medium">Inactive</Badge>;
            case 'maintenance':
                return <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium">Maintenance</Badge>;
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            {isStudent ? 'Browse Laboratories' : isLecturer ? 'Laboratories' : isAssistantEngineer ? 'My Laboratories' : 'Laboratory Management'}
                        </h2>
                        {isAssistantEngineer && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Laboratories assigned to you and their current operational status.</p>}
                        {isLecturer && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Laboratory information for booking review and planning.</p>}
                        {isStudent && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Laboratory information to help you plan a booking.</p>}
                    </div>
                    {!isAssistantEngineer && canManageLaboratories && <Button
                        onClick={openCreateModal}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
                    >
                        <Plus className="h-4 w-4" /> Add Laboratory
                    </Button>}
                </div>
            }
        >
            <Head title="Laboratories" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl space-y-6">
                {/* Search and Filters */}
                <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md">
                    <CardContent className="p-4 sm:p-6">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                <Input
                                    placeholder="Search by code, name, or location..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
                                />
                            </div>

                            <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                                <div className="w-[180px]">
                                    <Select
                                        value={statusFilter}
                                        onValueChange={(val) => setStatusFilter(val)}
                                    >
                                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <Button type="submit" variant="secondary" className="flex-1 sm:flex-initial">
                                        Apply Filter
                                    </Button>
                                    {(filters.search || filters.status) && (
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

                {/* Laboratories Table */}
                <Card className="overflow-hidden border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-zinc-50 dark:bg-zinc-900/30">
                                <TableRow>
                                    <TableHead className="w-[120px] font-semibold">Code</TableHead>
                                    <TableHead className="font-semibold">Laboratory Name</TableHead>
                                    <TableHead className="font-semibold">Location</TableHead>
                                    <TableHead className="w-[100px] text-center font-semibold">Capacity</TableHead>
                                    <TableHead className="w-[130px] font-semibold">Status</TableHead>
                                    {!isAssistantEngineer && <TableHead className="font-semibold">Responsible Officer</TableHead>}
                                    {canManageLaboratories && <TableHead className="w-[120px] text-right font-semibold">Actions</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {laboratories.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={isAssistantEngineer || isLecturer || isStudent ? 6 : 7} className="h-32 text-center text-zinc-500">
                                            No laboratories found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    laboratories.data.map((lab) => (
                                        <TableRow key={lab.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                                            <TableCell className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                                                {lab.code}
                                            </TableCell>
                                            <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                                                {lab.name}
                                            </TableCell>
                                            <TableCell className="text-zinc-600 dark:text-zinc-400">
                                                {lab.location}
                                            </TableCell>
                                            <TableCell className="text-center font-semibold">
                                                {lab.capacity}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(lab.status)}
                                            </TableCell>
                                            {!isAssistantEngineer && <TableCell className="text-zinc-700 dark:text-zinc-300">
                                                {lab.responsible_officer?.name || 'N/A'}
                                                <span className="block text-xs text-zinc-400">
                                                    {lab.responsible_officer?.email}
                                                </span>
                                            </TableCell>}
                                            {canManageLaboratories && <TableCell className="text-right">
                                                <div className="flex justify-end gap-1.5">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        onClick={() => openEditModal(lab)}
                                                        className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                                                        title={isAssistantEngineer ? 'Update status' : 'Edit laboratory'}
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    {!isAssistantEngineer && <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        onClick={() => confirmDelete(lab.id)}
                                                        className="text-rose-600 hover:text-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>}
                                                </div>
                                            </TableCell>}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {laboratories.links && laboratories.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 sm:px-6">
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                        Showing <span className="font-medium">{laboratories.from}</span> to{' '}
                                        <span className="font-medium">{laboratories.to}</span> of{' '}
                                        <span className="font-medium">{laboratories.total}</span> results
                                    </p>
                                </div>
                                <div className="flex gap-1.5">
                                    {laboratories.links.map((link, idx) => (
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
                            {isAssistantEngineer ? 'Update Laboratory Status' : editId ? 'Edit Laboratory' : 'Add Laboratory'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 py-2">
                        {!isAssistantEngineer && <div className="grid gap-2">
                            <Label htmlFor="code">Laboratory Code</Label>
                            <Input
                                id="code"
                                placeholder="e.g. LAB-FTKIP-01"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                className={errors.code ? 'border-rose-500 focus-visible:ring-rose-500' : ''}
                                required
                            />
                            <InputError message={errors.code} />
                        </div>}

                        {!isAssistantEngineer && <div className="grid gap-2">
                            <Label htmlFor="name">Laboratory Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Embedded Systems Lab"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-rose-500 focus-visible:ring-rose-500' : ''}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>}

                        <div className={isAssistantEngineer ? 'grid gap-2' : 'grid grid-cols-2 gap-4'}>
                            {!isAssistantEngineer && <div className="grid gap-2">
                                <Label htmlFor="capacity">Capacity (Pax)</Label>
                                <Input
                                    id="capacity"
                                    type="number"
                                    min="1"
                                    value={data.capacity}
                                    onChange={(e) => setData('capacity', parseInt(e.target.value) || 0)}
                                    className={errors.capacity ? 'border-rose-500 focus-visible:ring-rose-500' : ''}
                                    required
                                />
                                <InputError message={errors.capacity} />
                            </div>}

                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(val) => setData('status', val as any)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                        </div>

                        {!isAssistantEngineer && <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="e.g. Block B, Level 2"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className={errors.location ? 'border-rose-500 focus-visible:ring-rose-500' : ''}
                                required
                            />
                            <InputError message={errors.location} />
                        </div>}

                        {!isAssistantEngineer && <div className="grid gap-2">
                            <Label htmlFor="officer">Responsible Officer</Label>
                            <Select
                                value={data.responsible_officer_id}
                                onValueChange={(val) => setData('responsible_officer_id', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select responsible staff..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((u) => (
                                        <SelectItem key={u.id} value={u.id.toString()}>
                                            {u.name} ({u.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.responsible_officer_id} />
                        </div>}

                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-indigo-600 text-white hover:bg-indigo-700">
                                {isAssistantEngineer ? 'Update Status' : editId ? 'Save Changes' : 'Create Laboratory'}
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
                            This will permanently delete this laboratory and all associated equipment.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-rose-600 hover:bg-rose-700 text-white">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AuthenticatedLayout>
    );
}
