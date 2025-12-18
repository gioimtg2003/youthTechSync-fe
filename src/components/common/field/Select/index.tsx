import { Select } from '@/components/ui/select';
import { Select as SelectAntd } from 'antd';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { FieldFC } from '../type';

export type SelectFieldProps = {};
const FieldSelect: FieldFC<{}> = (props, ref) => {
  const { mode, adapter, fieldProps, ...restProps } = props;
  const refSelect = useRef<any>(null);

  useImperativeHandle(ref, () => refSelect?.current, []);

  if (mode === 'view') {
    const dom = restProps?.value;
    return <>{dom}</>;
  }

  if (adapter === 'antd') {
    return <SelectAntd ref={refSelect} {...restProps} {...fieldProps} />;
  }
  return <Select {...restProps} />;
};
FieldSelect.displayName = 'FieldSelect';

export default forwardRef(FieldSelect);
