<template>
  <div id="work-record">
    <n-row :gutter="[16, 16]">
      <n-col :span="24">
        <div class="curd">
          <!-- 搜索 -->
          <base-form
            ref="formRef"
            v-model="formData"
            type="query"
            :schemas="schemas"
            :label-align="'right'"
            :layout="'page'"
          >
            <template #header-action>
              <permission-button form @handle="handleButton" />
            </template>
          </base-form>
        </div>
      </n-col>
      <!-- 中间 -->
      <n-col :span="24">
        <div class="curd curdEchart">
          <div class="leftEchart">
            <modelEchart />
          </div>
          <div class="rightEchart">
            <n-row :gutter="[14, 0]">
              <n-col v-for="item in rightEchart" :key="item.src" :span="6">
                <div class="status">
                  <div class="status-top">
                    <div class="status-title">{{ item.title }}</div>
                    <div class="status-text" :style="{ color: item.color }">{{ item.title }}</div>
                  </div>
                  <img class="status-img" :src="item.src" alt="" />
                </div>
              </n-col>
            </n-row>
          </div>
        </div>
      </n-col>
      <!-- 底部表格 -->
      <n-col :span="24">
        <div class="curd">
          <base-table
            ref="tableRef"
            remote
            :scroll-x="TABLE_WIDTH_SCROLL_MIDDLE"
            :columns="tableColumns"
            :data="tableData ?? []"
            :loading="isLoadingQuery"
            :pagination="pagination"
            :expanded-row-keys="expandedList"
            @update:sorter="handleSorterChange"
          />
        </div>
      </n-col>
    </n-row>
  </div>
</template>
<script setup lang="tsx">
import modelEchart from './components/model-echart.vue';
import { WorkRecordApis, listType, tableListType } from '@/service/apis/testing/production-manage/work-record';
// 站别列表
const { data: stageList, execute: getStageList } = useAxiosGet<listType[]>(WorkRecordApis.getSelectItemList);
getStageList({ params: { type: AttributeType.toolingStage } });
// 表单
const {
  formRef,
  formData,
  resetField: resetQueryField
} = useForm({
  area: null,
  stage: null,
  hdStatus: null,
  currentFlag: null,
  toolingModel: null,
  toolingBarcode: null,
  stock: null,
  trackId: null,
  poNo: null,
  timestamp: null
});
// 查询表单配置项
const schemas = computed<FormSchemaType>(() => [
  {
    type: 'select',
    model: 'eqp1Id',
    formItemProps: { label: i18nt('sorter') },
    componentProps: {
      options: stageList.value,
      valueField: 'id',
      labelField: 'name'
    }
  },
  {
    type: 'date-picker',
    model: 'timestamp',
    modelValue: 'formatted-value',
    formItemProps: { label: i18nt('timeSlot') },
    componentProps: { type: 'datetimerange' }
  },
  {
    type: 'input',
    model: 'lotId',
    formItemProps: { label: i18nt('productionBatchNumber') }
  },
  {
    type: 'input',
    model: 'workOrder',
    formItemProps: { label: i18nt('workOrderNumber') }
  },
  {
    type: 'input',
    model: 'trProgram',
    formItemProps: { label: i18nt('programName') }
  },
  {
    type: 'input',
    model: 'productName',
    formItemProps: { label: i18nt('productModel') }
  },
  {
    type: 'input',
    model: 'custLotId',
    formItemProps: { label: i18nt('customerBatchNumber') }
  },
  {
    type: 'input',
    model: 'custName',
    formItemProps: { label: i18nt('customerCode') }
  },
  {
    type: 'select',
    model: 'eqp2Id',
    formItemProps: { label: i18nt('testMachine') },
    componentProps: {
      options: stageList.value,
      valueField: 'id',
      labelField: 'name'
    }
  },
  {
    type: 'select',
    model: 'headId',
    formItemProps: { label: i18nt('testHead') },
    componentProps: {
      options: stageList.value,
      valueField: 'id',
      labelField: 'name'
    }
  }
]);
// 中间

// 处理图片
const handleImg = (name: string) => {
  return new URL(`../../../../assets/images/testing/production-manage/work-record/${name}`, import.meta.url).href;
};
// 中间右侧列表
const rightEchart = ref([
  {
    title: 'total',
    text: 0,
    color: 'rgb(26, 140, 254)',
    src: handleImg('work-record-4.png')
  },
  {
    title: 'good',
    text: 0,
    color: 'rgb(53, 195, 109)',
    src: handleImg('work-record-1.png')
  },
  {
    title: 'reject',
    text: 0,
    color: 'rgb(255, 152, 95)',
    src: handleImg('work-record-2.png')
  },
  {
    title: 'yiled',
    text: 0,
    color: 'rgb(138, 130, 249)',
    src: handleImg('work-record-3.png')
  }
]);
/*
 * 表格配置项
 * 表格查询传值更改
 */
