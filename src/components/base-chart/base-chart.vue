<script lang="ts">
export default { inheritAttrs: false };
import type { ECOption } from '@/plugins/core/echarts';
import type { Arrayable } from '@vueuse/core';
import type { XAXisOption } from 'echarts/types/dist/shared';
import { NSpin } from 'naive-ui';
import { type EChartRefType, useChart } from './use-chart/use-chart';
import { useChartDataZoomOption } from './utils';
</script>
<script setup lang="ts">
interface PropsType {
  // 图表类型
  type?: EChartRefType;
  // 初始化配置
  initOptions?: ECOption;
  // 加载状态
  loading?: boolean;
  // 标题
  title?: string;
  // 标题位置
  titleAlign?: 'left' | 'right' | 'center';
  // x轴数据
  xAxisData?: (string | number)[];
  // 数据集
  seriesOptions?: any;
  seriesData?: any;
  // dataZoom
  dataZoom?: boolean;
}

const {
  loading = false,
  seriesOptions,
  xAxisData,
  seriesData,
  initOptions,
  dataZoom,
  type,
  title,
  titleAlign = 'center'
} = defineProps<PropsType>();

const { elRef, setOption, option, setEmptyOption, getInstance, resize } = useChart({ type, initOptions });

// 空数据
const isEmptyData = () => {
  let isOk = false;
  if (!seriesData?.length && !xAxisData?.length) {
    setEmptyOption();
    isOk = true;
  }
  return isOk;
};

// 数据缩放
const handleDataZoom = (option: ECOption) => {
  if (dataZoom) option.dataZoom = useChartDataZoomOption(xAxisData?.length ?? 0);
  return option;
};

tryOnMounted(() => {
  if (isEmptyData()) return;
  let _options: ECOption = { ...option };
  _options = handleDataZoom(_options);
  if (option) setOption(_options, true);
});

watch(
  () => [...(seriesData ?? [])],
  newVal => {
    if (isEmptyData()) return;
    if (option && option.series) {
      (option.series as any)[0] = {
        ...(option.series as any)[0],
        ...seriesOptions,
        data: newVal
      };
    }
    if (option && option.xAxis) {
      option.xAxis = { ...option.xAxis, data: xAxisData } as Arrayable<XAXisOption>;
    }
    let _options: ECOption = { ...option };
    _options = handleDataZoom(_options);
    if (option) setOption(_options, true);
  },
  {
    immediate: true
  }
);

defineExpose({
  resize,
  getInstance,
  elRef,
  setOption,
  option,
  setEmptyOption
});
</script>

<template>
  <n-spin :show="loading" class="w-full">
    <div v-if="title" :class="[`text-${titleAlign}`]" class="text-18px text-gray-500">{{ $t(title) }}</div>
    <div ref="elRef" class="w-full h-300px" v-bind="$attrs" />
    <div class="text-16px text-gray-500 text-center">
      <slot name="footer" />
    </div>
  </n-spin>
</template>
