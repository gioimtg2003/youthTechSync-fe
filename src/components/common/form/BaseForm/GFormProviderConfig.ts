import { defaultPrefixCls } from '@/constants';
import { createContext } from 'react';
import type { Control } from 'react-hook-form';
import type { FormConfigProps } from '../type';

export interface ConfigComponentProps {
  text: {};
  number: {};
  date: {};
  email: {};
  password: {};
  select: {};
  checkbox: {};
  radio: {};
  switch: {};
  slider: {};
  time: {};
  datetime: {};
}

export interface ConfigConsumerProps extends FormConfigProps {
  getPrefixCls?: (suffixCls?: string, customizePrefixCls?: string) => string;
}

const defaultGetPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string
) => {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
};

export const GFormProviderConfigContext = createContext<
  {
    control: Control<any>;
    layout: FormConfigProps['layout'];
  } & ConfigConsumerProps
>({
  control: {} as Control<any>,
  layout: 'horizontal',
  getPrefixCls: defaultGetPrefixCls,
});
