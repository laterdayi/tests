// 样式重置
import '@unocss/reset/normalize.css';
// 引入unocss
import 'uno.css';
import initUnocssRuntime from '@unocss/runtime';
import { icons } from '@/assets/icons';
import presetIcons from '@unocss/preset-icons/browser';
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';
import { TREE_WIDTH_CONTAINER } from '@/constants/app';

initUnocssRuntime({
  defaults: {
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        extraProperties: { display: 'inline-block', 'vertical-align': 'middle' },
        collections: {
          carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default)
        }
      })
    ],
    // 安全列表
    safelist: [
      ...icons,
      'h-full',
      'w-full',
      'w-min!',
      'ml-5px',
      'mr-5px',
      `w-${TREE_WIDTH_CONTAINER}px!`,
      'flex',
      'flex-center',
      'items-center',
      'text-center',
      'min-component-width'
    ]
  }
});
