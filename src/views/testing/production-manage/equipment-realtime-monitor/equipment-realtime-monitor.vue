<template>
  <div id="equipment-realtime-monitor">
    <div class="equipment-content">
      <!-- 左侧数据 -->
      <div class="type equipment-left">
        <div class="left-title">
          <!-- 下拉框 -->
          <base-form
            ref="formRef"
            v-model="formData"
            :schemas="schemas"
            :label-width="85"
            :label-placement="'left'"
            :label-align="'right'"
            :layout="'page'"
          />
          <!-- 右侧状态 -->
          <div class="statusColor">
            <div class="statusItem">
              <span class="block" style="border: 2px solid #1ad175" />
              <span>生产/RUN</span>
            </div>
            <div class="statusItem">
              <span class="block" style="border: 2px solid #ec4014" />
              <span>报警/ALARM</span>
            </div>
            <div class="statusItem">
              <span class="block" style="border: 2px solid #ffdd20" />
              <span>停机/STOP</span>
            </div>
            <div class="statusItem">
              <span class="block" style="border: 2px solid #959595" />
              <span>断网/NETWORK FAILURE</span>
            </div>
            <div class="statusItem">
              <span class="block" style="border: 2px solid #3f8edd" />
              <span>空闲/IDLE</span>
            </div>
          </div>
        </div>
        <div class="left-workArea">
          <div
            class="workArea-content"
            :style="{
              width: '1400px',
              height: '900px'
            }"
          >
            <!-- 设备布局 -->
            <div
              v-for="item in layoutList"
              :key="item.eqp1Id"
              :style="{
                width: item.width + 'px',
                height: item.height + 'px',
                left: item.left + 'px',
                top: item.top + 'px',
                backgroundImage: 'url(' + handleImg(item.status) + ')'
              }"
              class="equipment"
            >
              <span>{{ item.eqp1Id }}</span>
              <span v-if="item.eqp2Id">{{ item.eqp2Id }}</span>
              <div :style="{ width: item.width + 'px' }" class="status-display">{{ item.mesEqpStatus }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧图表 -->
      <div class="type equipment-right">
        <div class="rightType">
          <img src="@/assets/images/testing/production-manage/equipment-realtime-monitor/right-type.png" alt="" />
          <div class="rightType-title">机台总运行状态</div>
        </div>
        <div class="rightEchart">
          <base-chart
            ref="chartRef"
            type="pie"
            class="h-200px!"
            :init-options="initOptions"
            :series-data="seriesData"
            :series-options="seriesOptions"
          />
        </div>
        <!-- 列表 -->
        <div
          v-for="item in statusCountList"
          :key="item.status"
          :style="{
            background: item.background,
            border: item.borderColor
          }"
          class="rightUl"
        >
          <img :src="item.imgSrc" alt="" />
          <div class="rightUl-content">
            <div class="content-title">{{ item.statusName }}</div>
            <div class="content-text">{{ item.qty }}/{{ 7 }}</div>
          </div>
          <div class="statistics">{{ ((item.qty / 7) * 100).toFixed(2) }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { formRef, formData } = useForm({
  area: null
});
// 查询表单配置项
const areaList = ref([
  {
    id: 1,
    name: '12'
  }
]);
const schemas = computed<FormSchemaType>(() => [
  {
    type: 'select',
    model: 'area',
    formItemProps: { label: '区域名称' },
    componentProps: {
      options: areaList.value,
      valueField: 'id',
      labelField: 'name'
    }
  },
  {
    type: 'select',
    model: 'area',
    formItemProps: { label: '布局名称' },
    componentProps: {
      options: areaList.value,
      valueField: 'id',
      labelField: 'name'
    }
  }
]);
const layoutList = [
  {
    eqp1Id: 12,
    width: 100,
    height: 100,
    left: 100,
    top: 100,
    status: 'monitor-1.gif',
    eqp2Id: null,
    mesEqpStatus: 1
  }
];
const list = [
  {
    status: 'IDLE',
    qty: 0
  },
  {
    status: 'RUN',
    qty: 1
  },
  {
    status: 'ALARM',
    qty: 0
  },
  {
    status: 'STOP',
    qty: 1
  },
  {
    status: 'NETWORKFAILURE',
    qty: 1
  }
];
// 处理图片
const handleImg = (name: string) => {
  return new URL(
    `../../../../assets/images/testing/production-manage/equipment-realtime-monitor/${name}`,
    import.meta.url
  ).href;
};
const statusCountList = [
  {
    status: 0,
    background: '#f5f5f5f5',
    borderColor: '#FFFFFF',
    imgSrc: handleImg('monitor-6.png'),
    statusName: '测试一',
    qty: 1
  }
];

const chartRef = ref<ChartRefType | null>(null);
const seriesData = computed(() => {
  return list.map(ele => {
    return {
      name: ele.status,
      value: ele.qty,
      percent: ((ele.qty / 7) * 100).toFixed(2)
    };
  });
});
const initOptions: any = {
  tooltip: {
    // 此处配置鼠标移动对应区域时的黑色弹框
    trigger: 'item',
    show: true,
    formatter: function (params: { color: any; marker: any; data: { name: any; percent: any } }) {
      return `
			${params.marker}
			${params.data.name}: ${params.data.percent} %
			`;
    }
  }
};
const seriesOptions = {
  name: '数量',
  type: 'pie',
  radius: ['65%', '90%'],
  center: ['50%', '50%'],
  // data: data,
  avoidLabelOverlap: false,
  label: {
    show: false,
    position: 'center',
    // 设置默认圈内文字
    formatter: function (item: { data: { name: any; value: string; percent: string } }) {
      const name = item.data.name;
      return `{text|${name} }\n{rate|${item.data.value + '/' + 7 + '(' + item.data.percent + '%' + ')'}}`;
    },
    rich: {
      text: {
        align: 'center',
        verticalAlign: 'middle',
        fontSize: 24,
        padding: 4
      },
      rate: {
        align: 'center',
        verticalAlign: 'middle',
        color: 'rgba(0, 21, 41, 1)',
        padding: 8,
        fontSize: 14,
        fontWeight: 'bold'
      }
    }
  },
  emphasis: {
    label: {
      show: true,
      fontSize: '12',
      fontWeight: 'bold'
    }
  },
  labelLine: {
    show: true
  }
};
// echarts事件需在实例渲染后触发
onMounted(() => {
  const currentIndex = 0;
  const echartDemo = chartRef.value?.getInstance?.();
  // 设置默认高亮
  echartDemo?.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: currentIndex
  });

  // 鼠标进入
  echartDemo?.on('mouseover', (e: { dataIndex: number }) => {
    if (currentIndex === e.dataIndex) {
      // 高亮当前
      echartDemo?.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex
      });
    } else {
      // 取消之前高亮的图形
      echartDemo.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
      });
    }
  });
  // 鼠标离开
  echartDemo?.on('mouseout', () => {
    // 设置鼠标离开时默认显示的高亮
    echartDemo?.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex
    });
  });
});
</script>
<style lang="less" scoped>
#equipment-realtime-monitor {
  padding: 10px;
  background: rgba(242, 242, 242, 1);

  .equipment-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .type {
      height: 100%;
      background: rgba(255, 255, 255, 1);
      background-blend-mode: normal;
      box-shadow: 0px 4px 14px rgba(166, 166, 166, 0.4);
      border-radius: 10px;
      mix-blend-mode: normal;
    }
    .equipment-left {
      width: 85%;
      height: 992px;

      .left-title {
        height: 50px;
        display: flex;
        align-items: center;

        border-bottom: 2px solid rgba(242, 242, 242, 1);
        :deep(.n-form.n-form--inline) {
          width: 50% !important;
        }
        .statusColor {
          height: 50px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          font-size: 14px;

          .statusItem {
            display: flex;
            margin-right: 20px;
            .block {
              width: 14px;
              height: 14px;
              margin-right: 4px;
              background-color: #f4f4f4;
            }
          }
        }
      }
      .left-workArea {
        width: calc(100% - 20px);
        margin: 10px;
        // height: 900px;
        height: 920px;
        overflow: auto;
        .workArea-content {
          background: rgba(255, 255, 255, 1);
          box-shadow: inset 0px 0px 14px rgba(166, 166, 166, 0.4);
          border-radius: 10px;
          mix-blend-mode: normal;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          position: relative;
          .equipment {
            position: absolute;
            display: inline-block;
            box-sizing: border-box;
            padding-top: 5px;
            background-size: 100% 100%;
            cursor: pointer;
            font-size: 12px;
            font-weight: 700;

            span {
              display: block;
              margin-left: 5px;
            }

            .status-display {
              height: 25px;
              text-align: center;
              line-height: 24px;
              font-weight: bold;
              border: 2px solid;
              border-top: 0;
              position: absolute;
              left: 0;
              bottom: -25px;
            }
          }
        }
      }
    }
    .equipment-right {
      width: calc(15% - 42px);
      height: 960px;
      padding: var(--padding);
      display: flex;
      flex-direction: column;
      align-items: center;
      .rightType {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        line-height: 40px;

        img {
          width: 40px;
          height: 40px;
          margin-right: var(--margin);
        }

        .rightType-title {
          mix-blend-mode: normal;
          font-size: 18px;
          color: rgba(0, 21, 41, 1);
          font-weight: bold;
        }
      }
      .rightEchart {
        margin: 30px 0px 40px;
        width: 100%;
        height: 200px;
      }
      .rightUl {
        width: 100%;
        height: 77px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-radius: 15px;
        color: rgba(0, 21, 41, 1);

        img {
          margin-left: 20px;
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }

        .rightUl-content {
          width: calc(100% - 100px);
          height: 47px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .content-title {
            height: 29px;
            line-height: 29px;
            font-size: 14px;
            font-weight: bold;
          }

          .content-text {
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .statistics {
          font-weight: bold;
          margin-left: 10px;
          width: 50px;
          height: 47px;
          line-height: 47px;
          font-size: 14px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
