<script lang="tsx">
import { CommonApis } from '@/service/apis/common/common';
import { EquipmentLayoutManageApis } from '@/service/apis/testing/basic-config/equipment-layout-manage/equipment-layout-manage';
import type { NavigationFailure } from 'vue-router';

interface QueryType {
  name?: string;
}
interface EditType {
  areaName: string;
  description: string;
  height: number;
  width: number;
  type: number;
  layoutName: string;
  image: string;
}

interface EquipmentListType {
  eqpId: string;
  eqpName: string;
  id: string;
  layoutId: string;
  width: number;
  height: number;
  left: number;
  top: number;
}

interface TableListType {
  id: string;
  areaName: string;
  checked: boolean;
  description: string;
  height: number;
  image: string;
  layoutName: string;
  status: number;
  type: number;
  width: number;
}

interface CopyType {
  copyLayoutId: string;
  layoutName: string;
  selectedEqps: string[];
}

// 初始化查询表单
const initQueryFormSchemas = (): FormSchemaType => [
  { type: 'input', model: 'name', formItemProps: { label: i18nt('keyword') } }
];

const initFormSchemas = (
  curdRef?: CurdRefType<QueryType, EditType, TableListType>,
  areaNameList?: OptionsType[],
  isLoadingAreaNameList?: boolean
): FormSchemaType => [
  {
    type: 'input',
    model: 'layoutName',
    formItemProps: {
      label: i18nt('layoutName'),
      rule: [useRules('input', 'layoutName'), useRuleStringLength()]
    }
  },
  {
    type: 'input-number',
    model: 'width',
    formItemProps: {
      label: i18nt('layoutWidth'),
      rule: [useRules('input', 'onlyPositiveIntRule', true, 'layoutWidth'), useRuleNumberSize(500)]
    }
  },
  {
    type: 'input-number',
    model: 'height',
    formItemProps: {
      label: i18nt('layoutHeight'),
      rule: [useRules('input', 'onlyPositiveIntRule', true, 'layoutHeight'), useRuleNumberSize(500)]
    }
  },
  {
    type: 'input',
    model: 'type',
    formItemProps: { label: i18nt('layoutType'), rule: [useRules('input', 'layoutType'), useRuleStringLength()] }
  },
  useRenderFormUpload({
    model: 'image',
    label: 'backgroundImage',
    rule: astrictImgRule,
    componentProps: {
      action: CommonApis.uploadImgApi,
      listType: 'image-card',
      fileList:
        curdRef?.isEditMode && curdRef?.formData?.image
          ? [
              {
                id: curdRef?.formData?.image,
                name: curdRef?.formData?.image,
                status: 'finished',
                url: `${BASE_API}/${curdRef?.formData?.image}`
              }
            ]
          : []
    },
    useUploadParams: { formData: curdRef?.formData, executeOnFinish: () => curdRef?.validate() }
  }),
  {
    type: 'select',
    model: 'areaName',
    formItemProps: { label: i18nt('areaName'), rule: useRules('change', 'areaName') },
    componentProps: computed(() => ({
      options: areaNameList,
      loading: isLoadingAreaNameList,
      labelField: 'name',
      valueField: 'id'
    }))
  },
  useRenderFormTextarea({ extraParams: { formItemClass: 'col-span-2!' } })
];

const createColumns = (
  queryParams: ComputedRef<QueryParamsType<QueryType> | undefined>,
  curdRef: Ref<CurdRefType<QueryType, EditType, TableListType> | undefined>,
  handleSkip: (id: string) => Promise<void | NavigationFailure | undefined>
): DataTableColumns<TableListType> => [
  { type: 'selection' },
  useRenderTableIndex<QueryType, TableListType>(queryParams),
  {
    title: i18nt('layoutName'),
    key: 'layoutName',
    sorter: true,
    render: rowData => useRenderTableTitleEdit(rowData.layoutName, () => handleSkip(rowData.id))
  },
  { title: i18nt('areaName'), key: 'areaName', sorter: true },
  { title: i18nt('layoutWidth'), key: 'width', sorter: true, width: TABLE_WIDTH_STATE },
  { title: i18nt('layoutHeight'), key: 'height', sorter: true, width: TABLE_WIDTH_STATE },
  { title: i18nt('layoutType'), key: 'type', sorter: true },
  {
    title: i18nt('backgroundImage'),
    key: 'image',
    width: TABLE_WIDTH_INFO,
    render(rowData) {
      return rowData.image ? <base-image src={`${BASE_API}/${rowData.image}`} width="60"></base-image> : <div></div>;
    }
  },
  { title: i18nt('description'), key: 'description' },
  useRenderTableActionColumn({
    width: TABLE_WIDTH_STATE,
    render: rowData =>
      useRenderTableFixedButton({ onClick: () => curdRef.value?.openEditModal?.(rowData) }, 'viewDetail')
  })
];

// -------------------------------------------------------------------------------------------- > 复制布局

