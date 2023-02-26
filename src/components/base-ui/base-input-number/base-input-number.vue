<script setup lang="ts">
import type { InputNumberProps } from 'naive-ui';

interface PropsType {
  disabled?: boolean;
  componentProps?: InputNumberProps & { label: string };
}
const { componentProps } = defineProps<PropsType>();
const slots = useSlots();
</script>

<template>
  <n-input-number
    class="min-component-width"
    clearable
    :disabled="disabled || componentProps?.disabled"
    :min="1"
    :placeholder="
      disabled || componentProps?.disabled ? '' : `${$t('baseForm.pleaseInput')}${componentProps?.label ?? ''}`
    "
  >
    <template v-for="slot in Object.keys(slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </n-input-number>
</template>
