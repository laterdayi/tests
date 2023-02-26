<script setup lang="ts">
import type { FunctionalComponent } from 'vue';
import type { RenderSlotType } from './base-ui/base-form/type';
interface PropsType {
  renderSlot?: RenderSlotType;
}
const { renderSlot } = defineProps<PropsType>();

const render: FunctionalComponent = () => renderSlot?.render();
</script>

<template>
  <render />
</template>
