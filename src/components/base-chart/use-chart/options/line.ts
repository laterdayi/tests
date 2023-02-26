import type { ECOption } from '@/plugins/core/echarts';

export const markPointData: any = [
  { type: 'max', name: 'Max' },
  { type: 'min', name: 'Min' }
];

export const LINE_OPTION: ECOption = {
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: [],
    axisTick: { alignWithLabel: true },
    boundaryGap: false
  },
  yAxis: { type: 'value' },
  series: [
    {
      data: [],
      type: 'line',
      markPoint: {
        data: markPointData
      }
    }
  ]
};
