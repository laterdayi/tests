import type { ECOption } from '@/plugins/core/echarts';

export const PIE_OPTION: ECOption = {
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      radius: '50%',
      type: 'pie',
      data: []
    }
  ]
};
