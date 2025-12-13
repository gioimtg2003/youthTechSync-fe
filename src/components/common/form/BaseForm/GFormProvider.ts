import { createContext } from 'react';
import type { Control } from 'react-hook-form';
import type { FormConfigProps } from '../type';

export const GFormProviderContext = createContext<{
  control: Control<any>;
  layout: FormConfigProps['layout'];
}>({
  control: {} as Control<any>,
  layout: 'horizontal',
});
