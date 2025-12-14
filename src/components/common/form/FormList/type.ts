import { FormConfigProps } from '../type';

export type IconConfig = {
  /**
   * Icon: ()=> <div/>
   */
  Icon?: React.FC<any>;
  /**
   * tooltip text
   */
  tooltip?: string;
};

export type FormListFieldData = {
  name: number;
  key: number;
};

export type FormListOperation = {
  add: (defaultValue?: any, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
};

export type FormListCommonProps = {
  /**
   * icon config for copy action
   */
  copyIcon?: IconConfig | false;

  /**
   * icon config for delete action
   */
  deleteIcon?: IconConfig | false;

  /**
   * icon config for add action
   */
  addIcon?: IconConfig | false;

  /**
   * Function that generates default values for new items
   */
  creatorRecord?: Record<string, any> | (() => Record<string, any>);

  containerClassName?: HTMLElement['className'];

  containerStyle?: HTMLElement['style'];
};

export type FormListProps = FormListCommonProps &
  FormConfigProps & {
    initialValue?: Record<string, any>[];
    children: (
      fields: FormListFieldData[],
      operation: FormListOperation,
      meta: { errors: React.ReactNode[]; warnings: React.ReactNode[] }
    ) => React.ReactNode;

    onAfterAdd?: (
      ...params: [...Parameters<FormListOperation['add']>, number]
    ) => void;

    onAfterRemove?: (
      ...params: [...Parameters<FormListOperation['remove']>, number]
    ) => void;

    emptyList?: React.ReactNode;
  };
