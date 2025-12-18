import {
  ACTION_PERMISSION_ICON_MAPPING,
  ACTION_PERMISSION_LABEL_MAPPING,
  ActionPermission,
  SYSTEM_RESOURCE,
} from '@/constants';
import { cn } from '@/lib/utils';
import { isDeepEqualReact } from '@/utils';
import { memo, useRef } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { FormSelect } from '../../form';
import FormList from '../../form/FormList';
import { FormListActionType } from '../../form/FormList/type';
import ScopeActionItem from './ScopeActionItem';
import { TRoleSchema } from './zod';

export interface PermissionActionProps {
  resourceId: string;
  methods: UseFormReturn<any>;
  actions: ActionPermission[];
  resource: string;
}
const PermissionAction = (props: PermissionActionProps) => {
  const { resourceId, actions, resource } = props;

  const { setValue, getValues, watch } = useFormContext();

  const actionFormListRef =
    useRef<
      FormListActionType<TRoleSchema['permissions'][number]['actions'][number]>
    >(undefined);
  const nameFormList = `permissions.${resourceId}.actions`;

  const actionFields = watch(
    nameFormList
  ) as TRoleSchema['permissions'][number]['actions'];

  const optionsActions = actions?.map((action) => ({
    label: ACTION_PERMISSION_LABEL_MAPPING[action],
    value: action,
    disabled:
      action !== ActionPermission.manage &&
      actionFields?.some((f) => f?.action === ActionPermission.manage),
  }));

  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <h4 className='text-sm font-medium font-sfpro'>Actions</h4>
        <FormSelect
          name={`permissions.${resourceId}.permissionActions`}
          adapter='antd'
          fieldProps={{
            placeholder: 'Select actions',
            className: 'w-[156px]',
            options: optionsActions,
            maxTagCount: 'responsive',
            mode: 'multiple',
            allowClear: true,
            onClear() {
              setValue(nameFormList, []);
            },
            onDeselect(v) {
              const index = actionFields?.findIndex((act) => act?.action === v);
              if (index !== -1) {
                actionFormListRef.current?.remove(index);
              }
            },
            onSelect(v) {
              console.log('🚀 ~ PermissionAction ~ getValues:', getValues());

              if (v === ActionPermission.manage) {
                // remove all other actions if manage is selected
                setValue(nameFormList, [{ action: v }]);

                setValue(`permissions.${resourceId}.permissionActions`, [v]);
                return;
              }
              actionFormListRef.current?.add({
                action: v,
              });
            },
            getPopupContainer(props) {
              return props.parentElement || document.body;
            },
          }}
          // placeholder='Select actions'
          // containerClassName='max-w-[156px]'
          // options={optionsActions}
          // maxTagCount={'responsive'}
          // className='w-full'
          // mode='multiple'
          // allowClear
          // onClear={() => {
          //   setValue(nameFormList, []);
          // }}
          // onDeselect={(v) => {
          //   const index = actionFields?.findIndex((act) => act?.action === v);
          //   if (index !== -1) {
          //     actionFormListRef.current?.remove(index);
          //   }
          // }}
          // onSelect={(v) => {
          //   console.log('🚀 ~ PermissionAction ~ getValues:', getValues());

          //   if (v === ActionPermission.manage) {
          //     // remove all other actions if manage is selected
          //     setValue(nameFormList, [{ action: v }]);

          //     setValue(`permissions.${resourceId}.permissionActions`, [v]);
          //     return;
          //   }
          //   actionFormListRef.current?.add({
          //     action: v,
          //   });
          // }}
          // getPopupContainer={(props) => {
          //   return props.parentElement || document.body;
          // }}
        />
      </div>

      <FormList<TRoleSchema['permissions'][number]['actions'][number]>
        name={nameFormList}
        emptyList={
          <p className='text-sm text-muted-foreground'>
            No actions selected for this permission.
          </p>
        }
        className='flex flex-col gap-y-3'
        actionRef={actionFormListRef}
      >
        {(fields) =>
          fields?.map((f) => {
            const Icon =
              ACTION_PERMISSION_ICON_MAPPING[
                f?.value?.action as ActionPermission
              ];
            return (
              <div
                key={f?.key}
                className={cn(
                  'flex items-center justify-between w-full',
                  f?.value?.action === ActionPermission.create &&
                    'justify-start'
                )}
              >
                <div className={'flex justify-center items-center gap-1'}>
                  <Icon className='size-4 text-gray-600' />
                  <span className='text-sm font-medium'>
                    {
                      ACTION_PERMISSION_LABEL_MAPPING[
                        f?.value?.action as ActionPermission
                      ]
                    }
                  </span>
                </div>

                {f?.value?.action !== ActionPermission.create &&
                  resource !== SYSTEM_RESOURCE.all && (
                    <ScopeActionItem name={`${nameFormList}.${f.id}.scope`} />
                  )}
              </div>
            );
          })
        }
      </FormList>
    </>
  );
};

PermissionAction.displayName = 'PermissionAction';

export default memo(PermissionAction, isDeepEqualReact);
