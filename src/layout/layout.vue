<script setup lang="ts">
import LayoutMenu from './aside/layout-menu.vue';
import LayoutHeader from './aside/layout-header.vue';
import { BASE_LAYOUT, THEME_DEFAULT } from '@/constants/app';
import LayoutTagsView from './aside/layout-tags-view.vue';
import { LayoutKey } from './type';
provide(LayoutKey, BASE_LAYOUT);
const appStore = useAppStore();
const routeStore = useRouteStore();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { workbenchList } = storeToRefs(routeStore);
const { theme } = storeToRefs(appStore);
const route = useRoute();
const router = useRouter();

// layout 头部高度
const layoutHeaderHeight = LAYOUT_HEADER_HEIGHT + 'px';

// layout 高度
const layoutHeight = LAYOUT_HEADER_HEIGHT + LAYOUT_TAGS_VIEW_HEIGHT + 'px';

// 缓存路由缓存
const keepAliveRoutes = computed(() => {
  return router
    .getRoutes()
    .filter(route => route.meta?.noCache === false)
    .map(route => kebabCase((route.name as string)?.split('-').at(-1) as string)) as string[];
});

// sider collapsed
const collapsed = ref(false);

const layoutLogoPaddingLeft = computed(() => (collapsed.value ? 0 : `${LAYOUT_PADDING}px`));
</script>

<template>
  <n-layout id="base-layout" has-sider>
    <n-layout-sider
      v-model:collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="systemThemeVars.menuCollapsedWidth"
      :width="systemThemeVars.menuWidth"
      :native-scrollbar="false"
      class="relative"
    >
      <!-- logo -->
      <div class="logo-area pt-5px pb-5px box-border relative" :class="[{ 'text-center': collapsed }]">
        <transition name="logo" mode="out-in">
          <img v-if="collapsed" key="minilogo" class="h-full" :src="`${BASE_API}/${userInfo?.user?.miniLogo ?? ''}`" />
          <img v-else key="logo" class="h-full" :src="`${BASE_API}/${userInfo?.user?.logo ?? ''}`" />
        </transition>
      </div>
      <layout-menu :collapsed="collapsed" />
      <div
        class="absolute bottom-0 flex items-center w-full justify-center cursor-pointer"
        :class="[`h-${systemThemeVars.layoutSiderTriggerHeight}px`]"
        @click="collapsed = !collapsed"
      >
        <base-icon icon="i-carbon:list" />
      </div>
    </n-layout-sider>
    <n-layout>
      <layout-header />
      <n-layout-content
        v-if="workbenchList.length"
        :class="theme === THEME_DEFAULT ? 'bg-placeholderColor!' : 'bg-placeholderColorDark!'"
      >
        <layout-tags-view />
      </n-layout-content>
      <n-layout-content
        :native-scrollbar="false"
        :content-style="{ padding: `${LAYOUT_PADDING}px` }"
        class="main-container"
        :class="theme === THEME_DEFAULT ? 'bg-placeholderColor!' : 'bg-placeholderColorDark!'"
      >
        <router-view
          :key="route.fullPath"
          v-slot="{ Component }"
          class="router-view"
          :class="{ 'blank-router-view': route.meta.layoutType === LayoutType.blank }"
        >
          <transition name="fade-slide" mode="out-in" appear>
            <keep-alive :include="keepAliveRoutes" :max="10">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="less" scoped>
#base-layout {
  .main-container {
    height: calc(100% - v-bind(layoutHeight));
  }
  .logo-area {
    transition: all var(--duration);
    height: v-bind(layoutHeaderHeight) !important;
    padding-left: v-bind(layoutLogoPaddingLeft);
  }
  .blank-router-view {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  .logo-enter-active,
  .logo-leave-active {
    transition: all var(--duration) cubic-bezier(0, 0, 0.2, 1);
  }
  .logo-enter-from {
    opacity: 0;
    transform: scale(0.9);
  }
  .logo-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
}
</style>
