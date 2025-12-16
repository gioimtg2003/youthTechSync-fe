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
} & Pick<BaseFieldFCProps, 'adapter' | 'autofocus' | 'mode'> &
  FormConfigProps;

const BaseFormField: React.FC<GFormFieldProps> = (props) => {
  const {
    fieldProps,
    valueType,
    adapter = 'shadcn',
    autofocus,
    ref,
    ...restProps
  } = props;

  const commonFieldProps = useDeepCompareMemo(() => {
    return {
      fieldProps,
      autofocus,
      ref,
      adapter,
    };
  }, [fieldProps, autofocus, adapter, ref]);

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
