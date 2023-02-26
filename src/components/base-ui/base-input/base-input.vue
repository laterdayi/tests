<script setup lang="ts">
import type { InputProps } from 'naive-ui';
interface PropsType {
  componentProps?: InputProps & { label: string };
  class?: string | string[];
  type?: 'text' | 'textarea' | 'password';
  value?: string;
  disabled?: boolean;
  // 是否过滤空格
  replaceSpace?: boolean;
  // 表单类型
  formType?: FormType;
}
const slots = useSlots();
const emit = defineEmits(['update:value']);
const {
  componentProps,
  class: attrClass,
  type = 'text',
  value,
  replaceSpace = true,
  formType
} = defineProps<PropsType>();

// 去除所有空格
const handleInput = (val: string) => {
  emit('update:value', type === 'textarea' || !replaceSpace || formType === 'query' ? val : val.replace(/\s*/g, ''));
};
</script>

<template>
  <n-input
    class="min-component-width"
    clearable
    :type="type"
    :disabled="disabled || componentProps?.disabled"
    :placeholder="
      disabled || componentProps?.disabled ? '' : `${$t('baseForm.pleaseInput')}${componentProps?.label ?? ''}`
    "
    :class="attrClass"
    :value="value"
    @input="handleInput"
  >
    <template v-for="slot in Object.keys(slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </n-input>
</template>
