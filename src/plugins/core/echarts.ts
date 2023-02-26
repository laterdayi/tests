// 引入 echarts 核心模块
import * as echarts from 'echarts/core';

/*
 * 系列类型的定义后缀都为 SeriesOption
 * 引入柱状图图表
 */
import {
  BarChart,
  LineChart,
  BarSeriesOption,
  LineSeriesOption,
  PieChart,
  PieSeriesOption,
  GaugeChart,
  CustomChart,
  CustomSeriesOption,
  GaugeSeriesOption
} from 'echarts/charts';

// 组件类型的定义后缀都为 ComponentOption
import {
  ToolboxComponent,
  ToolboxComponentOption,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  TitleComponentOption,
  MarkPointComponent,
  MarkPointComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption,
  GraphicComponent,
  GraphicComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  DataZoomInsideComponent,
  DataZoomSliderComponent
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';

// 引入 Canvas 渲染器
import { CanvasRenderer } from 'echarts/renderers';

export type ECOption = echarts.ComposeOption<
  | CustomSeriesOption
  | GraphicComponentOption
  | MarkPointComponentOption
  | ToolboxComponentOption
  | GaugeSeriesOption
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DataZoomComponentOption
>;

// 注册必须的组件
echarts.use([
  GraphicComponent,
  CustomChart,
  MarkPointComponent,
  ToolboxComponent,
  GaugeChart,
  PieChart,
  LegendComponent,
  BarChart,
  GridComponent,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent
]);

export default echarts;
