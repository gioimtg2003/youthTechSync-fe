'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SYSTEM_RESOURCE, SYSTEM_RESOURCE_LABEL_MAPPING } from '@/constants';
import { cn } from '@/lib/utils';
import { useGetPolicy } from '@/services/v1/policy';
import {
  CreateRoleRequest,
  useMutationCreateRole,
} from '@/services/v1/role/create';
import { isDeepEqualReact } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import InputForm from '../../form/input-form';
import AntdSelectForm from '../../form/select-form-antd';
import PermissionAction from './PermissionAction';
import { TRoleSchema } from './zod';
import RoleSchema from './zod/role-schema.zod';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getQueryClient } from '@/providers/query.provider';
import { ENDPOINT_GET_ROLE } from '@/services/v1/role/get';
import { DeleteOutlined } from '@ant-design/icons';
import { Button as AntdButton } from 'antd';
import Form from '../../form/BaseForm';
export interface FormActionRoleProps {
  open: boolean;
  onChange: (open: boolean) => void;
}

const FormActionRole = ({ open, onChange }: FormActionRoleProps) => {
  const { data: dataPolicy } = useGetPolicy({ params: {}, enabled: open });
  const { mutate: createRole, isPending: isLoadingCreateRole } =
    useMutationCreateRole({});

  const methods = useForm<TRoleSchema>({
    resolver: zodResolver(RoleSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      description: '',
      resources: [],
      permissions: [],
    },
  });

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({
    control: methods.control,
    name: 'permissions',
  });
  const resources = methods.watch('resources') as SYSTEM_RESOURCE[];

  const optionsResources = (dataPolicy?.resource ?? [])?.map((r) => ({
    label: SYSTEM_RESOURCE_LABEL_MAPPING[r],
    value: r,
    disabled:
      r !== SYSTEM_RESOURCE.all && resources?.includes(SYSTEM_RESOURCE.all),
  }));
  const queryClient = getQueryClient();

  const onSubmit = (data: TRoleSchema) => {
    createRole(
      {
        name: data.name,
        description: data?.description,
        permissions: (data?.permissions ??
          []) as CreateRoleRequest['permissions'],
      },
      {
        onSuccess: () => {
          methods.reset();
          queryClient?.invalidateQueries({ queryKey: [ENDPOINT_GET_ROLE] });
          onChange(false);
        },
      }
    );
  };

  return (
    <div className='max-w-3xl max-h-[515px] overflow-auto p-6 scrollbar-form-role-action'>
      <Form<TRoleSchema> onSubmit={onSubmit}>
        <>
          <DialogHeader>
            <DialogTitle> Create new role</DialogTitle>
          </DialogHeader>
          <InputForm
            control={methods.control}
            name='name'
            label='Role Name'
            placeholder='Enter role name'
            className='mb-4'
          />
          <InputForm
            control={methods.control}
            name='description'
            label='Role Description'
            placeholder='Enter role description'
          />
          <div className='flex w-full mt-4 justify-between items-center'>
            <h2 className='text-lg font-medium font-sfpro'>Premissions</h2>
            <AntdSelectForm
              control={methods.control}
              name='resources'
              placeholder='Select resource'
              containerClassName='max-w-[164px]'
              options={optionsResources}
              maxTagCount={'responsive'}
              className='w-full'
              mode='multiple'
              allowClear
              onClear={() => {
                methods.setValue('permissions', []);
              }}
              onDeselect={(v) => {
                const index = resources?.findIndex((rs) => rs === v);
                if (index !== -1) {
                  removeResource(index);
                }
              }}
              onSelect={(v) => {
                if (v === SYSTEM_RESOURCE.all) {
                  methods.setValue('permissions', [
                    {
                      actions: [],
                      resource: v,
                    },
                  ]);
                  methods.setValue('resources', [v]);
                  return;
                }
                appendResource({
                  actions: [],
                  resource: v,
                });
              }}
              getPopupContainer={(props) => {
                return props.parentElement || document.body;
              }}
            />
          </div>
          <div className='w-full min-h-48 mt-4 px-2 py-4 border border-dashed rounded-md overflow-auto'>
            <div className='w-full flex justify-center'></div>
            {(resourceFields ?? [])?.length === 0 && (
              <p className='text-gray-600 text-center'>
                No permissions. Use the <b>Select</b> above to add one.
              </p>
            )}

            {resourceFields?.map((f, idx) => (
              <div
                key={f?.id}
                className={cn(
                  'mb-6 border-b pb-4 border-dashed',
                  idx === resourceFields.length - 1 && 'border-none mb-0 pb-0'
                )}
              >
                <div className='flex justify-start mb-2'>
                  <Badge
                    variant={'outline'}
                    className='text-[14px] leading-[18px]'
                  >
                    {
                      SYSTEM_RESOURCE_LABEL_MAPPING[
                        f?.resource as SYSTEM_RESOURCE
                      ]
                    }
                  </Badge>
                </div>

                <PermissionAction
                  resourceId={idx.toString()}
                  methods={methods}
                  actions={dataPolicy?.actions ?? []}
                  resource={f.resource}
                />
              </div>
            ))}
          </div>
          <div className='w-full flex justify-end items-center gap-2 mt-4'>
            <Tooltip>
              <TooltipTrigger asChild>
                <AntdButton
                  icon={<DeleteOutlined />}
                  variant='text'
                  onClick={() => {
                    methods.reset();
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear data</p>
              </TooltipContent>
            </Tooltip>
            <Button type='submit' loading={isLoadingCreateRole}>
              Create Role
            </Button>
          </div>
        </>
      </Form>
    </div>
  );
};

FormActionRole.displayName = 'FormActionRole';
export default memo(FormActionRole, isDeepEqualReact);
