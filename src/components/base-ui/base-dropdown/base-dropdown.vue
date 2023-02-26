<script setup lang="ts">
const slots = useSlots();
</script>

<template>
  <n-dropdown trigger="hover" :show-arrow="true">
    <template v-for="slot in Object.keys(slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </n-dropdown>
</template>

<style scoped></style>
