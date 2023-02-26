<script lang="ts">
import type { DataTableProps } from 'naive-ui/es/data-table';
import { EditModalEntry } from '@/constants/enum';
interface PropsType {
  // 新增Api
  createApi?: string;
  // 更新Api
  updateApi?: string;
  // 查询Api
  readApi?: string;
  // 获取编辑详情
  editDetailApi?: string;
  // 删除Api
  deleteApi?: string;
  // 导出数据Api
  exportApi?: string;
  // 下载Api
  downloadApi?: string;
  // 导入Api
  importApi?: string;
  // 是否显示分页
  showPagination?: boolean;
  // 查询表单
  queryFormParams?: any;
  queryFormSchemas?: FormSchemaType;
  // 查询是否shallowRef数据
  queryShallowRef?: boolean;
  // 操作表单
  formParams?: any;
  formSchemas?: FormSchemaType;
  // 需要展示的列
  columns?: DataTableColumns<any>;
  // 表格Props
  tableProps?: DataTableProps;
  // 重构查询表单参数函数
  refactorFormQueryParams?: (data: any) => object | undefined;
  // 重构编辑表单参数函数
  refactorFormEditParams?: (data: any) => object | undefined;
  // 重构新增 or 编辑表单提交参数函数
  refactorFormSubmitParams?: (data: any) => object | undefined;
  // 提交前验证
  submitValidate?: () => void;
  // 查询表单元素超出限制（展开收起）
  queryFormRowLimitNumber?: number;
  // 表单元素超出限制（展开收起）
  formRowLimitNumber?: number;
  // 模态框标题
  modalTitle?: string;
  // 重构表格数据
  refactorTableData?: (data: any) => any[];
  // 查询请求序列化
  paramsSerializerQuery?: boolean;
  // 忽略查询表单权限按钮显示
  ignoreQueryFormPermissionList?: PermissionType[];
  // 忽略表单权限按钮显示
  ignoreFormPermissionList?: PermissionType[];
  // 忽略权限按钮内置操作
  ignorePermissionActions?: PermissionType[];
  // 查询表单按钮无效条件
  queryFormPermissionDisable?: PermissionDisableType;
  // 表单无效条件
  formPermissionDisable?: PermissionDisableType;
  // 自定义权限按钮loading
  permissionLoadingProps?: PermissionCustomTypeLoading;
}
</script>

<script setup lang="ts">
const slots = useSlots();

const emit = defineEmits<{
  (e: 'handle', params?: any): void;
  (e: 'add-before', params?: any): void;
  (e: 'add-after', params?: any): void;
  (e: 'edit-before', params?: any): void;
  (e: 'edit-after', params?: any): void;
  (e: 'modal-closed'): void;
}>();

const {
  createApi,
  updateApi,
  readApi,
  deleteApi,
  importApi,
  downloadApi,
  editDetailApi,
  exportApi,
  modalTitle,
  formParams,
  refactorFormQueryParams,
  refactorFormSubmitParams,
  queryFormRowLimitNumber,
  formRowLimitNumber,
  refactorFormEditParams,
  submitValidate,
  queryFormParams,
  paramsSerializerQuery,
  showPagination = true,
  refactorTableData,
  ignorePermissionActions = [],
  ignoreQueryFormPermissionList = [],
  ignoreFormPermissionList = [],
  queryFormSchemas = [],
  formSchemas = [],
  columns = [],
  queryShallowRef = true,
  permissionLoadingProps
} = defineProps<PropsType>();

// 是否编辑模式
const isEditMode = ref(false);

// 是否有编辑权限
const { hasEditPermission } = useRoutes();

// 往权限按钮注入导入api
provide('importApi', importApi);

// 模板引用
const tableRef = ref<TableRefType<any> | null>(null);

// -------------------------------------------------------------------------------------------- > Modal
const { showModal, openModal, closeModal, modalTitle: useModalTitle, clearModalTitle } = useModal();

// 查询表单
const { formData: initQueryFormData, resetField: resetQueryField } = useForm({
  ...queryFormParams
});

// 表格
const {
  pageParams,
  handleSorterChange,
  pagination,
  isLoadingQuery,
  queryFormData,
  tableData,
  executeQuery,
  executeQueryList,
  handleResetPage,
  sourceTableData
} = useTable(readApi ?? '', {
  queryFormParams: initQueryFormData,
  refactorFormQueryParams,
  queryShallowRef,
  refactorTableData,
  paramsSerializerQuery,
  tableRef
});
onMounted(() => executeQueryList());

