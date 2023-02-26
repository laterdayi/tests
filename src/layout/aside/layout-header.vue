<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { Routes, routeGuardWhiteList } from '@/router/routes';
import BaseIcon from '@/components/base-icon.vue';
import LayoutSetting from './layout-setting/layout-setting.vue';
import { LayoutKey } from '../type';
import type { RouteType } from '@/types/route';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const routeStore = useRouteStore();
const { userInfo } = storeToRefs(userStore);
const { currentModule, workbenchList, modulesList } = storeToRefs(routeStore);
const { toggle: toggleScreen } = useFullscreen();
const layoutKey = inject(LayoutKey);
const dialog = useDialog();
const { changeSiteTitle } = useRoutes();

// 面包屑数据
const breadcrumbData = ref<string[]>([]);

// 显示设置抽屉
const drawerRef = ref<InstanceType<typeof LayoutSetting> | null>(null);
const renderIcon = (icon: string) => () => h(BaseIcon, { icon });

// layout 头部高度
const layoutHeaderHeight = LAYOUT_HEADER_HEIGHT + 'px';
// 头部 内容 内边距
const layoutPadding = LAYOUT_PADDING + 'px';

const options = [
  {
    label: i18nt('personal'),
    icon: renderIcon('i-carbon:identification'),
    key: 'profile'
  },
  {
    label: i18nt('logout'),
    key: 'logout',
    icon: renderIcon('i-carbon:logout')
  }
];

// 产品区域下拉
const handleProductSelect = (val: string, option: RouteType) => {
  option.meta?.link
    ? window.open(option.path)
    : router.push(`/${kebabCase(val)}${modulesList.value.includes(val) ? '/home' : ''}`);
};

// 用户资料区域下拉
const handleUserSelect = (val: string) => {
  switch (val) {
    case 'profile':
      router.push('/personal');
      break;
    case 'logout':
      dialog.error({
        title: i18nt('tips'),
        content: i18nt('tipsTitle'),
        positiveText: `${i18nt('determine')}`,
        negativeText: `${i18nt('cancel')}`,
        maskClosable: false,
        onPositiveClick: () => {
          userStore.logout();
        }
      });
      break;
    default:
      break;
  }
};

// 处理面包屑
const handlePathList = (pathList: string[] | undefined): string[] => {
  let result = [];
  // 匹配空数据和动态路由参数
  result = pathList?.at(0) == '' ? drop(pathList, 2) : drop(pathList);
  if (result?.at(-1)?.includes(':')) result = dropRight(result);
  return result?.map(item => camelCase(item)) ?? [];
};

watch(
  route,
  (newVal: RouteLocationNormalizedLoaded) => {
    const pathList = last(newVal.matched)?.path.split('/');
    if (pathList?.includes('redirect')) return;

    // 处理面包屑
    breadcrumbData.value = handlePathList(pathList);

    // tags
    if (![...routeGuardWhiteList, Routes.WORKBENCH].includes(newVal.path)) {
      const { path, name } = newVal;
      if (router.hasRoute(name ?? '')) {
        routeStore.addTagsView({ path, name });
      }
    }
    // 更改网站标题
    changeSiteTitle();
  },
  { immediate: true }
);
</script>

<template>
  <n-layout-header class="breadcrumb-area layout-header flex justify-between">
    <!-- 面包屑 -->
    <n-breadcrumb v-if="workbenchList.length" class="flex items-center">
      <transition-group v-if="layoutKey === BASE_LAYOUT" name="breadcrumb">
        <n-breadcrumb-item :key="currentModule" class="breadcrumb-item">
          <base-dropdown size="large" key-field="name" :options="workbenchList" @select="handleProductSelect">
            <div class="cursor-pointer">
              {{ $t(currentModule) }}
              <base-icon icon="i-carbon:chevron-down" class="breadcrumb-icon" />
            </div>
          </base-dropdown>
        </n-breadcrumb-item>
        <n-breadcrumb-item v-for="item in breadcrumbData" :key="item" :clickable="false">
          {{ $t(item) }}
        </n-breadcrumb-item>
      </transition-group>
    </n-breadcrumb>
    <div v-else />
    <!-- 操作区 -->
    <base-space
      align="center"
      justify="center"
      :wrap-item="false"
      :class="[`gap-x-${systemThemeVars.layoutHeaderActionGap}px!`]"
    >
      <!-- 全屏 -->
      <base-tooltip>
        <template #trigger>
          <base-icon icon="i-carbon:maximize" class="cursor-pointer" :size="16" @click="toggleScreen" />
        </template>
        {{ $t('fullScreen') }}
      </base-tooltip>
      <!-- 个人中心 -->
      <base-dropdown size="large" :options="options" @select="handleUserSelect">
        <div class="info-area cursor-pointer">
          <img
            v-if="userInfo?.user?.avatar"
            class="w-24px h-24px rounded-full mr-5px"
            :src="`${BASE_API}/${userInfo?.user?.avatar}`"
          />
          <base-icon v-else icon="i-carbon:user-avatar" class="mr-5px" />
          <span class="mr-5px">{{ userInfo?.user?.userName }}</span>
          <base-icon icon="i-carbon:chevron-down" class="breadcrumb-icon" />
        </div>
      </base-dropdown>
      <!-- 主题配置 -->
      <base-tooltip>
        <template #trigger>
          <base-icon icon="i-carbon:settings" class="cursor-pointer" @click="drawerRef?.open()" />
        </template>
        {{ $t('themeConfig') }}
      </base-tooltip>
    </base-space>
    <!-- 布局配置 -->
    <layout-setting ref="drawerRef" />
  </n-layout-header>
</template>

<style lang="less" scoped>
.layout-header {
  height: v-bind(layoutHeaderHeight);
  padding: 0 v-bind(layoutPadding);
  .info-area {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
/* 对移动中的元素应用的过渡 */
.breadcrumb-move,
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all var(--duration) ease;
}
.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.breadcrumb-leave-active {
  position: absolute;
}
</style>
