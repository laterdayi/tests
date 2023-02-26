<script setup lang="ts">
const slots = useSlots();
</script>

<template>
  <n-switch>
    <template v-for="slot in Object.keys(slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </n-switch>
</template>
