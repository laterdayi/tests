import { BAR_OPTION } from './options/bar';
import { LINE_OPTION } from './options/line';
import { PIE_OPTION } from './options/pie';
import echarts, { ECOption } from '@/plugins/core/echarts';
import { GAUGE_OPTION } from './options/gauge';
export type EChartRefType = 'bar' | 'line' | 'pie' | 'gauge';
const imgUrl = new URL('../../../assets/svg/empty-data.svg', import.meta.url).href;

export const useChart = ({ type, initOptions }: { type?: EChartRefType; initOptions?: ECOption } = {}) => {
  // 实例
  let instance: echarts.ECharts | null = null;

  // 获取实例
  const getInstance = () => instance;

  // 预设配置
  const presetOptions: { [key in EChartRefType]: ECOption } = {
    bar: BAR_OPTION,
    line: LINE_OPTION,
    pie: PIE_OPTION,
    gauge: GAUGE_OPTION
  };

  // 配置
  const option = type ? { ...presetOptions[type], ...initOptions } : initOptions;

  // 元素
  const elRef = ref<HTMLElement | null>(null);

  // 初始化图表
  const initChart = () => {
    if (!elRef.value) return;
    instance = echarts.init(elRef.value as HTMLElement, __, { locale: '' });
  };

  // 初始化
  tryOnMounted(() => initChart());

  // 空数据
  const setEmptyOption = () => {
    const option: ECOption = {
      graphic: {
        type: 'image',
        left: 'center',
        top: 'center',
        cursor: 'default',
        style: { image: imgUrl, width: 120, height: 120 }
      }
    };
    instance?.setOption(option, true);
  };

  // 设置图表
  const setOption = (options: ECOption, notMerge?: boolean, lazyUpdate?: boolean) =>
    instance?.setOption(options, notMerge, lazyUpdate);

  // 自适应图表
  const resize = () => instance?.resize();
  useEventListener('resize', resize);

  // 卸载
  const disposeInstance = () => {
    if (!instance) return;
    instance?.dispose();
    instance = null;
  };
  tryOnUnmounted(disposeInstance);

  return {
    resize,
    instance,
    getInstance,
    setEmptyOption,
    option,
    elRef,
    initChart,
    setOption
  };
};
