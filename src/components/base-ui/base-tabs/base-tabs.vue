<script setup lang="ts">
const slots = useSlots();
</script>

<template>
  <n-tabs type="bar" animated>
    <template v-for="slot in Object.keys(slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </n-tabs>
</template>
