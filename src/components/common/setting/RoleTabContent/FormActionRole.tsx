'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DEFAULT_ID,
  SYSTEM_RESOURCE,
  SYSTEM_RESOURCE_LABEL_MAPPING,
} from '@/constants';
import { cn } from '@/lib/utils';
import { useGetPolicy } from '@/services/v1/policy';
import {
  CreateRoleRequest,
  useMutationCreateRole,
} from '@/services/v1/role/create';
import { isDeepEqualReact } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, memo, useRef } from 'react';
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
import { useMutationUpdateRole } from '@/services/v1/role/update';
import { DeleteOutlined } from '@ant-design/icons';
import { Button as AntdButton } from 'antd';
import { DefaultValues } from 'react-hook-form';
import { FormSelect, FormText } from '../../form';
import Form, { BaseGFormRef } from '../../form/BaseForm';
import FormList from '../../form/FormList';
import { FormListActionType } from '../../form/FormList/type';
import { FormModeType } from '../../form/type';
export interface FormActionRoleProps {
  open: boolean;
  onChange: (open: boolean) => void;
  mode?: FormModeType | 'create';

  data?: DefaultValues<TRoleSchema> & { id?: number };
}

//TODO: improve performance when open form with mode edit
const FormActionRole = ({
  open,
  onChange,
  mode = 'create',
  data: dataProps = {
    name: '',
    description: '',
    permissions: [],
  },
}: FormActionRoleProps) => {
  const { data: dataPolicy } = useGetPolicy({ params: {}, enabled: open });
  const { mutate: createRole, isPending: isLoadingCreateRole } =
    useMutationCreateRole({});
  const { mutate: updateRole, isPending: isLoadingUpdateRole } =
    useMutationUpdateRole({});

  const actionFormListRef =
    useRef<FormListActionType<TRoleSchema['permissions'][number]>>(undefined);
  const formRef = useRef<BaseGFormRef<TRoleSchema>>(null);

  const queryClient = getQueryClient();

  const onSubmit = (data: TRoleSchema) => {
    if (mode === 'edit') {
      updateRole(
        {
          id: dataProps?.id ?? DEFAULT_ID,
          name: data.name,
          description: data?.description,
          permissions: (data?.permissions ??
            []) as CreateRoleRequest['permissions'],
        },
        {
          onSuccess: () => {
            formRef.current?.reset();
            queryClient?.invalidateQueries({ queryKey: [ENDPOINT_GET_ROLE] });
            onChange(false);
          },
        }
      );
    }
    if (mode === 'create')
      createRole(
        {
          name: data.name,
          description: data?.description,
          permissions: (data?.permissions ??
            []) as CreateRoleRequest['permissions'],
        },
        {
          onSuccess: () => {
            formRef.current?.reset();
            queryClient?.invalidateQueries({ queryKey: [ENDPOINT_GET_ROLE] });
            onChange(false);
          },
        }
      );
  };

  const title =
    mode === 'create'
      ? 'Create new role'
      : mode === 'edit'
        ? `Edit ${dataProps?.name ?? 'role'}`
        : `View ${dataProps?.name ?? 'role'}`;

  return (
    <div className='max-w-3xl max-h-[515px] overflow-auto p-6 scrollbar-form-role-action'>
      <Form<TRoleSchema>
        onSubmit={onSubmit}
        resolver={zodResolver(RoleSchema)}
        mode={mode === 'create' || mode === 'edit' ? 'edit' : 'view'}
        defaultValues={dataProps}
        ref={formRef}
      >
        {({ methods }) => {
          return (
            <Fragment>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <FormText
                name='name'
                label='Role Name'
                layout='vertical'
                fieldProps={{
                  placeholder: 'Enter role name',
                }}
              />
              <FormText
                name='description'
                label='Role Description'
                layout='vertical'
                fieldProps={{
                  placeholder: 'Enter role description',
                }}
              />
              <div className='flex w-full mt-4 justify-between items-center'>
                <h2 className='text-lg font-medium font-sfpro'>Premissions</h2>
                <FormSelect
                  name={'resources'}
                  adapter='antd'
                  fieldProps={{
                    placeholder: 'Select resource',
                    options: (dataPolicy?.resource ?? [])?.map((r) => ({
                      label: SYSTEM_RESOURCE_LABEL_MAPPING[r],
                      value: r,
                      disabled:
                        r !== SYSTEM_RESOURCE.all &&
                        methods
                          .watch('resources')
                          ?.includes(SYSTEM_RESOURCE.all),
                    })),
                    maxTagCount: 'responsive',
                    className: 'w-[164px]',
                    mode: 'multiple',
                    allowClear: true,
                    onClear: () => {
                      methods.setValue('permissions', []);
                    },
                    onChange(newValue) {
                      const previousValue =
                        methods.getValues('resources') || [];

                      if (newValue.length < previousValue.length) {
                        const removedValue = previousValue.find(
                          (item) => !newValue.includes(item)
                        );

                        const index = previousValue.indexOf(removedValue ?? '');
                        if (index !== -1) {
                          actionFormListRef?.current?.remove(index);
                        }
                      }
                    },

                    onSelect: (v) => {
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
                      actionFormListRef?.current?.add({
                        actions: [],
                        resource: v,
                      });
                    },
                    getPopupContainer: (props) => {
                      return props.parentElement || document.body;
                    },
                  }}
                />
              </div>
              <FormList<TRoleSchema['permissions'][number]>
                name={'permissions'}
                emptyList={
                  <p className='text-gray-600 text-center'>
                    No permissions. Use the <b>Select</b> above to add one.
                  </p>
                }
                actionRef={actionFormListRef}
                className='w-full min-h-48 mt-4 px-2 py-4 border border-dashed rounded-md overflow-auto'
              >
                {(fields) =>
                  fields?.map((f) => (
                    <div
                      key={f?.key}
                      className={cn(
                        'mb-6 border-b pb-4 border-dashed',
                        f?.idx === fields?.length - 1 && 'border-none mb-0 pb-0'
                      )}
                    >
                      <div className='flex justify-start mb-2 flex-col gap-1'>
                        <Badge
                          variant={'outline'}
                          className='text-[14px] leading-[18px]'
                        >
                          {
                            SYSTEM_RESOURCE_LABEL_MAPPING[
                              f?.value?.resource as SYSTEM_RESOURCE
                            ]
                          }
                        </Badge>
                        <PermissionAction
                          resourceId={f?.idx.toString()}
                          methods={methods}
                          actions={dataPolicy?.actions ?? []}
                          resource={f?.value?.resource}
                        />
                      </div>
                    </div>
                  ))
                }
              </FormList>
              {(mode === 'create' || mode === 'edit') && (
                <div className='w-full flex justify-end items-center gap-2 mt-4'>
                  <Tooltip>
                    <TooltipTrigger asChild data-slot='tooltip-trigger'>
                      <AntdButton
                        icon={<DeleteOutlined />}
                        variant='text'
                        onClick={() => {
                          formRef.current?.reset();
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clear data</p>
                    </TooltipContent>
                  </Tooltip>
                  <Button
                    type='submit'
                    loading={isLoadingCreateRole || isLoadingUpdateRole}
                  >
                    {mode === 'edit' ? 'Save Changes' : 'Create Role'}
                  </Button>
                </div>
              )}
            </Fragment>
          );
        }}
      </Form>
    </div>
  );
};

FormActionRole.displayName = 'FormActionRole';
export default memo(FormActionRole, isDeepEqualReact);
