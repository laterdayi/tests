<script setup lang="ts">
const appStore = useAppStore();
const { buttonSize } = storeToRefs(appStore);
const slots = useSlots();

interface PropsType {
  // 按钮名称
  buttonName: string;
  // 是否上报统计
  shouldRecord?: boolean;
  // 按钮动画
  loading?: boolean;
  // 是否禁用
  disabled?: boolean;
}

const { buttonName, shouldRecord = true, loading = false, disabled = false } = defineProps<PropsType>();

const handleButtonRecord = () => {
  shouldRecord && useButtonClickRecord(buttonName ?? '未知');
};
</script>
<template>
  <n-button :disabled="disabled" :loading="loading" :size="buttonSize" @click="handleButtonRecord()">
    <template v-for="slot in Object.keys(slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </n-button>
</template>
