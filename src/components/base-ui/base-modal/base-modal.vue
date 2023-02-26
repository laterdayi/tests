<script setup lang="ts">
interface PropsType {
  // 模态框标题
  title?: string;
  // 显示icon
  showIcon?: boolean;
  // 预设
  preset?: 'dialog' | 'confirm' | 'card';
  // 隐藏操作按钮
  hideAction?: boolean;
}

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const slots = useSlots();
const { title, showIcon = false, preset = 'dialog', hideAction = false } = defineProps<PropsType>();
</script>

<template>
  <n-modal
    id="base-modal"
    :show-icon="showIcon"
    class="w-1/2!"
    :auto-focus="false"
    :title="title"
    :mask-closable="false"
    :preset="preset"
    :negative-button-props="{ size: 'medium' }"
    :positive-button-props="{ size: 'medium' }"
    :positive-text="hideAction ? __ : $t('confirm')"
    :negative-text="hideAction ? __ : $t('cancel')"
    @esc="emit('close')"
    @close="emit('close')"
  >
    <template v-for="slot in Object.keys(slots)" #[slot] :key="slot">
      <template v-if="slot === 'default'">
        <n-scrollbar style="max-height: 70vh">
          <slot name="default" />
        </n-scrollbar>
      </template>
      <slot v-else :name="slot" />
    </template>
  </n-modal>
</template>
<style lang="less"></style>
