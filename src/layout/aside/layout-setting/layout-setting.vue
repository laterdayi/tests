<script setup lang="ts">
import type { ButtonSizeType, LocalType, ThemeType } from 'semi-theme-vars';
import { pageSizeOption, buttonSizeOption, themePrimaryOption } from './constants';
const appStore = useAppStore();
const { theme, local, themePrimary, buttonSize, pageSize } = storeToRefs(appStore);

// 显示设置
const isShowSetting = ref(false);
// 打开侧边栏
const open = () => (isShowSetting.value = true);

// 语言设置
const { availableLocales, locale } = useI18n();

// 更改语言
const toggleLocales = () => {
  const locales = availableLocales;
  const value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
  $dialog.warning({
    content: i18nt('toggleLanguageTips', { val: value }),
    onPositiveClick: () => {
      try {
        appStore.setLocal(value as LocalType);
        location.reload();
      } catch (error) {
        console.log('切换语言异常：', error);
      }
    }
  });
};

const toggleButtonSize = (value: ButtonSizeType) => appStore.toggleButtonSize(value);
const togglePageSize = (value: number) => appStore.togglePageSize(value);
const toggleTheme = (value: ThemeType) => appStore.toggleTheme(value);

// 重置
const handleReset = () => {
  appStore.$reset();
  if (locale.value !== LOCAL_DEFAULT) locale.value = LOCAL_DEFAULT;
};

defineExpose({
  open
});
</script>

<template>
  <!-- 配置 -->
  <base-drawer v-model:show="isShowSetting" :width="280" :title="$t('themeConfig')">
    <base-scrollbar>
      <div class="flex flex-col">
        <!-- 模式切换 -->
        <n-divider> {{ $t('modeSwitch') }}</n-divider>
        <base-switch :value="theme" checked-value="dark" unchecked-value="light" @update:value="toggleTheme">
          <template #checked> <base-icon icon="i-carbon:sun" /> </template>
          <template #unchecked> <base-icon icon="i-carbon:asleep" /> </template>
        </base-switch>
        <!-- 语言设置 -->
        <n-divider dashed> {{ $t('languageSetting') }}</n-divider>
        <base-switch :value="local" checked-value="en" unchecked-value="zh-CN" @update:value="toggleLocales">
          <template #checked> <base-icon icon="i-carbon:language" /> </template>
          <template #unchecked><base-icon icon="i-carbon:database-enterprise-db2" /> </template>
        </base-switch>
        <!-- 系统主题 -->
        <n-divider dashed> {{ $t('systemTheme') }}</n-divider>
        <div class="grid grid-rows-2 grid-flow-col">
          <div
            v-for="item in themePrimaryOption"
            :key="item"
            class="w-20px h-20px mr-5px mb-5px cursor-pointer"
            :style="{ backgroundColor: item }"
            @click="appStore.toggleThemePrimary(item)"
          >
            <base-icon
              v-if="item === themePrimary"
              class="relative bottom-2px"
              icon="i-carbon:checkmark"
              color="#FFFFFF"
            />
          </div>
        </div>
        <!-- 按钮设置 -->
        <n-divider dashed> {{ $t('buttonSetting') }} </n-divider>
        <base-select :value="buttonSize" :options="buttonSizeOption" :on-update:value="toggleButtonSize" />
        <!-- 表格设置 -->
        <n-divider dashed> {{ $t('tableSetting') }}</n-divider>
        <base-select :value="pageSize" :options="pageSizeOption" :on-update:value="togglePageSize" />
      </div>
    </base-scrollbar>
    <template #footer>
      <base-button button-name="reset" type="primary" ghost @click="handleReset">{{ $t('reset') }}</base-button>
    </template>
  </base-drawer>
</template>
