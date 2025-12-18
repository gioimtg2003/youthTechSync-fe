import { Input } from '@/components/ui/input';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { FieldFC } from '../type';

const FieldText: FieldFC<{}> = (props, ref) => {
  const { autoFocus, mode, fieldProps, ...restProps } = props;

  const refInput = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => refInput?.current, []);

  useEffect(() => {
    if (autoFocus && refInput.current) {
      refInput.current.focus();
    }
  }, [autoFocus]);

  if (mode === 'view') {
    const dom = restProps?.value;
    return <>{dom}</>;
  }

  const dom = <Input ref={refInput} {...restProps} {...fieldProps} />;

  return dom;
};

FieldText.displayName = 'FieldText';
export default forwardRef(FieldText);
