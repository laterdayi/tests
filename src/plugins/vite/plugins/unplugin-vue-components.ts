import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

export default Components({
  // 要搜索组件的目录的valid file extensions for components.路径。
  dirs: ['src/components'],
  // 获得对自动导入组件的 TypeScript 支持
  include: [/\.vue$/, /\.vue\?vue/],
  // 生成对应.d.ts文件的文件路径
  dts: path.resolve(process.cwd(), 'components.d.ts'),
  // 有效扩展名
  extensions: ['vue'],
  // 自定义组件的解析器
  resolvers: [NaiveUiResolver()]
});
