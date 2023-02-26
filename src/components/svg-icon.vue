<script setup lang="ts">
interface PropsType {
  name: string;
  prefix?: string;
  color?: string;
}
const { prefix = 'icon', name, color = '#333' } = defineProps<PropsType>();
const symbolId = computed(() => `#${prefix}-${name}`);
</script>

<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