// 编辑表单数据
const { formRef, validate, formData, updateField, resetField, useFilterSelectedData } = useForm(formParams);

// 更新行数据
const handleUpdateRow = (updater: (tableData: unknown) => void) => updater(tableData.value);

// 新增
const handleAdd = () => {
  emit('add-before');
  openModal(i18nt('add', { val: modalTitle && i18nt(modalTitle) }));
  isEditMode.value = false;
  emit('add-after');
};

// 打开编辑框入口
const openEditModalEntry = ref<EditModalEntry>();
// 打开编辑框
const { execute: executeGetCurrentEditData, data: currentEditData } = editDetailApi
  ? useAxiosGet(editDetailApi)
  : { execute: __, data: __ };
const openEditModal = async (rowData?: unknown, entry?: EditModalEntry) => {
  try {
    openEditModalEntry.value = entry ?? EditModalEntry.button;
    emit('edit-before');
    if (!editDetailApi || !executeGetCurrentEditData) {
      emit('handle', 'edit-title');
      return;
    }
    const { id } = rowData || toRaw(tableRef.value?.selectedRowsList.at(0));
    await executeGetCurrentEditData(editDetailApi, { params: { id } });
    let tempCurrentEditData = currentEditData.value;
    if (!tempCurrentEditData) throw Error('未获取到编辑数据');
    // 重构表单编辑参数函数
    if (refactorFormEditParams) tempCurrentEditData = refactorFormEditParams?.(tempCurrentEditData);
    const result = useFilterSelectedData([tempCurrentEditData], { ...formData.value, id });
    updateField(result);
    openModal(
      i18nt(hasEditPermission.value ? 'edit' : 'viewDetail', {
        val: modalTitle && i18nt(modalTitle)
      })
    );
    isEditMode.value = true;
    emit('edit-after');
  } catch (error) {
    console.log('base-curd openEditModal：异常', error);
  }
};

// 提交
const { execute: executeSubmit, isLoading: isLoadingSubmit } = useAxiosPost<ResponseDataType>();
const handleSubmit = async () => {
  try {
    await validate();
    // 提交前验证
    submitValidate?.();
    let params = { ...formData.value };
    // 重构表单请求参数函数
    if (refactorFormSubmitParams) params = refactorFormSubmitParams?.(toRaw(formData.value));
    const { error } = await executeSubmit(isEditMode.value ? updateApi ?? '' : createApi ?? '', {
      data: useOmitNilRequestParams(params)
    });
    !error.value && (closeModal(), executeQueryList(), tableRef.value?.clearChecked());
  } catch (error) {
    console.log('base-curd handleSubmit：异常', error);
  }
};

// 单一删除操作 - dialog形式
const handleSingleDelete = <T extends { id: string }>(data: T) => {
  const dialog = $dialog.warning({
    content: i18nt('permission-button.deleteTooltip'),
    onPositiveClick: async () => {
      try {
        dialog.loading = true;
        if (!deleteApi) throw new Error('请确认删除APi');
        const { error } = await useAxiosPost(deleteApi ?? '', { id: data.id }, __, { immediate: true });
        !error.value && ((pageParams.value.page = 1), executeQueryList());
        return !error.value;
      } catch (error) {
        console.log('base-curd handleDialogDelete：异常', error);
      } finally {
        dialog.loading = false;
      }
    }
  });
};

// 多选删除操作 - 权限按钮
const handleDelete = async (resolve?: AsyncEmitResolveType) => {
  const { execute } = useAxiosPost(deleteApi ?? '', {
    ids: tableRef.value?.selectedKeysList
  });
  const { error } = await execute();
  !error.value && ((pageParams.value.page = 1), executeQueryList(), tableRef.value?.clearChecked());
  resolve?.(!error.value);
};

// 导出数据
const { isLoading: isLoadingExportData, execute: executeExportData } = exportApi
  ? useDownloadFile(exportApi ?? '')
  : { execute: __, isLoading: __ };
const handleExport = exportApi
  ? () => {
      let params = { ...queryFormData.value };
      if (refactorFormQueryParams) params = refactorFormQueryParams?.(params);
      executeExportData?.(useOmitNilRequestParams(params), {
        paramsSerializer: paramsSerializerQuery ? useParamsSerializer() : __
      });
    }
  : __;

// 下载
const { execute: executeDownload, isLoading: isLoadingDownload } = downloadApi
  ? useDownloadFile(downloadApi ?? '')
  : { execute: __, isLoading: __ };
