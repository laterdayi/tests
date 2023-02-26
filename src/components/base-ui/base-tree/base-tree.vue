<script lang="ts">
export default { inheritAttrs: false };
</script>
<script setup lang="ts">
import BaseIcon from '@c/base-icon.vue';

interface PropsType {
  // 加载
  loading?: boolean;
  // 是否显示过滤
  showFilter?: boolean;
  // 宽度
  width?: string;
}

const { loading, showFilter = true, width = `${TREE_WIDTH}px` } = defineProps<PropsType>();

// 展开开关图标
const renderSwitcherIcon = () => h(BaseIcon, { icon: 'i-carbon:chevron-right', size: 14 });

// 搜索文字
const searchText = ref('');
</script>

<template>
  <div :class="[`w-${width}`]">
    <base-input v-if="showFilter" v-model:value="searchText" class="w-full! mb" :placeholder="$t('baseTree.filter')" />
    <base-spin :show="loading">
      <n-scrollbar :style="{ maxHeight: `${TREE_HEIGHT}px` }">
        <n-tree
          block-line
          cascade
          key-field="id"
          checkable
          :show-irrelevant-nodes="false"
          expand-on-click
          default-expand-all
          :pattern="showFilter ? searchText : __"
          :render-switcher-icon="renderSwitcherIcon"
          v-bind="$attrs"
        />
      </n-scrollbar>
    </base-spin>
  </div>
</template>
