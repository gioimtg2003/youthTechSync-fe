import Field from '@/components/common/field';
import useDeepCompareMemo from '@/hooks/useDeepCompareMemo';
import { isDeepEqualReact } from '@/utils';
import { memo } from 'react';
import { BaseFieldFCProps } from '../../field/type';
import FormItem from '../FormItem';
import type { FormConfigProps, GFormFieldItemProps } from '../type';

export type GFormFieldProps<
  FiledProps = Record<string, any>,
  K = any,
> = GFormFieldItemProps<FiledProps, K> & {
  //TODO: Improve ts
  ref?: React.Ref<any>;
} & Pick<BaseFieldFCProps, 'adapter' | 'autoFocus' | 'mode'> &
  FormConfigProps;

const BaseFormField: React.FC<GFormFieldProps> = (props) => {
  const {
    fieldProps,
    valueType,
    adapter = 'shadcn',
    autoFocus,
    ref,
    ...restProps
  } = props;

  const commonFieldProps = useDeepCompareMemo(() => {
    return {
      fieldProps,
      autoFocus,
      ref,
      adapter,
    };
  }, [fieldProps, autoFocus, adapter, ref]);

  return (
    <FormItem {...restProps}>
      {({ field, fieldState, formState }) => {
        return (
          <Field
            valueType={valueType}
            {...field}
            id={field.name}
            {...fieldState}
            {...formState}
            {...commonFieldProps}
          />
        );
      }}
    </FormItem>
  );
};
BaseFormField.displayName = 'BaseFormField';

const FormField = memo(BaseFormField, isDeepEqualReact);

export default FormField;
