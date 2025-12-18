import { Select } from '@/components/ui/select';
import { objectToMap } from '@/utils';
import { Select as SelectAntd } from 'antd';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { fieldParsingValue } from '../helper/fieldParsingValue';
import { FieldFC } from '../type';

export type SelectFieldProps = {};
const FieldSelect: FieldFC<{}> = (props, ref) => {
  const { mode, adapter, fieldProps, ...restProps } = props;
  const refSelect = useRef<any>(null);

  useImperativeHandle(ref, () => refSelect?.current, []);

  const optionsValueEnum = useMemo(() => {
    if (mode !== 'view') return;

    const valuesMap = new Map();

    const traverseOpt = (opt: any) => {
      if (!opt?.length || !Array.isArray(opt)) return valuesMap;

      const length = opt?.length;
      let i = 0;

      while (i < length) {
        const cur = opt[i++];

        valuesMap.set(cur?.value, cur?.label);

        // Recursive traverse children
        traverseOpt(cur?.children || cur?.value);
      }

      return valuesMap;
    };

    return traverseOpt(fieldProps?.options);
  }, [fieldProps?.options, mode]);

  if (mode === 'view') {
    const dom = fieldParsingValue(
      restProps?.value || fieldProps?.value,
      objectToMap(optionsValueEnum)
    );

    return <>{dom}</>;
  }

  if (adapter === 'antd') {
    return <SelectAntd ref={refSelect} {...restProps} {...fieldProps} />;
  }
  return <Select {...restProps} />;
};
FieldSelect.displayName = 'FieldSelect';

export default forwardRef(FieldSelect);
