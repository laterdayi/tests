import { XAXIS_LENGTH } from '@/constants/app';

// 默认调色盘颜色列表
export const CHART_COLOR_LIST = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc'
];

/**
 * @description: Echart Tooltip marker
 * @param {string} color
 * @return {*}
 */
export const useChartMarker = (color = '#5470c6') =>
  `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`;

/**
 * @description: 随机生成十六进制颜色
 * @return {string} #******
 */
export const useChartRandomHexColor = () => {
  let hex = Math.floor(Math.random() * 16777216).toString(16);
  while (hex.length < 6) {
    hex = '0' + hex;
  }
  return '#' + hex;
};

/**
 * @description: 计算 data-zoom end 范围
 * @param {number} xAxisDataLength
 * @return {*}
 */
export const useChartDataZoomOption = (xAxisDataLength: number) => {
  const end = Math.floor((XAXIS_LENGTH / xAxisDataLength) * 100) - 2;
  return [
    { type: 'inside', start: 0, end },
    { type: 'slider', start: 0, end }
  ];
};

/**
 * @description: Tooltip value
 * @param {string} content
 * @return {*}
 */
export const useChartTooltipValue = (content: string) => {
  return `<span style="margin-left:20px;">${content}</span>`;
};
