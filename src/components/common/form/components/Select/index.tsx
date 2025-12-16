import { SelectProps } from 'antd';
import FormField, { GFormFieldProps } from '../../Field';
import { forwardRef, ForwardRefRenderFunction } from 'react';

export type FormSelectProps = GFormFieldProps<SelectProps, {}>;

const FormSelect: ForwardRefRenderFunction<{}, FormSelectProps> = (
  { fieldProps, valueType = 'select', ...restProps },
  ref
) => {
  return (
    <FormField
      fieldProps={fieldProps}
      valueType={valueType}
      ref={ref}
      {...restProps}
    />
  );
};

FormSelect.displayName = 'FormSelect';

export default forwardRef(FormSelect);
