<script setup lang="ts">
import { Routes } from '@/router/routes';
import { useRouteStore } from '@/stores/route';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import BaseIcon from '@c/base-icon.vue';
const route = useRoute();
const router = useRouter();
const routeStore = useRouteStore();
const appStore = useAppStore();
const { tagsViewList, isLastTag, isFirstTag } = storeToRefs(routeStore);
const { themePrimary } = storeToRefs(appStore);
type ActionType = 'closeCurrentTag' | 'closeOtherTags' | 'closeLeftTags' | 'closeRightTags';

// layout 高度
const layoutTagsViesHeight = LAYOUT_TAGS_VIEW_HEIGHT + 'px';
const layoutTagsViesItemHeight = LAYOUT_TAGS_VIEW_HEIGHT - 6 + 'px';
const layoutTagsViesItemActiveHeight = LAYOUT_TAGS_VIEW_HEIGHT - 6 - 2 + 'px';

// 切换标签
const handleClick = (item: Partial<RouteLocationNormalizedLoaded>) => {
  if (route.path !== item.path) {
    router.push(item?.path ?? Routes.WORKBENCH);
  }
};

const renderIcon = (icon: string) => () => h(BaseIcon, { icon, size: 16 });

// select 选项
const options = computed(() => [
  {
    label: i18nt('tags.closeCurrentTag'),
    key: 'closeCurrentTag',
    icon: renderIcon('i-carbon:close'),
    disabled: !tagsViewList.value.length
  },
  {
    label: i18nt('tags.closeOtherTags'),
    key: 'closeOtherTags',
    icon: renderIcon('i-carbon:close'),
    disabled: tagsViewList.value.length === 1 || !tagsViewList.value.length
  },
  { key: 'd2', type: 'divider' },
  {
    label: i18nt('tags.closeLeftTags'),
    key: 'closeLeftTags',
    icon: renderIcon('i-carbon:page-first'),
    disabled: isFirstTag.value || !tagsViewList.value.length
  },
  {
    label: i18nt('tags.closeRightTags'),
    key: 'closeRightTags',
    icon: renderIcon('i-carbon:page-last'),
    disabled: isLastTag.value || !tagsViewList.value.length
  }
]);

// 选择操作
const handleSelect = (key: ActionType) => {
  const actions: { [key in ActionType]: () => void } = {
    // 关闭当前标签
    closeCurrentTag() {
      const index = findIndex(tagsViewList.value, item => item.path === route.path);
      routeStore.deleteTagsView(route, index, true);
    },
    // 关闭其余标签
    closeOtherTags() {
      routeStore.updateTagsView(
        filter(
          tagsViewList.value,
          (item: RouteLocationNormalizedLoaded) => item.path === route.path
        ) as RouteLocationNormalizedLoaded[]
      );
    },
    // 关闭左侧标签
    closeLeftTags() {
      const index = findIndex(tagsViewList.value, item => item.path === route.path);
      routeStore.updateTagsView(drop(tagsViewList.value, index));
    },
    // 关闭右侧标签
    closeRightTags() {
      const index = findIndex(tagsViewList.value, item => item.path === route.path);
      routeStore.updateTagsView(dropRight(tagsViewList.value, tagsViewList.value.length - (index + 1)));
    }
  };
  actions[key]();
};

// 鼠标事件
const onMouseUp = (
  e: MouseEvent,
  item: Partial<RouteLocationNormalizedLoaded>,
  index: number,
  isCurrentTag: boolean
) => {
  if (e.button === 1) {
    routeStore.deleteTagsView(item, index, isCurrentTag);
  }
};
</script>

<template>
  <div class="tags-view-area">
    <n-scrollbar x-scrollable class="scrollbar-area">
      <div class="whitespace-nowrap flex" un-cloak>
        <div
          v-for="(item, index) in tagsViewList"
          :key="item.path"
          class="tags-view-item"
          :class="{ 'tags-view-item-active': item.path === route.path }"
          @click="handleClick(item)"
          @mouseup="onMouseUp($event, item, index, item.path === route.path)"
        >
          <span> {{ $t(last((item.name as string).split('-')) as string) }}</span>
          <base-icon
            class="tags-view-item-icon"
            icon="i-carbon:close"
            @click.stop="routeStore.deleteTagsView(item, index, item.path === route.path)"
          />
        </div>
      </div>
    </n-scrollbar>
    <base-tooltip>
      <template #trigger>
        <base-icon
          icon="i-carbon:rotate-360"
          class="w-36px cursor-pointer"
          @click="router.replace({ path: `/redirect${route.path}` })"
        />
      </template>
      {{ $t('refresh') }}
    </base-tooltip>
    <base-dropdown :options="options" @select="handleSelect">
      <base-icon icon="i-carbon:menu" class="w-36px cursor-pointer" />
    </base-dropdown>
  </div>
</template>

<style lang="less" scoped>
.tags-view-area {
  padding: 0 var(--padding);
  display: flex;
  justify-content: center;
  align-items: center;
  .tags-view-item {
    padding: 0 4px 6px 4px;
    margin-right: 10px;
    height: v-bind(layoutTagsViesItemHeight);
    cursor: pointer;
    &-icon {
      margin-left: 6px;
      position: relative;
      bottom: 1px;
    }
  }
  .tags-view-item-active {
    height: v-bind(layoutTagsViesItemActiveHeight);
    color: v-bind(themePrimary);
    border-bottom: 2px solid v-bind(themePrimary);
  }
  :deep(.scrollbar-area) {
    height: v-bind(layoutTagsViesHeight);
    line-height: v-bind(layoutTagsViesHeight);
  }
}
</style>
