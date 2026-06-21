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
    summary: { item_count: number; total_quantity: number; available_quantity: number; attention_quantity: number };
}

const statuses = ['available', 'maintenance', 'damaged', 'retired'] as const;

export default function Index({ items, laboratories, filters, is_assistant_engineer: isAssistantEngineer, summary }: Props) {
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
            <div><h2 className="text-2xl font-bold tracking-tight">{isAssistantEngineer ? 'My Equipment' : 'Equipment'}</h2>
                <p className="mt-1 text-sm text-zinc-500">{isAssistantEngineer ? 'Inventory assigned to your laboratories.' : 'Bulk inventory, equipment sets, and software licenses.'}</p></div>
            <Button onClick={() => openEditor()} className="bg-indigo-600 hover:bg-indigo-700"><PackagePlus className="mr-2 h-4 w-4" />Add Equipment</Button>
        </div>}>
            <Head title="Equipment" />
            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-zinc-500">{isAssistantEngineer ? 'My Equipment Items' : 'Equipment Items'}</p><p className="mt-1 text-2xl font-bold">{summary.item_count}</p></div><Package className="h-8 w-8 text-indigo-600" /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-zinc-500">{isAssistantEngineer ? 'Units in My Labs' : 'Declared Units'}</p><p className="mt-1 text-2xl font-bold">{summary.total_quantity}</p></div><PackagePlus className="h-8 w-8 text-violet-600" /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-zinc-500">Available Units</p><p className="mt-1 text-2xl font-bold">{summary.available_quantity}</p></div><CheckCircle2 className="h-8 w-8 text-emerald-600" /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-zinc-500">Needs Attention</p><p className="mt-1 text-2xl font-bold">{summary.attention_quantity}</p></div><AlertTriangle className="h-8 w-8 text-amber-600" /></CardContent></Card>
                </div>
                <Card><CardContent className="p-4"><form onSubmit={applyFilters} className="flex flex-col gap-3 md:flex-row">
                    <div className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" /><Input className="pl-9" placeholder="Search inventory..." value={search} onChange={(event) => setSearch(event.target.value)} /></div>
                    <Select value={laboratoryId} onValueChange={setLaboratoryId}><SelectTrigger className="md:w-56"><SelectValue placeholder="All laboratories" /></SelectTrigger><SelectContent><SelectItem value="all">All laboratories</SelectItem>{laboratories.map((lab) => <SelectItem key={lab.id} value={String(lab.id)}>{lab.code} — {lab.name}</SelectItem>)}</SelectContent></Select>
                    <Select value={status} onValueChange={setStatus}><SelectTrigger className="md:w-40"><SelectValue placeholder="All statuses" /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem>{statuses.map((value) => <SelectItem key={value} value={value} className="capitalize">{value}</SelectItem>)}</SelectContent></Select>
                    <Button type="submit" variant="secondary">Apply Filters</Button>
                </form></CardContent></Card>

                <Card className="overflow-hidden"><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Equipment</TableHead><TableHead>Laboratory</TableHead><TableHead className="text-right">Quantity</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>
                    {items.data.length === 0 ? <TableRow><TableCell colSpan={6} className="h-28 text-center text-zinc-500">No equipment items found.</TableCell></TableRow> : items.data.map((item) => <TableRow key={item.id}><TableCell className="font-medium">{item.name}</TableCell><TableCell><span className="font-mono font-semibold text-indigo-600">{item.laboratory?.code}</span><span className="block text-xs text-zinc-500">{item.laboratory?.name}</span></TableCell><TableCell className="text-right font-semibold">{item.quantity}</TableCell><TableCell className="capitalize">{item.unit_type}</TableCell><TableCell>{statusBadge(item.status)}</TableCell><TableCell><div className="flex justify-end gap-1"><Button variant="ghost" size="icon-sm" title="Edit equipment" onClick={() => openEditor(item)}><Edit2 className="h-4 w-4" /></Button>{!isAssistantEngineer && <Button variant="ghost" size="icon-sm" className="text-rose-600" title="Delete item" onClick={() => { if (confirm(`Delete ${item.name}?`)) router.delete(route('equipment.destroy', item.id)); }}><Trash2 className="h-4 w-4" /></Button>}</div></TableCell></TableRow>)}
                </TableBody></Table></div></Card>
            </div>

            <Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>{editItem ? 'Edit Equipment' : 'Add Equipment'}</DialogTitle></DialogHeader><form onSubmit={submit} className="space-y-4">
                <><div className="grid gap-2"><Label>Laboratory</Label><Select value={data.laboratory_id} onValueChange={(value) => setData('laboratory_id', value)}><SelectTrigger><SelectValue placeholder="Select laboratory" /></SelectTrigger><SelectContent>{laboratories.map((lab) => <SelectItem key={lab.id} value={String(lab.id)}>{lab.code} — {lab.name}</SelectItem>)}</SelectContent></Select></div><div className="grid gap-2"><Label>Equipment name</Label><Input value={data.name} onChange={(event) => setData('name', event.target.value)} /></div><div className="grid grid-cols-2 gap-4"><div className="grid gap-2"><Label>Quantity</Label><Input type="number" min="1" value={data.quantity} onChange={(event) => setData('quantity', Number(event.target.value))} /></div><div className="grid gap-2"><Label>Unit type</Label><Select value={data.unit_type} onValueChange={(value) => setData('unit_type', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="unit">Unit</SelectItem><SelectItem value="set">Set</SelectItem><SelectItem value="piece">Piece</SelectItem><SelectItem value="license">License</SelectItem></SelectContent></Select></div></div><div className="flex items-center gap-2"><Checkbox checked={data.track_individually} onCheckedChange={(checked) => setData('track_individually', checked === true)} /><Label>Track individual assets</Label></div></>
                <div className="grid gap-2"><Label>Status</Label><Select value={data.status} onValueChange={(value) => setData('status', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{statuses.map((value) => <SelectItem key={value} value={value} className="capitalize">{value}</SelectItem>)}</SelectContent></Select></div>
                <DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit" disabled={processing} className="bg-indigo-600 hover:bg-indigo-700">Save Equipment</Button></DialogFooter>
            </form></DialogContent></Dialog>
        </AuthenticatedLayout>
    );
}
