import Field from '@/components/common/field';
import useDeepCompareMemo from '@/hooks/useDeepCompareMemo';
import { isDeepEqualReact } from '@/utils';
import { memo } from 'react';
import FormItem from '../FormItem';
import type {
  FormConfigProps,
  FormModeType,
  GFormFieldItemProps,
} from '../type';

export type GFormFieldProps<
  FiledProps = Record<string, any>,
  K = any,
> = GFormFieldItemProps<FiledProps, K> & {
  //TODO: Improve ts
  ref?: React.Ref<any>;

  autoFocus?: boolean;
  mode?: FormModeType;
} & FormConfigProps;

const BaseFormField: React.FC<GFormFieldProps> = (props) => {
  const { fieldProps, valueType, autoFocus, ref, ...restProps } = props;

  const commonFieldProps = useDeepCompareMemo(() => {
    return {
      fieldProps,
      autoFocus,
      ref,
    };
  }, [fieldProps, autoFocus, ref]);

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
