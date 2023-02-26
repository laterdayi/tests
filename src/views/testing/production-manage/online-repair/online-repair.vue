<script lang="ts">
import { OnlineRepairApis } from '@/service/apis/testing/production-manage/online-repair';

interface QueryType {
  key: string;
}

interface EditType {
  id: string;
}

interface TableListType {
  id: string;
}

// 初始化查询表单
const initQueryFormSchemas = (): FormSchemaType => [];

// 初始化表单
const initFormSchemas = (): FormSchemaType => [];

const createColumns = (
  queryParams: ComputedRef<QueryParamsType<QueryType> | undefined>,
  curdRef: Ref<CurdRefType<QueryType, EditType, TableListType> | undefined>
): DataTableColumns<TableListType> => [
  { type: 'selection' },
  useRenderTableIndex<QueryType, TableListType>(queryParams),
  {
    title: i18nt('***'),
    key: 'name',
    sorter: true,
    render: rowData => useRenderTableTitleEdit(rowData.id, () => curdRef?.value?.openEditModal?.(rowData)),
    width: TABLE_WIDTH_STATE * 4
  }
];
</script>
<script setup lang="ts">
// 模板引用
const curdRef = ref<CurdRefType<QueryType, EditType, TableListType>>();

// 查询表单模型
const queryFormSchemas = initQueryFormSchemas();
// 查询表单参数
const queryFormParams: Nullable<QueryType> = { key: null };
// 查询表单数据 -> 响应式
const queryFormData = computed<QueryParamsType<QueryType> | undefined>(() => curdRef.value?.queryFormData);

// 表单模型
const formSchemas = initFormSchemas();
// 表单参数
const formParams = {};

const tableColumns = createColumns(queryFormData, curdRef);
</script>

<template>
  <div id="online-repair">
    <base-curd
      ref="curdRef"
      :query-form-params="queryFormParams"
      :query-form-schemas="queryFormSchemas"
      :form-params="formParams"
      :form-schemas="formSchemas"
      :columns="tableColumns"
      :create-api="OnlineRepairApis.createOnlineApi"
      :update-api="OnlineRepairApis.updateOnlineApi"
      :read-api="OnlineRepairApis.getOnlineListApi"
      :delete-api="OnlineRepairApis.deleteOnlineApi"
      :edit-detail-api="OnlineRepairApis.getOnlineDetailApi"
      :export-api="OnlineRepairApis.getOnlineListApi"
      :download-api="OnlineRepairApis.downloadOnlineApi"
      :import-api="OnlineRepairApis.importOnlineApi"
      modal-title="***"
    />
  </div>
</template>
