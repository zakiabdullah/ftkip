import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Badge } from '@/Components/ui/badge';
import { Checkbox } from '@/Components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { AlertTriangle, CheckCircle2, Edit2, Package, PackagePlus, Search, Trash2 } from 'lucide-react';
import { EquipmentInventoryItem, Laboratory, PaginatedData } from '@/types';

interface Props {
    items: PaginatedData<EquipmentInventoryItem>;
    laboratories: Pick<Laboratory, 'id' | 'name' | 'code'>[];
    filters: { search?: string; laboratory_id?: string; status?: string };
    is_assistant_engineer: boolean;
    is_lecturer: boolean;
    is_student: boolean;
    summary: { item_count: number; total_quantity: number; available_quantity: number; attention_quantity: number };
}

const statuses = ['available', 'maintenance', 'damaged', 'retired'] as const;

export default function Index({ items, laboratories, filters, is_assistant_engineer: isAssistantEngineer, is_lecturer: isLecturer, is_student: isStudent, summary }: Props) {
    const canManageInventory = !isLecturer && !isStudent;
    const [search, setSearch] = useState(filters.search || '');
    const [laboratoryId, setLaboratoryId] = useState(filters.laboratory_id || 'all');
    const [status, setStatus] = useState(filters.status || 'all');
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState<EquipmentInventoryItem | null>(null);
    const { data, setData, post, patch, processing, reset } = useForm({
        laboratory_id: '', name: '', quantity: 1, unit_type: 'unit', track_individually: false, status: 'available',
    });

    const applyFilters = (event: React.FormEvent) => {
        event.preventDefault();
        router.get(route('equipment.index'), {
            search: search || undefined,
            laboratory_id: laboratoryId === 'all' ? undefined : laboratoryId,
            status: status === 'all' ? undefined : status,
        }, { preserveState: true });
    };

    const openEditor = (item?: EquipmentInventoryItem) => {
        setEditItem(item || null);
        setData(item ? {
            laboratory_id: String(item.laboratory_id), name: item.name, quantity: item.quantity,
            unit_type: item.unit_type, track_individually: item.track_individually, status: item.status,
        } : { laboratory_id: '', name: '', quantity: 1, unit_type: 'unit', track_individually: false, status: 'available' });
        setOpen(true);
    };

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        if (editItem) {
            patch(route('equipment.update', editItem.id), { onSuccess: () => { setOpen(false); reset(); } });
        } else {
            post(route('equipment.store'), { onSuccess: () => { setOpen(false); reset(); } });
        }
    };

    const statusBadge = (itemStatus: string) => {
        const styles: Record<string, string> = {
            available: 'bg-emerald-500 hover:bg-emerald-600', maintenance: 'bg-amber-500 hover:bg-amber-600',
            damaged: 'bg-rose-500 hover:bg-rose-600', retired: 'bg-zinc-500 hover:bg-zinc-600',
        };
        return <Badge className={`${styles[itemStatus]} text-white capitalize`}>{itemStatus}</Badge>;
    };

    return (
        <AuthenticatedLayout header={<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="text-2xl font-bold tracking-tight">{isStudent ? 'Browse Equipment' : isAssistantEngineer ? 'My Equipment' : 'Equipment'}</h2>
                <p className="mt-1 text-sm text-zinc-500">{isStudent ? 'Equipment information to help you plan a booking.' : isLecturer ? 'Equipment information for booking review and planning.' : isAssistantEngineer ? 'Inventory assigned to your laboratories.' : 'Bulk inventory, equipment sets, and software licenses.'}</p></div>
            {canManageInventory && <Button onClick={() => openEditor()} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 self-start sm:self-auto"><PackagePlus className="h-4 w-4" />Add Equipment</Button>}
        </div>}>
            <Head title="Equipment" />
            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-zinc-500">{isAssistantEngineer ? 'My Equipment Items' : 'Equipment Items'}</p><p className="mt-1 text-2xl font-bold">{summary.item_count}</p></div><Package className="h-8 w-8 text-indigo-600" /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-zinc-500">{isAssistantEngineer ? 'Units in My Labs' : 'Declared Units'}</p><p className="mt-1 text-2xl font-bold">{summary.total_quantity}</p></div><PackagePlus className="h-8 w-8 text-violet-600" /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-zinc-500">Available Units</p><p className="mt-1 text-2xl font-bold">{summary.available_quantity}</p></div><CheckCircle2 className="h-8 w-8 text-emerald-600" /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-zinc-500">Needs Attention</p><p className="mt-1 text-2xl font-bold">{summary.attention_quantity}</p></div><AlertTriangle className="h-8 w-8 text-amber-600" /></CardContent></Card>
                </div>
                <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-sm bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md"><CardContent className="p-4 sm:p-6"><form onSubmit={applyFilters} className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                    <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" /><Input className="pl-9 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800" placeholder="Search by equipment name..." value={search} onChange={(event) => setSearch(event.target.value)} /></div>
                    <div className="flex items-center gap-4 flex-wrap md:flex-nowrap"><Select value={laboratoryId} onValueChange={setLaboratoryId}><SelectTrigger className="w-[200px] bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"><SelectValue placeholder="All laboratories" /></SelectTrigger><SelectContent><SelectItem value="all">All Laboratories</SelectItem>{laboratories.map((lab) => <SelectItem key={lab.id} value={String(lab.id)}>{lab.code} — {lab.name}</SelectItem>)}</SelectContent></Select>
                    <Select value={status} onValueChange={setStatus}><SelectTrigger className="w-[160px] bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"><SelectValue placeholder="All statuses" /></SelectTrigger><SelectContent><SelectItem value="all">All Statuses</SelectItem>{statuses.map((value) => <SelectItem key={value} value={value} className="capitalize">{value}</SelectItem>)}</SelectContent></Select>
                    <Button type="submit" variant="secondary">Apply</Button></div>
                </form></CardContent></Card>

                <Card className="overflow-hidden border-zinc-200/80 dark:border-zinc-800 shadow-sm"><div className="overflow-x-auto"><Table className="table-fixed"><TableHeader className="bg-zinc-50 dark:bg-zinc-900/30"><TableRow><TableHead className="w-[35%] font-semibold">Equipment Details</TableHead><TableHead className="w-[22%] font-semibold">Laboratory</TableHead><TableHead className="text-center font-semibold">Quantity</TableHead><TableHead className="font-semibold">Type</TableHead><TableHead className="font-semibold">Status</TableHead>{canManageInventory && <TableHead className="w-[120px] text-right font-semibold">Actions</TableHead>}</TableRow></TableHeader><TableBody>
                    {items.data.length === 0 ? <TableRow><TableCell colSpan={canManageInventory ? 6 : 5} className="h-32 text-center text-zinc-500">No equipment items found.</TableCell></TableRow> : items.data.map((item) => <TableRow key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10"><TableCell className="whitespace-normal break-words font-medium text-zinc-900 dark:text-zinc-50">{item.name}</TableCell><TableCell className="whitespace-normal break-words"><span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">{item.laboratory?.code}</span><span className="block text-xs text-zinc-500">{item.laboratory?.name}</span></TableCell><TableCell className="text-center font-semibold">{item.quantity}</TableCell><TableCell className="capitalize text-zinc-600 dark:text-zinc-400">{item.unit_type}</TableCell><TableCell>{statusBadge(item.status)}</TableCell>{canManageInventory && <TableCell className="text-right"><div className="flex justify-end gap-1.5"><Button variant="ghost" size="icon-sm" title="Edit equipment" onClick={() => openEditor(item)}><Edit2 className="h-4 w-4" /></Button>{!isAssistantEngineer && <Button variant="ghost" size="icon-sm" className="text-rose-600" title="Delete item" onClick={() => { if (confirm(`Delete ${item.name}?`)) router.delete(route('equipment.destroy', item.id)); }}><Trash2 className="h-4 w-4" /></Button>}</div></TableCell>}</TableRow>)}
                </TableBody></Table></div>{items.links && items.links.length > 3 && <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 sm:px-6"><p className="text-sm text-zinc-700 dark:text-zinc-300">Showing <span className="font-medium">{items.from}</span> to <span className="font-medium">{items.to}</span> of <span className="font-medium">{items.total}</span> results</p><div className="flex gap-1.5">{items.links.map((link, idx) => <Button key={idx} variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url} onClick={() => link.url && router.get(link.url, {}, { preserveState: true })} dangerouslySetInnerHTML={{ __html: link.label }} />)}</div></div>}</Card>
            </div>

            <Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>{editItem ? 'Edit Equipment' : 'Add Equipment'}</DialogTitle></DialogHeader><form onSubmit={submit} className="space-y-4">
                <><div className="grid gap-2"><Label>Laboratory</Label><Select value={data.laboratory_id} onValueChange={(value) => setData('laboratory_id', value)}><SelectTrigger><SelectValue placeholder="Select laboratory" /></SelectTrigger><SelectContent>{laboratories.map((lab) => <SelectItem key={lab.id} value={String(lab.id)}>{lab.code} — {lab.name}</SelectItem>)}</SelectContent></Select></div><div className="grid gap-2"><Label>Equipment name</Label><Input value={data.name} onChange={(event) => setData('name', event.target.value)} /></div><div className="grid grid-cols-2 gap-4"><div className="grid gap-2"><Label>Quantity</Label><Input type="number" min="1" value={data.quantity} onChange={(event) => setData('quantity', Number(event.target.value))} /></div><div className="grid gap-2"><Label>Unit type</Label><Select value={data.unit_type} onValueChange={(value) => setData('unit_type', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="unit">Unit</SelectItem><SelectItem value="set">Set</SelectItem><SelectItem value="piece">Piece</SelectItem><SelectItem value="license">License</SelectItem></SelectContent></Select></div></div><div className="flex items-center gap-2"><Checkbox checked={data.track_individually} onCheckedChange={(checked) => setData('track_individually', checked === true)} /><Label>Track individual assets</Label></div></>
                <div className="grid gap-2"><Label>Status</Label><Select value={data.status} onValueChange={(value) => setData('status', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{statuses.map((value) => <SelectItem key={value} value={value} className="capitalize">{value}</SelectItem>)}</SelectContent></Select></div>
                <DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit" disabled={processing} className="bg-indigo-600 hover:bg-indigo-700">Save Equipment</Button></DialogFooter>
            </form></DialogContent></Dialog>
        </AuthenticatedLayout>
    );
}
