import { transformerVariantGroup, defineConfig } from 'unocss';
import { systemThemeVars } from 'semi-theme-vars';

export default defineConfig({
  // 预检
  preflights: [
    {
      getCSS: () => `* { outline: none; }`
    }
  ],
  // 主题
  theme: {
    spacing: {
      DEFAULT: systemThemeVars.margin
    },
    colors: {
      primaryColor: 'var(--primary-color)',
      infoColor: 'var(--info-color)',
      errorColor: 'var(--error-color)',
      warningColor: 'var(--warning-color)',
      successColor: 'var(--success-color)',
      placeholderColor: 'var(--placeholder-color)',
      placeholderColorDark: 'var(--placeholder-color-dark)'
    }
  },
  //  组合指令
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'min-component-width': '!w-240px',
    'card-title': 'text-18px text-#1F2225 mb'
  },
  // 变体组功能
  transformers: [transformerVariantGroup()]
});
