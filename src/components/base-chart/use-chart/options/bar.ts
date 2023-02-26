import type { ECOption } from '@/plugins/core/echarts';

export const BAR_OPTION: ECOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: [],
    axisTick: { alignWithLabel: true }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar',
      label: { show: true, position: 'top' },
      barWidth: BAR_WIDTH_VERTICAL
    }
  ]
};
