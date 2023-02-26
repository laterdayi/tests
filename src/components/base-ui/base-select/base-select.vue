<script setup lang="ts">
import type { SelectProps } from 'naive-ui';

interface PropsType {
  disabled?: boolean;
  componentProps?: SelectProps & { label: string };
}
const slots = useSlots();
const { componentProps } = defineProps<PropsType>();
</script>

<template>
  <n-select
    class="min-component-width"
    clearable
    :disabled="disabled || componentProps?.disabled"
    :filterable="componentProps?.filterable ?? true"
    max-tag-count="responsive"
    :placeholder="
      disabled || componentProps?.disabled ? '' : `${$t('baseForm.pleaseSelect')}${componentProps?.label ?? ''}`
    "
  >
    <n-switch>
      <template v-for="slot in Object.keys(slots)" #[slot]>
        <slot :name="slot" />
      </template>
    </n-switch>
  </n-select>
</template>
