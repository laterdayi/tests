# base-chart

## base-chart Props

| Name          | Type                            | Default     | Description            |
| ------------- | ------------------------------- | ----------- | ---------------------- |
| type          | `EChartRefType`                 | `undefined` | 图表类型               |
| initOptions   | `ECOption`                      | `undefined` | 初始化配置             |
| loading       | `boolean`                       | `false`     | 加载状态               |
| title         | `string`                        | `---`       | 标题：<翻译前的字段值> |
| titleAlign    | `'left' \| 'right' \| 'center'` | `center`    | 标题位置               |
| xAxisData     | `(string \| number)[]`       | `---`       | x 轴数据               |
| seriesOptions | `any`                           | `---`       | series 配置            |
| seriesData    | `any`                           | `---`       | series 数据            |

## base-chart defineExpose

| Name           | Type                                                                                                         | Description |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ----------- |
| elRef          | `HTMLElement`                                                                                                | 模板引用    |
| getInstance    | `() => echarts.ECharts \| null`                                                                              | 获取实例    |
| setOption      | `(options: ECOption,notMerge?: boolean \| undefined,lazyUpdate?: boolean \| undefined) => void \| undefined` | 配置        |
| option         | `ECOption`                                                                                                   | 设置图表    |
| setEmptyOption | `() => void`                                                                                                 | 设置空数据  |
| resize         | `() => void`                                                                                                 | 图表 Resize |
