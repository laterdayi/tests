import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';

export default AutoImport({
  // 生成对应.d.ts文件的文件路径
  dts: path.resolve(process.cwd(), 'auto-imports.d.ts'),
  // 包含转换目标的规则
  include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
  // 预设名称或自定义
  imports: [
    'vue',
    'vue-router',
    'vue-i18n',
    'pinia',
    { '@/plugins/core/locales': ['i18nt', 'i18nte'] },
    { '@/service/': ['useAxiosGet', 'useAxiosPost'] },
    {
      '@vueuse/core': [
        'useNow',
        'useIntervalFn',
        'useDateFormat',
        'useAxios',
        'useFullscreen',
        'reactiveComputed',
        'useTitle',
        'tryOnMounted',
        'tryOnUnmounted',
        'useEventListener'
      ]
    },
    { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] },
    {
      'semi-theme-vars': ['light', 'dark', 'systemThemeVars']
    },
    {
      'lodash-es': [
        'omitBy',
        'every',
        'omit',
        'find',
        'map',
        'cloneDeep',
        'pull',
        'compact',
        'dropRight',
        'drop',
        'filter',
        'initial',
        'remove',
        'last',
        'findIndex',
        'upperFirst',
        'pullAt',
        'intersection',
        'difference',
        'xor',
        'head',
        'pick',
        'mapValues',
        'pullAll',
        'without',
        'pickBy',
        'isEmpty',
        'isNil',
        'isRegExp',
        'clone',
        'toLower',
        'toUpper',
        'camelCase',
        'kebabCase'
      ]
    }
  ],
  // 自动导入目录的路径
  dirs: [
    'src/constants',
    'src/utils',
    'src/hooks',
    'src/stores/*',
    'src/layout',
    'src/components/base-ui/base-form/',
    'src/components/base-ui/base-modal/',
    'src/components/base-ui/base-table/',
    'src/components/base-ui/base-tree/',
    'src/components/base-ui/base-upload/'
  ],
  //  Vue 模板中自动导入
  vueTemplate: true,
  // 生成对应的 .eslintrc-auto-import.json 文件
  eslintrc: {
    enabled: true,
    filepath: path.resolve(process.cwd(), '.eslintrc-auto-import.json')
  }
});
