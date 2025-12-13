import type { InputRef } from '@/components/common/field/ref.type';
import { InputProps } from '@/components/ui/input';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import FormField, { GFormFieldProps } from '../../Field';

export type FormTextProps = GFormFieldProps<InputProps, InputRef>;
const FormText: ForwardRefRenderFunction<InputRef, FormTextProps> = (
  props,
  ref
) => {
  return <FormField {...props} ref={ref} valueType='text' />;
};

FormText.displayName = 'FormText';

export default forwardRef(FormText);
