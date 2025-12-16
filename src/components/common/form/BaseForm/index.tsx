import { defaultPrefixCls } from '@/constants';
import { cn } from '@/lib/utils';
import { forwardRef, useImperativeHandle, useMemo } from 'react';
import {
  FieldPath,
  FormProvider,
  useForm,
  UseFormReturn,
  type DefaultValues,
  type FieldValues,
  type Mode,
  type Resolver,
} from 'react-hook-form';
import type { FormConfigProps } from '../type';
import { GFormProviderConfigContext } from './GFormProviderConfig';

export interface BaseFormProps<Schema extends FieldValues> {
  resolver: Resolver<Schema>;
  defaultValues?: DefaultValues<Schema>;
  onSubmit?: (data: Schema) => void;
  modeValidate?: Mode;
  layout?: FormConfigProps['layout'];

  children?:
    | ((props: {
        methods: UseFormReturn<Schema, any, Schema>;
      }) => React.ReactNode)
    | React.ReactNode;
}

export type BaseGFormRef<T extends FieldValues> = {
  reset: () => void;

  getValues: () => T;

  getValue: (field: FieldPath<T>) => T[keyof T];
};

function Form<Schema extends FieldValues = {}>(
  props: BaseFormProps<Schema>,
  ref: React.Ref<BaseGFormRef<Schema>>
) {
  const {
    resolver,
    defaultValues,
    onSubmit,
    modeValidate = 'onSubmit',
    children,
    layout = 'horizontal',
  } = props;
  const methods = useForm<Schema>({
    resolver,
    defaultValues,
    mode: modeValidate,
  });

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        methods.reset();
      },
      getValues: () => methods.getValues(),

      getValue: (field) => methods.getValues(field),
    }),
    []
  );

  const classNames = useMemo(
    () =>
      cn(defaultPrefixCls, {
        'form-horizontal': layout === 'horizontal',
        'form-vertical': layout === 'vertical',
      }),
    [layout]
  );

  return (
    <GFormProviderConfigContext.Provider value={{ layout }}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods?.handleSubmit(onSubmit ?? (() => {}))}
          className={classNames}
        >
          {typeof children === 'function' ? children({ methods }) : children}
        </form>
      </FormProvider>
    </GFormProviderConfigContext.Provider>
  );
}

export default forwardRef(Form) as <Schema extends FieldValues = {}>(
  props: BaseFormProps<Schema> & {
    ref?: React.Ref<BaseGFormRef<Schema>>;
  }
) => React.ReactElement;
