import { isDeepEqualReact } from '@/utils';
import { memo } from 'react';
import { Control } from 'react-hook-form';
import AntdSelectForm from '../../form/select-form-antd';

export interface ScopeActionItemProps {
  name: string;
  control: Control<any>;
}
const ScopeActionItem = (props: ScopeActionItemProps) => {
  const { name, control } = props;
  return (
    <AntdSelectForm
      control={control}
      name={name}
      placeholder='Select resource'
      containerClassName='max-w-[156px]'
      options={[]}
      maxTagCount={'responsive'}
      className='w-full'
      mode='multiple'
      allowClear
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
      getPopupContainer={(props) => {
        return props.parentElement || document.body;
      }}
    />
  );
};

ScopeActionItem.displayName = 'ScopeActionItem';

export default memo(ScopeActionItem, isDeepEqualReact);
