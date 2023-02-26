<script setup lang="ts">
const slots = useSlots();
</script>

<template>
  <n-tag>
    <template v-for="slot in Object.keys(slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </n-tag>
</template>
