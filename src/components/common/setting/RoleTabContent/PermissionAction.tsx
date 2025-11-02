import {
  ACTION_PERMISSION_ICON_MAPPING,
  ACTION_PERMISSION_LABEL_MAPPING,
  ActionPermission,
} from '@/constants';
import { cn } from '@/lib/utils';
import { genKey, isDeepEqualReact } from '@/utils';
import { memo } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import AntdSelectForm from '../../form/select-form-antd';
import ScopeActionItem from './ScopeActionItem';
import { TRoleSchema } from './zod';

export interface PermissionActionProps {
  resourceId: string;
  methods: UseFormReturn<any>;
  actions: ActionPermission[];
}
const PermissionAction = (props: PermissionActionProps) => {
  const { methods, resourceId, actions } = props;
  const {
    fields: actionFields,
    append: appendAction,
    remove: removeAction,
  } = useFieldArray<TRoleSchema['permissions'][number]>({
    control: methods.control,
    name: `permissions.${resourceId}.actions` as 'actions',
  });

  const optionsActions = actions?.map((action) => ({
    label: ACTION_PERMISSION_LABEL_MAPPING[action],
    value: action,
    disabled:
      action !== ActionPermission.manage &&
      actionFields?.some((af) => af.action === ActionPermission.manage),
  }));

  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <h4 className='text-sm font-medium font-sfpro'>Actions</h4>
        <AntdSelectForm
          control={methods.control}
          name={`permissions.${resourceId}.permissionActions`}
          placeholder='Select actions'
          containerClassName='max-w-[156px]'
          options={optionsActions}
          maxTagCount={'responsive'}
          className='w-full'
          mode='multiple'
          allowClear
          onClear={() => {
            methods.setValue(`permissions.${resourceId}.actions`, []);
          }}
          onDeselect={(v) => {
            const index = actionFields?.findIndex((act) => act?.action === v);
            if (index !== -1) {
              removeAction(index);
            }
          }}
          onSelect={(v) => {
            if (v === ActionPermission.manage) {
              // remove all other actions if manage is selected
              methods.setValue(`permissions.${resourceId}.actions`, [
                { action: v },
              ]);

              methods.setValue(`permissions.${resourceId}.permissionActions`, [
                v,
              ]);
              return;
            }
            appendAction({
              action: v,
            });
          }}
          getPopupContainer={(props) => {
            return props.parentElement || document.body;
          }}
        />
      </div>

      {(actionFields ?? [])?.length === 0 && (
        <p className='text-sm text-muted-foreground'>
          No actions selected for this permission.
        </p>
      )}

      <div className='flex flex-col gap-y-3'>
        {actionFields?.map((f) => {
          const Icon =
            ACTION_PERMISSION_ICON_MAPPING[f.action as ActionPermission];
          return (
            <div
              key={genKey('permission', resourceId, 'action', f?.id, f?.action)}
              className={cn(
                'flex items-center justify-between w-full',
                f.action === ActionPermission.create && 'justify-start'
              )}
            >
              <div className={'flex justify-center items-center gap-1'}>
                <Icon className='size-4 text-gray-600' />
                <span className='text-sm font-medium'>
                  {
                    ACTION_PERMISSION_LABEL_MAPPING[
                      f.action as ActionPermission
                    ]
                  }
                </span>
              </div>
              {f?.action !== ActionPermission.create && (
                <ScopeActionItem
                  name={`permissions.${resourceId}.actions.${f.id}.scope`}
                  control={methods.control}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

PermissionAction.displayName = 'PermissionAction';

export default memo(PermissionAction, isDeepEqualReact);