const handleDownload = downloadApi ? () => executeDownload?.() : __;

// 查询
const handleSearch = () => {
  handleResetPage(), executeQueryList(), tableRef?.value?.selectedKeysList?.length && tableRef.value?.clearChecked();
};

// 重置表单
const handleReset = () => (handleResetPage(), resetQueryField(), executeQueryList());

// 操作权限
const handlePermission = (permission: PermissionType, resolve?: AsyncEmitResolveType) => {
  const permissionAction: PermissionActionType = {
    add: createApi && !ignorePermissionActions.includes('add') && handleAdd,
    delete: deleteApi && !ignorePermissionActions.includes('delete') ? () => handleDelete(resolve) : __,
    edit: !ignorePermissionActions.includes('edit') ? () => openEditModal(__, EditModalEntry.button) : __,
    search: handleSearch,
    reset: handleReset,
    export: handleExport,
    download: handleDownload,
    import: handleSearch
  };
  if (permissionAction[permission]) permissionAction[permission]();
  emit('handle', permission);
};

// Modal 关闭后的回调
const modalAfterLeave = () => {
  resetField(), clearModalTitle(), emit('modal-closed');
  currentEditData?.value && (currentEditData.value = null);
};

defineExpose({
  handleDelete,
  handleReset,
  handleSearch,
  initQueryFormData,
  queryFormData,
  sourceTableData,
  formData,
  isLoadingQuery,
  isEditMode,
  tableData,
  currentEditData,
  tableRef,
  handleAdd,
  openEditModal,
  handleSingleDelete,
  handleUpdateRow,
  validate,
  executeQueryList,
  openEditModalEntry,
  executeQuery,
  handleResetPage
});
</script>

<template>
  <base-card>
    <!-- 查询表单 -->
    <base-form
      v-if="queryFormSchemas.length"
      v-model="initQueryFormData"
      :schemas="queryFormSchemas"
      :row-limit-number="queryFormRowLimitNumber"
      type="query"
    >
      <template #header-action>
        <permission-button
          form
          :ignore-permission-actions="ignorePermissionActions"
          :search-loading="isLoadingQuery"
          :ignore-permission-list="ignoreQueryFormPermissionList"
          :disable-condition="queryFormPermissionDisable"
          @handle="handlePermission"
        />
      </template>
    </base-form>
    <div class="main-area flex">
      <div v-if="slots['table-prefix']" class="w-1/3 mr">
        <slot name="table-prefix" />
      </div>
      <!-- 表格 -->
      <base-table
        ref="tableRef"
        class="flex-1"
        :loading="isLoadingQuery || isLoadingExportData"
        :data="tableData ?? []"
        remote
        :columns="columns"
        :pagination="showPagination && pagination"
        v-bind="tableProps"
        @update:sorter="handleSorterChange"
      >
        <template #header>
          <permission-button
            :disable-condition="formPermissionDisable"
            :export-loading="isLoadingExportData"
            :download-loading="isLoadingDownload"
            :select-length="tableRef?.selectedKeysList?.length"
            :ignore-permission-actions="ignorePermissionActions"
            :ignore-permission-list="ignoreFormPermissionList"
            :loading-props="permissionLoadingProps"
            :delete-api="deleteApi"
            @handle="handlePermission"
          />
        </template>
        <template v-if="slots['table-center']" #center> <slot name="table-center" /> </template>
      </base-table>
      <div v-if="slots['table-suffix']" class="w-1/3 ml">
        <slot name="table-suffix" />
      </div>
    </div>
    <!-- 模态框 -->
    <base-modal
      :show="showModal"
      :loading="isLoadingSubmit"
      :positive-text="isEditMode && !hasEditPermission ? __ : $t('confirm')"
      :title="useModalTitle"
      @after-leave="modalAfterLeave"
      @close="closeModal()"
      @negative-click="closeModal()"
      @positive-click="handleSubmit"
    >
      <slot name="modal-header" />
      <div class="flex">
        <slot name="modal-prefix" />
        <!-- 编辑表单 -->
        <base-form
          ref="formRef"
          v-model="formData"
          :row-limit-number="formRowLimitNumber"
          class="flex-1"
          :disabled="!hasEditPermission && isEditMode"
          :schemas="formSchemas"
          layout="dialog"
        />
        <slot name="modal-suffix" />
      </div>
      <slot name="modal-footer" />
    </base-modal>
  </base-card>
</template>
