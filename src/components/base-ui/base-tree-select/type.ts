import type { TreeSelectProps } from 'naive-ui';

export type FormTreeSelectProps = Omit<TreeSelectProps, 'options'> & {
  options?: any;
};
