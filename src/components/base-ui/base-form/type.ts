import type {
  InputProps,
  FormInst,
  DatePickerProps,
  SwitchProps,
  InputNumberProps,
  UploadProps,
  TransferProps,
  RadioProps,
  TimePickerProps,
  CascaderProps,
  ColorPickerProps,
  SliderProps,
  FormItemProps
} from 'naive-ui';
import type { VNodeChild } from 'vue';
import type { FormSelectProps } from '../base-select/type';
import type { FormTreeSelectProps } from '../base-tree-select/type';

// v-model:***
type ModelValueType = 'formatted-value' | 'value';

declare global {
  // 表单类型
  type FormType = 'query' | 'edit';

  namespace BaseForm {
    namespace Schema {
      // 组件
      interface ComponentPropsType {
        input: InputProps & { replaceSpace?: boolean };
        'input-number': InputNumberProps;
        switch: SwitchProps;
        select: FormSelectProps;
        'date-picker': DatePickerProps;
        'tree-select': FormTreeSelectProps;
        upload: UploadProps;
        transfer: TransferProps;
        'time-picker': TimePickerProps;
        radio: RadioProps;
        cascader: CascaderProps;
        'color-picker': ColorPickerProps;
        slider: SliderProps;
      }

      interface FormItemSchemaType<T extends keyof ComponentPropsType> {
        // 组件类型
        type: T;
        model?: string;
        modelValue?: ModelValueType;
        // form-item类型
        formItemProps?: FormItemProps;
        // 组件属性
        componentProps?: ComponentPropsType[T] | ComputedRef<ComponentPropsType[T]>;
        // 组件插槽
        slots?: RenderSlotType[];
        // 作用于组件class
        class?: string | string[];
        // 作用于form-item class
        formItemClass?: string | string[];
      }

      type CustomFormItemSchema = {
        type: 'custom-form-item';
        model?: string;
        render: () => VNodeChild;
        // form-item类型
        formItemProps?: FormItemProps;
        // 作用于form-item class
        formItemClass?: string | string[];
      };

      type CustomNodeSchema = {
        type: 'custom-node';
        class?: string | string[];
        render: () => VNodeChild;
        // 作用于form-item class
        formItemClass?: string | string[];
      };

      type InputSchema = FormItemSchemaType<'input'>;
      type SelectSchema = FormItemSchemaType<'select'>;
      type DatePickerSchema = FormItemSchemaType<'date-picker'>;
      type SwitchSchema = FormItemSchemaType<'switch'>;
      type InputNumberSchema = FormItemSchemaType<'input-number'>;
      type TreeSelectSchema = FormItemSchemaType<'tree-select'>;
      type UploadSchema = FormItemSchemaType<'upload'>;
      type TransferSchema = FormItemSchemaType<'transfer'>;
      type TimePickerSchema = FormItemSchemaType<'time-picker'>;
      type RadioSchema = FormItemSchemaType<'radio'>;
      type CascaderSchema = FormItemSchemaType<'cascader'>;
      type ColorPickerSchema = FormItemSchemaType<'color-picker'>;
      type SliderSchema = FormItemSchemaType<'slider'>;

      type Item =
        | CustomNodeSchema
        | CustomFormItemSchema
        | SliderSchema
        | ColorPickerSchema
        | CascaderSchema
        | RadioSchema
        | InputSchema
        | InputNumberSchema
        | SwitchSchema
        | SelectSchema
        | DatePickerSchema
        | TransferSchema
        | TreeSelectSchema
        | TimePickerSchema
        | UploadSchema;
    }
  }

  type FormSchemaType = (BaseForm.Schema.Item | undefined)[];
}

// schema > slot
export type RenderSlotType = {
  name?: string;
  render: () => VNodeChild;
};

export interface BaseFormRefType {
  baseFormRef: FormInst | null;
}

// 表单插槽接口
export interface FormScopeType {
  formRef: FormInst | null;
}
