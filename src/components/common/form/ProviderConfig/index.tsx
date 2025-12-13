import { defaultPrefixCls } from '@/constants';
import { createContext } from 'react';
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

export const ProviderConfigContext = createContext<
  Pick<FormConfigProps, 'colon' | 'size' | 'layout'> & ConfigConsumerProps
>({
  getPrefixCls: defaultGetPrefixCls,
});
