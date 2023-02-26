<script setup lang="ts">
interface PropsType {
  size?: 'small' | 'medium' | 'large';
}
const { size = 'medium' } = defineProps<PropsType>();

const appStore = useAppStore();
const { themePrimary } = storeToRefs(appStore);

const fontSize = { small: 14, medium: 18, large: 20 };
const imgSize = { small: 100, medium: 140, large: 180 };
</script>
<template>
  <div class="text-center">
    <SvgIcon name="empty-data" :class="[`text-${themePrimary}`, `h-${imgSize[size]}px`]" />
    <p :class="[`text-${fontSize[size]}px`, 'm-0 text-gray']">{{ $t('noData') }}</p>
  </div>
</template>
