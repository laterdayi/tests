<script lang="ts">
import { SaveSummaryApis } from '@/service/apis/testing/production-manage/save-summary';

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
  <div id="save-summary">
    <base-curd
      ref="curdRef"
      :query-form-params="queryFormParams"
      :query-form-schemas="queryFormSchemas"
      :form-params="formParams"
      :form-schemas="formSchemas"
      :columns="tableColumns"
      :create-api="SaveSummaryApis.createSaveApi"
      :update-api="SaveSummaryApis.updateSaveApi"
      :read-api="SaveSummaryApis.getSaveListApi"
      :delete-api="SaveSummaryApis.deleteSaveApi"
      :edit-detail-api="SaveSummaryApis.getSaveDetailApi"
      :export-api="SaveSummaryApis.getSaveListApi"
      :download-api="SaveSummaryApis.downloadSaveApi"
      :import-api="SaveSummaryApis.importSaveApi"
      modal-title="***"
    />
  </div>
</template>
