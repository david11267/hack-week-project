import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type HousingSociety } from "@/types";
import FormDialog from "./FormDialog";
import TableModifiers from "./TableModifiers";
type Props = {
  selectedRow: HousingSociety | undefined;
  setSelectedRow: React.Dispatch<React.SetStateAction<HousingSociety | undefined>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: HousingSociety[];
};
const columnHelper = createColumnHelper<HousingSociety>();
const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address", {
    header: "Address",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("builtYear", {
    header: "Built",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("nrOfApartments", {
    header: "Apartments",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastNotesDrop", {
    header: "Last Notes Drop",
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("lastUpdated", {
    header: "Last Updated",
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("registeredPhoneNumbers", {
    header: "Phones",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.port.code, {
    id: "port.code",
    header: "Port Code",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.port.status, {
    id: "port.status",
    header: "Port Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.port.accessibility, {
    id: "port.accessibility",
    header: "Accessibility",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.notes.length, {
    id: "notes",
    header: "Notes",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.port.lastUpdate, {
    id: "port.lastUpdate",
    header: "Port Updated",
    cell: (info) => info.getValue().toLocaleString(),
  }),
];

export default function DataTable({ selectedRow, setSelectedRow, open, setOpen, data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="max-h-[50rem] overflow-y-auto">
      <FormDialog open={open} selectedRow={selectedRow} setOpen={setOpen} />

      <TableModifiers open={open} setOpen={setOpen} setSelectedRow={setSelectedRow} table={table} />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead key={h.id} className="sticky top-0 z-10 bg-accent">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              className="cursor-pointer"
              key={row.id}
              onClick={() => {
                setSelectedRow(row.original);
                setOpen(true);
              }}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
