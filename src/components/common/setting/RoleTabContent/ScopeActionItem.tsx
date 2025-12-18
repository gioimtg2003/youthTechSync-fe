import { isDeepEqualReact } from '@/utils';
import { memo } from 'react';
import { FormSelect } from '../../form';

export interface ScopeActionItemProps {
  name: string;
}
const ScopeActionItem = (props: ScopeActionItemProps) => {
  const { name } = props;
  return (
    <FormSelect
      name={name}
      adapter='antd'
      fieldProps={{
        placeholder: 'Select scope',
        mode: 'multiple',
        allowClear: true,
        maxTagCount: 'responsive',
        className: 'w-[156px]',
        getPopupContainer: (props) => {
          return props.parentElement || document.body;
        },
      }}
      //   onClear={() => {
      //     methods.setValue('permissions', []);
      //   }}
      //   onDeselect={(v) => {
      //     const index = resources?.findIndex((rs) => rs === v);
      //     if (index !== -1) {
      //       removeResource(index);
      //     }
      //   }}
      //   onSelect={(v) => {
      //     appendResource({
      //       actions: [],
      //       resource: v,
      //     });
      //   }}
    />
  );
};

ScopeActionItem.displayName = 'ScopeActionItem';

export default memo(ScopeActionItem, isDeepEqualReact);
