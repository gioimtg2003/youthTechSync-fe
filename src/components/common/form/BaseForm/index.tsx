import { defaultPrefixCls } from '@/constants';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type Mode,
  type Resolver,
} from 'react-hook-form';
import type { FormConfigProps } from '../type';
import { GFormProviderConfigContext } from './GFormProviderConfig';

export interface BaseFormProps<Schema extends FieldValues> {
  resolver?: Resolver<Schema>;
  defaultValues?: DefaultValues<Schema>;
  onSubmit?: (data: Schema) => void;
  modeValidate?: Mode;
  layout?: FormConfigProps['layout'];
}

export default function Form<Schema extends FieldValues = {}>(
  props: React.PropsWithChildren<BaseFormProps<Schema>>
) {
  const {
    resolver,
    defaultValues,
    onSubmit,
    modeValidate = 'onBlur',
    children,
    layout = 'horizontal',
  } = props;
  const methods = useForm<Schema>({
    resolver,
    defaultValues,
    mode: modeValidate,
  });
  const { handleSubmit, control } = methods;

  const classNames = useMemo(
    () =>
      cn(defaultPrefixCls, {
        'form-horizontal': layout === 'horizontal',
        'form-vertical': layout === 'vertical',
      }),
    [layout]
  );
  return (
    <GFormProviderConfigContext.Provider value={{ control, layout }}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit ?? (() => {}))}
          className={classNames}
        >
          {children}
        </form>
      </FormProvider>
    </GFormProviderConfigContext.Provider>
  );
}
