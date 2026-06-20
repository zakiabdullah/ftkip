import { useState, useRef } from 'react';
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
import { Plus, Search, Edit2, Trash2, Image as ImageIcon, Upload } from 'lucide-react';
import { Equipment, Laboratory, PaginatedData } from '@/types';

interface Props {
    equipment: PaginatedData<Equipment>;
    laboratories: Laboratory[];
    filters: {
        search?: string;
        laboratory_id?: string;
        status?: string;
    };
}

export default function Index({ equipment, laboratories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [labFilter, setLabFilter] = useState(filters.laboratory_id || 'all');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        laboratory_id: '',
        name: '',
        asset_tag: '',
        serial_number: '',
        status: 'available' as 'available' | 'reserved' | 'borrowed' | 'maintenance' | 'damaged' | 'retired',
        image: null as File | null,
        _method: 'POST' as 'POST' | 'PATCH',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('equipment.index'),
            {
                search: search || undefined,
                laboratory_id: labFilter !== 'all' ? labFilter : undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined,
            },
            { preserveState: true }
        );
    };

    const handleResetFilter = () => {
        setSearch('');
        setLabFilter('all');
        setStatusFilter('all');
        router.get(route('equipment.index'));
    };

    const openCreateModal = () => {
        clearErrors();
        reset();
        setPreviewUrl(null);
        setEditId(null);
        setData('_method', 'POST');
        setIsOpen(true);
    };

    const openEditModal = (eq: Equipment) => {
        clearErrors();
        setEditId(eq.id);
        setData({
            laboratory_id: eq.laboratory_id.toString(),
            name: eq.name,
            asset_tag: eq.asset_tag,
            serial_number: eq.serial_number || '',
            status: eq.status,
            image: null,
            _method: 'PATCH',
        });
        setPreviewUrl(eq.image_path ? `/storage/${eq.image_path}` : null);
        setIsOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            // Standard POST with _method=PATCH inside Inertia handles files successfully
            post(route('equipment.update', editId), {
                forceFormData: true,
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        } else {
            post(route('equipment.store'), {
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
            router.delete(route('equipment.destroy', deleteId), {
                onSuccess: () => setIsDeleteOpen(false),
            });
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'available':
                return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Available</Badge>;
            case 'reserved':
                return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Reserved</Badge>;
            case 'borrowed':
                return <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white">Borrowed</Badge>;
            case 'maintenance':
                return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">Maintenance</Badge>;
            case 'damaged':
                return <Badge className="bg-rose-500 hover:bg-rose-600 text-white">Damaged</Badge>;
            case 'retired':
                return <Badge variant="secondary">Retired</Badge>;
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Equipment Management
                    </h2>
                    <Button
                        onClick={openCreateModal}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
                    >
                        <Plus className="h-4 w-4" /> Add Equipment
                    </Button>
                </div>
            }
        >
            <Head title="Equipment" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl space-y-6">
                {/* Search and Filters */}
                <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md">
                    <CardContent className="p-4 sm:p-6">
                        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                <Input
                                    placeholder="Search by name, asset tag, or serial..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
                                />
                            </div>

                            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                                <div className="w-[180px]">
                                    <Select value={labFilter} onValueChange={setLabFilter}>
                                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
                                            <SelectValue placeholder="All Laboratories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Laboratories</SelectItem>
                                            {laboratories.map((lab) => (
                                                <SelectItem key={lab.id} value={lab.id.toString()}>
                                                    {lab.code} - {lab.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="w-[180px]">
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
                                            <SelectValue placeholder="All Statuses" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="available">Available</SelectItem>
                                            <SelectItem value="reserved">Reserved</SelectItem>
                                            <SelectItem value="borrowed">Borrowed</SelectItem>
                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                            <SelectItem value="damaged">Damaged</SelectItem>
                                            <SelectItem value="retired">Retired</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <Button type="submit" variant="secondary" className="flex-grow sm:flex-grow-0">
                                        Apply
                                    </Button>
                                    {(filters.search || filters.laboratory_id || filters.status) && (
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

                {/* Equipment Table */}
                <Card className="overflow-hidden border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-zinc-50 dark:bg-zinc-900/30">
                                <TableRow>
                                    <TableHead className="w-[80px] font-semibold">Image</TableHead>
                                    <TableHead className="w-[140px] font-semibold">Asset Tag</TableHead>
                                    <TableHead className="font-semibold">Equipment Name</TableHead>
                                    <TableHead className="font-semibold">Serial Number</TableHead>
                                    <TableHead className="font-semibold">Laboratory</TableHead>
                                    <TableHead className="w-[130px] font-semibold">Status</TableHead>
                                    <TableHead className="w-[120px] text-right font-semibold">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {equipment.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center text-zinc-500">
                                            No equipment assets found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    equipment.data.map((eq) => (
                                        <TableRow key={eq.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                                            <TableCell>
                                                <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-850 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                                    {eq.image_path ? (
                                                        <img
                                                            src={`/storage/${eq.image_path}`}
                                                            alt={eq.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <ImageIcon className="h-5 w-5 text-zinc-400" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-mono font-bold text-zinc-950 dark:text-zinc-50">
                                                {eq.asset_tag}
                                            </TableCell>
                                            <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                                                {eq.name}
                                            </TableCell>
                                            <TableCell className="text-zinc-600 dark:text-zinc-400 font-mono text-xs">
                                                {eq.serial_number || 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-zinc-700 dark:text-zinc-300">
                                                {eq.laboratory ? (
                                                    <span>
                                                        <strong className="text-indigo-600 dark:text-indigo-400 font-mono font-bold block">{eq.laboratory.code}</strong>
                                                        <span className="text-xs text-zinc-400">{eq.laboratory.name}</span>
                                                    </span>
                                                ) : (
                                                    'Unassigned'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(eq.status)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1.5">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        onClick={() => openEditModal(eq)}
                                                        className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        onClick={() => confirmDelete(eq.id)}
                                                        className="text-rose-600 hover:text-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/20"
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
                    {equipment.links && equipment.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 sm:px-6">
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                        Showing <span className="font-medium">{equipment.from}</span> to{' '}
                                        <span className="font-medium">{equipment.to}</span> of{' '}
                                        <span className="font-medium">{equipment.total}</span> results
                                    </p>
                                </div>
                                <div className="flex gap-1.5">
                                    {equipment.links.map((link, idx) => (
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
                            {editId ? 'Edit Equipment' : 'Add Equipment'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 py-2">
                        {/* Image Uploader */}
                        <div className="flex flex-col items-center gap-3 py-2">
                            <div className="h-24 w-24 rounded-lg bg-zinc-50 border-2 border-dashed border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800 flex items-center justify-center overflow-hidden relative group">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <ImageIcon className="h-8 w-8 text-zinc-400" />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-1 text-xs"
                            >
                                <Upload className="h-3.5 w-3.5" /> Upload Image
                            </Button>
                            <InputError message={errors.image} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="laboratory_id">Laboratory Location</Label>
                            <Select
                                value={data.laboratory_id}
                                onValueChange={(val) => setData('laboratory_id', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select target laboratory..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {laboratories.map((lab) => (
                                        <SelectItem key={lab.id} value={lab.id.toString()}>
                                            {lab.code} - {lab.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.laboratory_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Equipment Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Oscilloscope Tektronix"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-rose-500' : ''}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="asset_tag">Asset Tag</Label>
                            <Input
                                id="asset_tag"
                                placeholder="e.g. EQ-FTKIP-0024"
                                value={data.asset_tag}
                                onChange={(e) => setData('asset_tag', e.target.value)}
                                className={errors.asset_tag ? 'border-rose-500' : ''}
                                required
                            />
                            <InputError message={errors.asset_tag} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="serial_number">Serial Number</Label>
                                <Input
                                    id="serial_number"
                                    placeholder="Optional"
                                    value={data.serial_number}
                                    onChange={(e) => setData('serial_number', e.target.value)}
                                    className={errors.serial_number ? 'border-rose-500' : ''}
                                />
                                <InputError message={errors.serial_number} />
                            </div>

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
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="reserved">Reserved</SelectItem>
                                        <SelectItem value="borrowed">Borrowed</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                        <SelectItem value="damaged">Damaged</SelectItem>
                                        <SelectItem value="retired">Retired</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                        </div>

                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-indigo-600 text-white hover:bg-indigo-700">
                                {editId ? 'Save Changes' : 'Create Asset'}
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
                            This will permanently delete this equipment asset record.
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
