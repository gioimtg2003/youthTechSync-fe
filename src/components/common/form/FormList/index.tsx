import { useContext, useRef } from 'react';
import { GFormProviderConfigContext } from '../BaseForm/GFormProviderConfig';
import { FormListOperation, FormListProps } from './type';

function FormList(props: FormListProps) {
  const { name, label } = props ?? {};

  const actionRefs = useRef<FormListOperation>(undefined);
  const { getPrefixCls } = useContext(GFormProviderConfigContext);

  const prefixCls = getPrefixCls?.('form-list');
  
  return <></>;
}

export { FormList };
