<script setup lang="ts">
interface PropsType {
  title?: string;
  width?: number | string;
}
const { title, width } = defineProps<PropsType>();
const slots = useSlots();
</script>
<template>
  <n-drawer :width="width ? width : 500" :auto-focus="false">
    <n-drawer-content :title="title">
      <slot />
      <template v-if="slots.footer" #footer>
        <slot name="footer" />
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
