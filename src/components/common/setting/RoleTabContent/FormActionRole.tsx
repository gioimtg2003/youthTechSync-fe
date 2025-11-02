'use client';

import { Badge } from '@/components/ui/badge';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SYSTEM_RESOURCE, SYSTEM_RESOURCE_LABEL_MAPPING } from '@/constants';
import { useGetPolicy } from '@/services/v1/policy';
import { genKey, isDeepEqualReact } from '@/utils';
import { memo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import InputForm from '../../form/input-form';
import AntdSelectForm from '../../form/select-form-antd';
import PermissionAction from './PermissionAction';
import { TRoleSchema } from './zod';

export interface FormActionRoleProps {
  open: boolean;
}

const FormActionRole = ({ open }: FormActionRoleProps) => {
  const { data: dataPolicy } = useGetPolicy({ params: {}, enabled: open });

  const methods = useForm<TRoleSchema>({
    mode: 'onSubmit',
    resetOptions: {},
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

  return (
    <div className='max-w-3xl max-h-[515px] overflow-auto p-6 scrollbar-form-role-action'>
      <Form {...methods}>
        <DialogHeader>
          <DialogTitle> Create new role</DialogTitle>
        </DialogHeader>
        <InputForm
          control={methods.control}
          name='name'
          label='Role Name'
          placeholder='Enter role name'
        />
        <div
          className='flex w-full mt-4 justify-between items-center'
          id='select-resource'
        >
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
        <div className='w-full min-h-64 mt-4 px-2 py-4 border border-dashed rounded-md overflow-auto'>
          <div className='w-full flex justify-center'></div>
          {(resourceFields ?? [])?.length === 0 && (
            <p className='text-gray-600 text-center'>
              No permissions. Use the <b>Select</b> above to add one.
            </p>
          )}

          {resourceFields?.map((f) => (
            <div
              key={genKey('rs', f?.id, f?.resource)}
              className='mb-6 border-b pb-4 border-dashed'
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
                resourceId={f.id}
                methods={methods}
                actions={dataPolicy?.actions ?? []}
                resource={f.resource}
              />
            </div>
          ))}
        </div>
      </Form>
    </div>
  );
};

FormActionRole.displayName = 'FormActionRole';
export default memo(FormActionRole, isDeepEqualReact);
