<script setup lang="ts">
import type { CascaderProps } from 'naive-ui';

interface PropsType {
  componentProps?: CascaderProps & { label: string };
}
const { componentProps } = defineProps<PropsType>();
</script>

<template>
  <n-cascader :placeholder="`${$t('baseForm.pleaseSelect')}${componentProps?.label ?? ''}`" />
</template>
