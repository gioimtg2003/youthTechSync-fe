'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GetRoleResponse, useQueryGetRole } from '@/services/v1/role/get';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye, Files, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { memo, useState } from 'react';

const TableRole = () => {
  const { data, isPending } = useQueryGetRole();

  const columnsRender: ColumnDef<GetRoleResponse[number]>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('name')}</div>
      ),
    },

    {
      accessorKey: 'description',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Description
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('description')}</div>
      ),
    },

    {
      id: 'actions',
      enableHiding: false,

      cell: ({ row }) => {
        const role = row?.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel className='p-2'>
                Actions for {role.name}
              </DropdownMenuLabel>
              {/* Additional menu items can be added here */}
              <DropdownMenuItem>
                <Eye /> View Role
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SquarePen /> Edit Role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Files />
                Copy Role to other{' '}
                <b className='font-medium -ml-1'>Workspace</b>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <ArrowLeftRight /> Move Role to other{' '}
                <b className='font-medium -ml-1'>Workspace</b>
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem variant='destructive'>
                <Trash2 /> Delete Role
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: data || [],
    columns: columnsRender,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody isLoading={isPending} columnCount={columnsRender.length}>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className='h-10'
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columnsRender?.length}
              className='h-24 text-center'
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
TableRole.displayName = 'TableRole';
export default memo(TableRole);