const refactorFormQueryParams = (data: any) => {
  if (!data.timestamp) return;
  return { ...data, ...useFormatDateTimeParams(data.timestamp) };
};
const {
  handleSorterChange,
  pagination,
  pageParams,
  isLoadingQuery,
  tableData,
  executeQueryList: getList
} = useTable<tableListType[]>(WorkRecordApis.getList, { queryFormParams: formData, refactorFormQueryParams });
// 获取表格数据
getList();
const renderIndex: ComputedRef<QueryParamsType | undefined> | Ref<QueryParamsType | undefined> = computed(() => ({
  page: pagination?.value?.page,
  size: pagination.value.pageSize
}));
const expandedList = computed(() => tableData?.value?.map(ele => ele.id));
const tableColumns: DataTableColumns<tableListType> = [
  useRenderTableIndex<any, any>(renderIndex),
  {
    title: 'TrackList',
    key: 'stage',
    titleColSpan: 2,
    colSpan: () => 2,
    width: 280,
    render(row: any) {
      return (
        <>
          <div class="trackLi">
            <div class="trackLi-title">Work Order:</div>
            <div class="trackLi-text">{row.workOrder}</div>
          </div>
          <div class="trackLi">
            <div class="trackLi-title"> Customer:</div>
            <div class="trackLi-text">{row.custName}</div>
          </div>
          <div class="trackLi">
            <div class="trackLi-title">Customer LotID:</div>
            <div class="trackLi-text">{row.custLotId}</div>
          </div>
          <div class="trackLi">
            <div class="trackLi-title">LotID:</div>
            <div class="trackLi-text">{row.lotId}</div>
          </div>
          <div class="trackLi">
            <div class="trackLi-title">Handler:</div>
            <div class="trackLi-text">{row.eqp1Id}</div>
          </div>
          <div class="trackLi">
            <div class="trackLi-title">Tester: </div>
            <div class="trackLi-text">{row.eqp2Id}</div>
          </div>
          <div class="trackLi">
            <div class="trackLi-title">Track In: </div>
            <div class="trackLi-text">{row.trackStamp}</div>
          </div>
          <div class="trackLi">
            <div class="trackLi-title">Track Out: </div>
            <div class="trackLi-text">{row.trackOutStamp}</div>
          </div>
        </>
      );
    }
  },
  {
    type: 'expand',
    expandable: () => true,
    renderExpand: () => {
      return (
        <div class="expandList">
          <div class="expand-li">
            <img class="expand-img" src={handleImg('work-record-7.png')} alt="" />
            <div class="expand-text">12</div>
          </div>
          <div class="expand-li">
            <img class="expand-img" src={handleImg('work-record-5.png')} alt="" />
            <div class="expand-text">12</div>
          </div>
          <div class="expand-li">
            <img class="expand-img" src={handleImg('work-record-6.png')} alt="" />
            <div class="expand-text">12</div>
          </div>
          <div class="expand-li">
            <img class="expand-img" src={handleImg('work-record-8.png')} alt="" />
            <div class="expand-text">12</div>
          </div>
        </div>
      );
    }
  },
  {
    title: 'Test Step',
    width: 100,
    key: 'trStep'
  },
  {
    title: 'Step Time',
    width: 160,
    key: 'stepTime'
  },
  {
    title: 'Summary List',
    width: 200,
    key: 'stage'
  },
  {
    title: 'Status',
    width: 100,
    key: 'statusName'
  },
  {
    title: 'Start Time',
    width: 100,
    key: 'systemTime'
  },
  {
    title: 'End Time',
    width: 100,
    key: 'nextSystemTime'
  },
  {
    title: 'Duration',
    width: 100,
    key: 'RemarkBtn'
  },
  {
    title: 'Remark',
    width: 150,
    key: 'RemarkBtn'
  },
  {
    title: 'Test Step Summary',
    width: 400,
    key: '',
    render() {
      return (
        <div class="testStepSummary">
          {rightEchart.value.map(ele => {
            return (
              <div class="testStepSummary-content">
                <img class="testStepSummary-img" src={ele.src} alt="" />
                <div class="testStepSummary-text" style={{ color: ele.color }}>
                  {ele.title}:{ele.text}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
];
// 页面按钮事件
const handleButton = (permission: PermissionType) => {
  switch (permission) {
    case 'reset':
      resetQueryField();

      break;
    case 'search':
      pageParams.value.page = 1;
      // getList();
      break;
    default:
      break;
  }
};
</script>
<style scoped lang="less">
.curd {
  padding: var(--padding);
  background-color: #ffffff;
}
.curdEchart {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .leftEchart {
    height: 200px;
    width: 34%;
  }
  .rightEchart {
    width: 65%;
    .status {
      background-color: #f5f6fb;
      border-radius: 6px;
      padding: var(--padding);
      height: 80px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .status-top {
        height: 80px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        padding: var(--padding) 0;

        .status-text {
          font-size: 20px;
          font-weight: 700;
        }
      }
      .status-img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
:deep(.n-data-table-td) {
  .n-ellipsis:not(.n-ellipsis--line-clamp) {
    width: 100%;
    .trackLi {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      padding: 5px 0;
      .trackLi-title {
        background-color: #dcf0fe;
        margin-right: 5px;
        font-size: 13px;
        font-weight: 700;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      .trackLi-text {
        box-sizing: border-box;
        width: 60%;
        word-break: break-all;
        word-wrap: break-word;
        text-align: left;
      }
    }
    .testStepSummary {
      display: flex;
      justify-content: center;
      .testStepSummary-content {
        display: flex;
        margin-right: 10px;
        .testStepSummary-img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        .testStepSummary-text {
          font-size: 14px;
        }
      }
    }
  }
  .expandList {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--padding) var(--padding);
    .expand-li {
      display: flex;
      align-items: center;
      margin-right: var(--margin);
      .expand-img {
        width: 66px;
        height: 30px;
        margin-right: var(--margin);
      }
    }
  }
}
</style>
