<template>
  <base-curd
    ref="curdRef"
    :query-form-params="queryFormParams"
    :query-form-schemas="queryFormSchemas"
    :columns="tableColumns"
    :read-api="TheoryUphQueryApis.getList"
    modal-title="sparesCategory"
  />
</template>
<script setup lang="tsx">
import {
  TheoryUphQueryApis,
  queryType,
  tableListType,
  listType
} from '@/service/apis/testing/production-manage/theory-uph-query';
// 模板引用
const curdRef = ref<CurdRefType<queryType, any, tableListType>>();

//区域列表
const { data: areaList, execute: getAreaList } = useAxiosGet<listType[]>(TheoryUphQueryApis.getSelectItemList);
getAreaList({ params: { type: AttributeType.toolingArea } });
// 查询表单配置
const queryFormSchemas = computed<FormSchemaType>(() => [
  {
    type: 'select',
    model: 'treeId',
    formItemProps: { label: i18nt('nodeLevel') },
    componentProps: {
      options: areaList.value,
      valueField: 'id',
      labelField: 'name'
    }
  },
  {
    type: 'select',
    model: 'eapIds',
    formItemProps: { label: i18nt('eqpName') },
    componentProps: {
      options: areaList.value,
      valueField: 'id',
      labelField: 'name'
    }
  },
  {
    type: 'input',
    model: 'recipe',
    formItemProps: { label: 'Recipe' }
  },
  {
    type: 'input',
    model: 'uph',
    formItemProps: { label: i18nt('theoryUph') }
  },
  {
    type: 'select',
    model: 'isVerify',
    formItemProps: { label: i18nt('state') },
    componentProps: {
      options: areaList.value,
      valueField: 'id',
      labelField: 'name'
    }
  }
]);
const queryFormParams: Nullable<queryType> = {
  treeId: null,
  eapIds: null,
  recipe: null,
  uph: null,
  isVerify: null
};
// 表格配置
const queryFormData = computed<QueryParamsType<queryType> | undefined>(() => curdRef.value?.queryFormData);
const tableColumns: DataTableColumns<tableListType> = [
  { type: 'selection' },
  useRenderTableIndex<queryType, tableListType>(queryFormData),
  // {
  //   title: i18nt('eqpName'),
  //   key: 'eqpID',
  //   sorter: true,
  //   width: 250,
  //   render: (rowData: tableListType) =>
  //     useRenderTableTitleEdit(rowData.eqpID, () => curdRef?.value?.openEditModal?.(rowData, EditModalEntry.title))
  // },
  {
    title: i18nt('eqpName'),
    key: 'eqpID',
    sorter: true
  },
  {
    title: 'Recipe',
    sorter: true,
    key: 'recipe'
  },
  {
    title: 'Config',
    sorter: true,
    key: 'configCategory'
  },
  {
    title: i18nt('theoryUph'),
    sorter: true,
    key: 'uph'
  },
  {
    title: i18nt('correctionUPH'),
    sorter: true,
    key: 'correctUPH'
  },
  {
    title: i18nt('promote'),
    sorter: true,
    key: 'promote'
  },
  {
    title: i18nt('correctionReason'),
    key: 'modifyReason'
  },
  {
    title: i18nt('state'),
    key: 'verifyStatusString',
    sorter: true,
    width: TABLE_WIDTH_STATE
  },
  { title: i18nt('remark'), key: 'remark' },
  {
    title: i18nt('creator'),
    key: 'creator',
    sorter: true,
    width: TABLE_WIDTH_NAME
  },
  {
    title: i18nt('creationTime'),
    key: 'createTime',
    sorter: true,
    width: TABLE_WIDTH_DATE
  },
  {
    title: i18nt('modifier'),
    key: 'editor',
    width: TABLE_WIDTH_NAME
  },
  {
    title: i18nt('modifyTime'),
    key: 'editTime',
    sorter: true,
    width: TABLE_WIDTH_DATE
  }
  // {
  //   title: i18nt('modifyRecord'),
  //   key: '',
  //   width: 120,
  //   render(rowData: tableListType) {
  //     return useRenderTableTitleEdit(i18nt('modifyRecord')(), () =>
  //       addFormRef?.value?.open?.(rowData.id, hasEditPermission.value, selectList.value)
  //     );
  //   }
  // }
];
</script>

<style scoped lang="less"></style>
