import type { ECOption } from '@/plugins/core/echarts';
import type { ECharts } from 'echarts/core';

declare global {
  // chart 图表类型
  interface ChartRefType {
    elRef?: HTMLElement;
    setOption: (
      options: ECOption,
      notMerge?: boolean | undefined,
      lazyUpdate?: boolean | undefined
    ) => void | undefined;
    option?: ECOption;
    setEmptyOption: () => void;
    getInstance: () => ECharts | null;
    resize: () => void | undefined;
  }
}
