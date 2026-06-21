"use client";

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  type RowSelectionState
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertTriangle
} from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/Components/ui/card";
import { DashboardBooking } from "@/types";

interface Props {
  bookings: DashboardBooking[];
  title?: string;
  description?: string;
}

export function RecentBookingsTable({ bookings, title = "Recent Booking Requests", description = "View and manage recent laboratory reservation activities." }: Props) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1 w-fit">
            <CheckCircle2 className="h-3 w-3" /> Approved
          </Badge>
        );
      case "pending_supervisor":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1 w-fit">
            <Clock className="h-3 w-3" /> Pending Supervisor
          </Badge>
        );
      case "pending_admin":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 w-fit">
            <Clock className="h-3 w-3" /> Pending Assistant Engineer
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-1 w-fit">
            <AlertTriangle className="h-3 w-3" /> Rejected
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="secondary" className="flex items-center gap-1 w-fit">
            <Clock className="h-3 w-3" /> Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  const columns = React.useMemo<ColumnDef<DashboardBooking>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: "user_name",
        header: "User",
        cell: ({ row }) => (
          <div className="font-medium text-zinc-900 dark:text-zinc-100">
            {row.original.user_name}
          </div>
        )
      },
      {
        accessorKey: "laboratory_code",
        header: "Laboratory",
        cell: ({ row }) => (
          <div>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {row.original.laboratory_code}
            </span>
            <span className="block text-xs text-zinc-400 dark:text-zinc-500">
              {row.original.laboratory_name}
            </span>
          </div>
        )
      },
      {
        accessorKey: "start_time",
        header: "Start Time",
        cell: ({ row }) => {
          return (
            <div className="text-xs text-zinc-650 dark:text-zinc-400">
              {new Date(row.original.start_time).toLocaleString()}
            </div>
          );
        }
      },
      {
        accessorKey: "purpose",
        header: "Purpose",
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate text-zinc-600 dark:text-zinc-400">
            {row.original.purpose}
          </div>
        )
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          return getBookingStatusBadge(row.original.status);
        }
      }
    ],
    []
  );

  const table = useReactTable({
    data: bookings,
    columns,
    state: {
      rowSelection,
      globalFilter
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5
      }
    }
  });

  const selectedRowsCount = Object.keys(rowSelection).length;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <div className="flex gap-2">
            <Input
              placeholder="Filter bookings..."
              className="max-w-sm"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {selectedRowsCount} of {bookings.length} row(s) selected.
          </p>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
