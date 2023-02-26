<script setup lang="ts">
import App from './App.vue';
import { THEME_DEFAULT, LOCAL_DEFAULT } from '@/constants/app';
import { GlobalThemeOverrides, darkTheme, zhCN, lightTheme, dateZhCN } from 'naive-ui';
import type { ThemeCommonVarsType } from 'semi-theme-vars';
const appStore = useAppStore();
const { themePrimary, local, theme } = storeToRefs(appStore);

const useCommon = (theme: ThemeCommonVarsType): GlobalThemeOverrides => {
  const { common, ...componentTheme } = theme;
  return {
    common: {
      ...common,
      primaryColor: themePrimary.value,
      primaryColorHover: themePrimary.value + 'D9',
      primaryColorPressed: themePrimary.value
    },
    ...componentTheme
  };
};

const lightThemeOverrides = reactiveComputed<GlobalThemeOverrides>(() => useCommon(light));

const darkThemeOverrides = reactiveComputed<GlobalThemeOverrides>(() => useCommon(dark));
</script>

<template>
  <n-config-provider
    inline-theme-disabled
    :locale="local === LOCAL_DEFAULT ? zhCN : null"
    :date-locale="local === LOCAL_DEFAULT ? dateZhCN : null"
    :theme="theme == THEME_DEFAULT ? lightTheme : darkTheme"
    :theme-overrides="theme == THEME_DEFAULT ? lightThemeOverrides : darkThemeOverrides"
  >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <App />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
