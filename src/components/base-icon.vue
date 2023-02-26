<script setup lang="ts">
const appStore = useAppStore();
const { themePrimary } = storeToRefs(appStore);

interface PropsType {
  // 图标名
  icon: string;
  // 是否根据系统颜色
  useThemeColor?: boolean;
  // 图标大小
  size?: number;
  // 旋转
  rotate?: '0' | '90' | '180' | '270';
  // 颜色
  color?: string;
}

const { size = 20, useThemeColor = false, rotate = '0', icon, color } = defineProps<PropsType>();
</script>

<template>
  <div
    :style="{ fontSize: `${size}px`, color: useThemeColor ? themePrimary : color }"
    :class="[icon, `rotate-${rotate}`]"
  />
</template>
