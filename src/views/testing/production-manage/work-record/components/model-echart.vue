<template>
  <base-chart
    ref="chartRef"
    type="pie"
    class="h-300px!"
    :init-options="initOptions"
    :series-data="seriesData"
    :series-options="seriesOptions"
  />
</template>
<script setup lang="tsx">
// 中间
// echarts
const chartRef = ref<ChartRefType | null>(null);
const list = [
  {
    value: 40,
    name: 'Good'
  },
  {
    value: 60,
    name: 'Reject'
  }
];
const seriesData = computed(() => list);
const initOptions: any = {
  // tooltip: {
  //   trigger: 'item'
  // },
  tooltip: {
    // 此处配置鼠标移动对应区域时的黑色弹框
    trigger: 'item',
    show: true,
    formatter: function (params: { color: any; marker: any; data: { name: any; value: any } }) {
      return `${i18nt('dataStatistics')}:</br>${params.data.name}: ${params.data.value}`;
    }
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  }
};
const seriesOptions = {
  type: 'pie',
  radius: [60, 90],
  top: '-30%',
  left: '10%',
  label: {
    alignTo: 'edge',
    formatter: '{b}',
    edgeDistance: '5%',
    rich: {
      time: {
        fontSize: 15,
        color: '#999'
      }
    }
  }
};
</script>
<style scoped lang="less"></style>
