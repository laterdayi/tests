import type { ECOption } from '@/plugins/core/echarts';

export const GAUGE_OPTION: ECOption = {
  tooltip: { show: true },
  series: [
    {
      data: [],
      type: 'gauge',
      splitLine: { lineStyle: { width: 1, color: '#999' }, distance: 5 },
      axisLabel: { color: '#999', fontSize: 12 },
      anchor: { show: true, showAbove: true },
      progress: { show: true, roundCap: true },
      axisTick: { show: false },
      radius: '100%',
      center: ['50%', '55%'],
      detail: { valueAnimation: true, formatter: '{value}', fontSize: 16 }
    }
  ]
};
