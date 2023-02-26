import { setupDirective } from '@/directive';
import type { App } from 'vue';
import type { Router } from 'vue-router';
import { setupGuard } from './guard';
import { setupI18n } from './locales';
import { setupStore } from './pinia';
import setupSvgPlugin from './svg';

import './unocss';

import './semi-theme-vars';

export const setupPlugins = (app: App<Element>, router: Router) => {
  try {
    // 注册i18n
    setupI18n(app);
    // 注册Svg
    setupSvgPlugin();
    // 路由守卫
    setupGuard(router);
    // 注册pinia
    setupStore(app);
    // 注册自定义指令
    setupDirective(app);
  } catch (error) {
    console.log(error);
  }
};
