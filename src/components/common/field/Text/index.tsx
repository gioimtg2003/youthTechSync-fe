import { Input } from '@/components/ui/input';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { FieldFC } from '../type';

const FieldText: FieldFC<{}> = (props, ref) => {
  const { fieldProps, autofocus, mode, ...restProps } = props;

  const refInput = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => refInput?.current, []);

  useEffect(() => {
    if (autofocus && refInput.current) {
      refInput.current.focus();
    }
  }, [autofocus]);

  if (mode === 'view') {
    const dom = restProps?.value;
    return <>{dom}</>;
  }

  const dom = <Input ref={refInput} {...fieldProps} {...restProps} />;

  return dom;
};

FieldText.displayName = 'FieldText';
export default forwardRef(FieldText);
