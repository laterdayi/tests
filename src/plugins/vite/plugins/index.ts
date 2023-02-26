import path from 'path';
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import autoImportApi from './unplugin-auto-import';
import autoImportComponents from './unplugin-vue-components';

export const createVitePlugins = (): Plugin[] => {
  const plugins: Plugin[] = [
    vue({ reactivityTransform: true }),
    // plugin-vue-jsx
    vueJsx(),
    // unocss
    Unocss({}),
    // unplugin-auto-import
    autoImportComponents,
    // unplugin-auto-import
    autoImportApi,
    // unplugin-vue-i18n
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(process.cwd(), 'locales/**')]
    }),
    // vite-plugin-svg-icons
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ];

  return plugins;
};
