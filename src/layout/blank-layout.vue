<script setup lang="ts">
import LayoutHeader from './aside/layout-header.vue';
import { BLANK_LAYOUT } from '@/constants/app';
import { LayoutKey } from './type';
provide(LayoutKey, BLANK_LAYOUT);
const layoutHeaderHeight = LAYOUT_HEADER_HEIGHT + 'px';
</script>

<template>
  <n-layout un-cloak position="absolute">
    <layout-header />
    <n-layout-content :native-scrollbar="false" content-style="padding: 16px;" class="main-container background">
      <router-view v-slot="{ Component }" class="router-view">
        <transition name="fade-slide" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang="less">
.main-container {
  height: calc(100% - v-bind(layoutHeaderHeight));
}
</style>
