<script setup lang="ts">
const slots = useSlots();
</script>

<template>
  <n-popover trigger="hover">
    <template v-for="slot in Object.keys(slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </n-popover>
</template>
