import { Select } from '@/components/ui/select';
import { Select as SelectAntd } from 'antd';
import { forwardRef } from 'react';
import { FieldFC } from '../type';

export type SelectFieldProps = {};
const FieldSelect: FieldFC<{}> = (props) => {
  const { mode, adapter, ...restProps } = props;

  if (mode === 'view') {
    const dom = restProps?.value;
    return <>{dom}</>;
  }

  if (adapter === 'antd') {
    return <SelectAntd {...restProps} />;
  }
  return <Select {...restProps} />;
};
FieldSelect.displayName = 'FieldSelect';

export default forwardRef(FieldSelect);
