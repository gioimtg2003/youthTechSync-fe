'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { useDisclosure } from '@/hooks';
import { getQueryClient } from '@/providers/query.provider';
import { useMutationDeleteRole } from '@/services/v1/role/delete';
import {
  ENDPOINT_GET_ROLE,
  GetRoleResponse,
  useQueryGetRole,
} from '@/services/v1/role/get';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import omit from 'lodash/omit';
import { Eye, Files, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { memo, useState } from 'react';
import { DefaultValues } from 'react-hook-form';
import { FormModeType } from '../../form/type';
import FormActionRole from './FormActionRole';
import { TRoleSchema } from './zod';

const TableRole = () => {
  const { data, isPending, isFetching } = useQueryGetRole();
  const { mutate: deleteRole, isPending: isPendingDelete } =
    useMutationDeleteRole({});
  const {
    isOpen: isOpenActionForm,
    open: openActionForm,
    onChange: onChangeActionForm,
    data: dataActionForm,
  } = useDisclosure<{
    mode: FormModeType | 'create';
    data?: DefaultValues<TRoleSchema>;
  }>();

  const queryClient = getQueryClient();

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

        const dataAction = {
          ...omit(role, ['permission']),
          resources: role?.permissions?.map((p) => p?.resource) || [],
          permissions:
            role?.permissions?.map((p) => ({
              ...omit(p, []),
              permissionActions: p?.actions?.map((a) => a?.action),
            })) || [],
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='max-w-[270px]'>
              <DropdownMenuLabel className='p-2 truncate'>
                Actions for {role.name}
              </DropdownMenuLabel>
              {/* Additional menu items can be added here */}
              <DropdownMenuItem
                onClick={() => {
                  openActionForm({
                    mode: 'view',
                    data: dataAction as DefaultValues<TRoleSchema>,
                  });
                }}
              >
                <Eye /> View Role
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  openActionForm({
                    mode: 'edit',
                    data: dataAction as DefaultValues<TRoleSchema>,
                  });
                }}
              >
                <SquarePen /> Edit Role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Files />
                Copy Role to other{' '}
                <b className='font-medium -ml-1'>Workspace</b>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant='destructive'>
                <Dialog>
                  <DialogTrigger
                    asChild
                    onClick={(e) => {
                      e?.stopPropagation();
                      console.log('click');
                    }}
                  >
                    <div className='flex items-center gap-2 w-full'>
                      <Trash2 className='text-red-500' />
                      <span>Delete Role</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    className='!max-w-[425px]'
                    onClick={(e) => {
                      e?.stopPropagation();
                    }}
                  >
                    <DialogHeader>
                      <DialogTitle>Delete role</DialogTitle>
                      <DialogDescription className=' text-gray-600'>
                        Are you sure you want to delete the role &quot;
                        <b>{role?.name}</b>
                        &quot;? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant='outline'>Cancel</Button>
                      </DialogClose>
                      <Button
                        loading={isPendingDelete}
                        onClick={() => {
                          deleteRole(
                            {
                              roleId: role?.id,
                            },
                            {
                              onSuccess: () => {
                                queryClient?.invalidateQueries({
                                  queryKey: [ENDPOINT_GET_ROLE],
                                });
                              },
                            }
                          );
                        }}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
    <>
      <Dialog open={isOpenActionForm} onOpenChange={onChangeActionForm}>
        <DialogContent className='p-0 overflow-hidden'>
          <FormActionRole
            open={isOpenActionForm}
            onChange={onChangeActionForm}
            {...dataActionForm}
          />
        </DialogContent>
      </Dialog>
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
        <TableBody
          isLoading={isPending || isPendingDelete || isFetching}
          columnCount={columnsRender.length}
        >
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
    </>
  );
};
TableRole.displayName = 'TableRole';
export default memo(TableRole);