// 初始化查询表单
const initCopyFormSchemas = (
  checkAll: boolean,
  indeterminate: boolean,
  copyFormData: Nullable<CopyType>,
  sourceLayoutList?: OptionsType[],
  isLoadingSourceLayoutList?: boolean,
  machineList?: EquipmentListType[],
  executeMachineList?: ExecuteFunctionType<EquipmentListType[]>
): FormSchemaType => [
  {
    type: 'input',
    model: 'layoutName',
    formItemProps: { label: i18nt('layoutName'), rule: useRules('input', 'layoutName') }
  },
  {
    type: 'select',
    model: 'copyLayoutId',
    formItemProps: { label: i18nt('sourceLayout'), rule: useRules('change', 'sourceLayout') },
    componentProps: {
      options: sourceLayoutList,
      labelField: 'name',
      valueField: 'id',
      loading: isLoadingSourceLayoutList,
      onUpdateValue(value) {
        executeMachineList?.(__, { params: { LayoutId: value } });
      }
    }
  },
  {
    type: 'custom-form-item',
    formItemProps: { label: i18nt('selectMachine') },
    render() {
      return (
        <>
          <div>
            <n-checkbox
              v-model:checked={checkAll}
              indeterminate={indeterminate}
              onUpdate:checked={(value: boolean) => {
                copyFormData.selectedEqps = value ? map(machineList, 'eqpId') : [];
                indeterminate = false;
              }}>
              {i18nt('seleteAll')}
            </n-checkbox>
            <n-checkbox-group
              class="mt"
              v-model:value={copyFormData.selectedEqps}
              onUpdate:value={(value: string[]) => {
                if (!machineList?.length) return;
                checkAll = value.length === machineList.length;
                indeterminate = value.length > 0 && value.length < machineList.length;
              }}>
              <n-space>
                {machineList?.map(item => {
                  return <n-checkbox value={item.eqpId} label={item.eqpName} />;
                })}
              </n-space>
            </n-checkbox-group>
          </div>
        </>
      );
    }
  }
];
</script>

<script setup lang="tsx">
const router = useRouter();

// 获取区域名称列表
const {
  data: areaNameList,
  execute: executeGetAreaNameList,
  isLoading: isLoadingAreaNameList
} = useAxiosGet<OptionsType[]>(EquipmentLayoutManageApis.getAreaNameListApi);

// 模板引用
const curdRef = ref<CurdRefType<QueryType, EditType, TableListType>>();

// 查询表单模型
const queryFormSchemas = initQueryFormSchemas();
const queryFormParams: Nullable<QueryType> = { name: null };
const queryFormData = computed<QueryParamsType<QueryType> | undefined>(() => curdRef.value?.queryFormData);
const formParams = {
  areaName: null,
  description: null,
  height: null,
  width: null,
  type: null,
  layoutName: null,
  image: null
};
const formSchemas = computed(() => initFormSchemas(curdRef.value, areaNameList.value, isLoadingAreaNameList.value));

const handleSkip = (id: string) => router.push({ path: `/testing/basic-config/equipment-layout-detail/${id}` });

const tableColumns = createColumns(queryFormData, curdRef, handleSkip);

// 查询所有列表
const queryAllSelectList = () => executeGetAreaNameList();

// -------------------------------------------------------------------------------------------- > 复制布局
const { showModal, openModal, modalTitle, closeModal } = useModal();
// 表单模型
const {
  formData: copyFormData,
  validate,
  formRef,
  resetField
} = useForm<Nullable<CopyType>>({
  copyLayoutId: null,
  layoutName: null,
  selectedEqps: null
});

// 获取来源布局列表
const {
  data: sourceLayoutList,
  execute: executeSourceLayoutList,
  isLoading: isLoadingSourceLayoutList
} = useAxiosGet<OptionsType[]>(EquipmentLayoutManageApis.getSourceLayoutListApi);

// 获取机台列表列表
const { data: machineList, execute: executeMachineList } = useAxiosGet<EquipmentListType[]>(
  EquipmentLayoutManageApis.getMachineListApi
);

// 全选
const checkAll = ref(false);
const indeterminate = ref(false);

const { isLoading: isLoadingCopyLayout, execute: executeCopyLayout } = useAxiosPost(
  EquipmentLayoutManageApis.copyEquipmentLayoutApi
);

const handleCopy = async () => {
  try {
    await validate();
    const { error } = await executeCopyLayout(__, { data: { ...copyFormData.value } });
    if (!error.value) closeModal(), (machineList.value = []), curdRef?.value?.handleSearch();
  } catch (error) {
    console.log(error);
  }
};

const copyFormSchemas = computed(() =>
  initCopyFormSchemas(
    checkAll.value,
    indeterminate.value,
    copyFormData.value,
    sourceLayoutList.value,
    isLoadingSourceLayoutList.value,
    machineList.value,
    executeMachineList
  )
);

// 操作权限
const handlePermission = (permission: PermissionType) => {
  const permissionAction: PermissionActionType = {
    copy: () => (openModal(i18nt('copyLayout')), executeSourceLayoutList())
  };
  if (permissionAction[permission]) permissionAction[permission]();
};
</script>

<template>
  <div id="equipment-layout-manage">
    <base-curd
      ref="curdRef"
      :query-form-params="queryFormParams"
      :query-form-schemas="queryFormSchemas"
      :form-params="formParams"
      :form-schemas="formSchemas"
      :columns="tableColumns"
      :create-api="EquipmentLayoutManageApis.createEquipmentLayoutApi"
      :read-api="EquipmentLayoutManageApis.getEquipmentLayoutListApi"
      :edit-detail-api="EquipmentLayoutManageApis.getEquipmentLayoutDetailApi"
      :delete-api="EquipmentLayoutManageApis.deleteEquipmentLayoutApi"
      modal-title="equipmentLayout"
      @add-before="queryAllSelectList"
      @edit-before="queryAllSelectList"
      @handle="handlePermission"
    />
    <base-modal
      :loading="isLoadingCopyLayout"
      :show="showModal"
      :title="modalTitle"
      @close="closeModal"
      @after-leave="(machineList = []), resetField()"
      @negative-click="closeModal"
      @positive-click="handleCopy"
    >
      <base-form ref="formRef" v-model="copyFormData" layout="dialog" :schemas="copyFormSchemas" />
    </base-modal>
  </div>
</template>
