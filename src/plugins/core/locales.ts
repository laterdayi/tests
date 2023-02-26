import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n';
import type { App } from 'vue';
import Localstorage from '@/utils/localstorage';
import { LOCAL_DEFAULT } from '@/constants/app';

export const LOCALE_OPTIONS = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en' }
];

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: LocaleMessages<VueMessageType> }>('../../../locales/*.y(a)?ml', { eager: true })
  ).map(([key, value]) => {
    const yaml = key.endsWith('.yaml');
    return [key.slice(17, yaml ? -5 : -4), value.default];
  })
);
export const i18n = createI18n<false>({
  // 默认语言
  locale: Localstorage.getStore('app')?.local || LOCAL_DEFAULT,
  messages,
  //  全局注册$t方法
  globalInjection: true,
  // 支持compositionAPI
  legacy: false
});

// Composition API 外使用
export const i18nt = i18n.global.t;

// 是否存在语言环境消息
export const i18nte = i18n.global.te;

export function setupI18n(app: App) {
  app.use(i18n);
}
