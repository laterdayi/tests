import type { SelectProps } from 'naive-ui';
import type { Ref } from 'vue';

export type FormSelectProps = Omit<SelectProps, 'loading' | 'options'> & {
  options?: any;
  loading?: Ref<boolean> | boolean;
};

declare global {
  interface OptionsType {
    id: string;
    name: string;
  }
}
