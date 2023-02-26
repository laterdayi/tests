<script setup lang="ts">
import type { TreeSelectProps } from 'naive-ui';

interface PropsType {
  componentProps?: TreeSelectProps & { label: string };
}
const slots = useSlots();
const { componentProps } = defineProps<PropsType>();
</script>

<template>
  <n-tree-select
    class="min-component-width"
    clearable
    filterable
    max-tag-count="responsive"
    :placeholder="`${$t('baseForm.pleaseSelect')}${componentProps?.label ?? ''}`"
  >
    <template v-for="slot in Object.keys(slots)" #[slot]> <slot :name="slot" /> </template>
  </n-tree-select>
</template>
