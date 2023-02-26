<script lang="ts">
import { CommonApis } from '@/service/apis/common/common';
import { EquipmentLayoutDetailApis } from '@/service/apis/testing/basic-config/equipment-layout-manage/equipment-layout-detail';

interface containerDataType {
  areaName: string;
  checked: boolean;
  description: string;
  height: number;
  id: string;
  image: string;
  isCheckUser: boolean;
  layoutName: string;
  status: number;
  type: number;
  usersId: string[];
  width: number;
}

export interface EquipmentListType {
  eqpId: string;
  eqpName: string;
  id: string;
  layoutId: string;
  width: number;
  height: number;
  left: number;
  top: number;
}

interface AddEquipmentType {
  eqpId: string;
  layoutId: string;
  height: number;
  top: number;
  left: number;
  width: number;
}

// 初始化表单
const initFormSchemas = (
  equipmentNumberList?: OptionsType[],
  isLoadingEquipmentNumberList?: boolean,
  containerData?: containerDataType,
  isEditMode?: boolean
): FormSchemaType => [
  {
    type: 'select',
    model: 'eqpId',
    formItemProps: { label: i18nt('equipmentNumber'), rule: useRules('change', 'equipmentNumber') },
    componentProps: {
      disabled: isEditMode,
      loading: isLoadingEquipmentNumberList,
      options: equipmentNumberList,
      labelField: 'name',
      valueField: 'id'
    }
  },
  {
    type: 'input-number',
    model: 'left',
    formItemProps: {
      label: i18nt('marginLeft'),
      rule: [
        useRules('input', 'onlyPositiveIntZeroRule', true, 'marginLeft'),
        useRuleNumberSize(0, (containerData?.width ?? 0) - 200)
      ]
    },
    componentProps: { min: 0 }
  },
  {
    type: 'input-number',
    model: 'top',
    formItemProps: {
      label: i18nt('marginTop'),
      rule: [
        useRules('input', 'onlyPositiveIntZeroRule', true, 'marginTop'),
        useRuleNumberSize(0, (containerData?.height ?? 0) - 200)
      ]
    },
    componentProps: { min: 0 }
  },
  {
    type: 'input-number',
    model: 'width',
    formItemProps: {
      label: i18nt('width'),
      rule: [useRules('input', 'onlyPositiveIntRule', true, 'width'), useRuleNumberSize(0, 200)]
    }
  },
  {
    type: 'input-number',
    model: 'height',
    formItemProps: {
      label: i18nt('height'),
      rule: [useRules('input', 'onlyPositiveIntRule', true, 'height'), useRuleNumberSize(0, 200)]
    }
  }
];
</script>
<script setup lang="ts">
const route = useRoute();
// 获取设备列表
const { data: equipmentList, execute: executeGetEquipmentList } = useAxiosGet<EquipmentListType[]>(
  EquipmentLayoutDetailApis.getEquipmentListApi,
  { LayoutId: route.params.id }
);

// 获取容器详情
const {
  data: containerData,
  execute: executeGetContainerData,
  isLoading: isLoadingContainerData
} = useAxiosGet<containerDataType>(EquipmentLayoutDetailApis.getContainerDataApi, { id: route.params.id });

// 查询数据集合
const queryAllList = () => (executeGetEquipmentList(), executeGetContainerData());

tryOnMounted(queryAllList);

const { showModal, openModal, modalTitle, closeModal } = useModal();

// 表单模型
const { formData, validate, formRef, resetField, updateField } = useForm<Nullable<AddEquipmentType>>({
  eqpId: null,
  layoutId: null,
  height: null,
  top: null,
  left: null,
  width: null
});

// -------------------------------------------------------------------------------------------- > 新增设备

// 获取设备编号列表
const {
  data: equipmentNumberList,
  isLoading: isLoadingEquipmentNumberList,
  execute: executeGetEquipmentNumberList
} = useAxiosGet<OptionsType[]>(CommonApis.getEquipmentNumberIdListApi);

// -------------------------------------------------------------------------------------------- > 拖拽
const _equipmentList = ref<EquipmentListType[] | undefined>([]);

watch(
  () => equipmentList.value,
  newVal => {
    _equipmentList.value = cloneDeep(newVal);
  }
);

// 删除设备
const handleDelete = (item: EquipmentListType) => {
  const _dialog = $dialog.warning({
    content: i18nt('permission-button.deleteTooltip'),
    onPositiveClick: async () => {
      try {
        _dialog.loading = true;
        const { error } = await useAxiosPost(EquipmentLayoutDetailApis.deleteEquipmentApi, { ids: [item.id] }, __, {
          immediate: true
        });
        !error.value && queryAllList();
        return !error.value;
      } catch (error) {
        console.log('删除设备异常', error);
      } finally {
        _dialog.loading = false;
      }
    }
  });
};

// 更新设备
const handleSave = async () => {
  try {
    const { error } = await useAxiosPost(
      EquipmentLayoutDetailApis.updateMultiEquipmentApi,
      {
        LayoutId: route.params.id,
        updateEqpList: _equipmentList.value
      },
      __,
      { immediate: true }
    );
    !error.value && queryAllList();
  } catch (error) {
    console.log(error);
  }
};

// -------------------------------------------------------------------------------------------- > 修改
const posX = ref(0);
const posY = ref(0);
const options = [{ label: i18nt('modify'), key: 'modify' }];
const showDropdown = ref(false);
const currentData = ref<EquipmentListType>();
// 是否编辑模式
const isEditMode = ref(false);
const handleContextMenu = (e: MouseEvent, item: EquipmentListType) => {
  e.preventDefault();
  showDropdown.value = false;
  nextTick().then(() => {
    showDropdown.value = true;
    currentData.value = item;
    posX.value = e.clientX;
    posY.value = e.clientY;
  });
};

const handleSelect = (value: string) => {
  openModal(i18nt('modifyEquipment'));
  isEditMode.value = true;
  executeGetEquipmentNumberList();
  if (currentData.value) updateField(currentData.value);
};

const { isLoading: isLoadingHandleEquipment, execute: executeHandleEquipment } = useAxiosPost();

// 添加设备 | 更新设备
const handleEquipment = async () => {
  try {
    await validate();
    const { error } = await executeHandleEquipment(
      isEditMode.value ? EquipmentLayoutDetailApis.updateEquipmentApi : EquipmentLayoutDetailApis.addEquipmentApi,
      {
        data: { ...formData.value, layoutId: route.params.id }
      }
    );
    !error.value && (closeModal(), queryAllList());
  } catch (error) {
    console.log(error);
  }
};
const formSchemas = computed(() =>
  initFormSchemas(equipmentNumberList.value, isLoadingEquipmentNumberList.value, containerData.value, isEditMode.value)
);

// mouseup
const onMouseup = ({ x, y, index }: { x: number; y: number; index: number }) => {
  if (!_equipmentList.value) return;
  _equipmentList.value[index].left = x;
  _equipmentList.value[index].top = y;
};
</script>

<template>
  <div id="equipment-layout-detail">
    <base-card>
      <section class="mb flex items-center justify-between">
        <base-space>
          <base-button
            button-name="add"
            type="primary"
            @click="openModal($t('addEquipment')), executeGetEquipmentNumberList(), (isEditMode = false)"
          >
            {{ $t('add') }}
          </base-button>
          <base-button button-name="add" type="primary" @click="_equipmentList = cloneDeep(equipmentList)">
            {{ $t('reset') }}
          </base-button>
          <base-button button-name="add" type="primary" @click="handleSave">{{ $t('save') }}</base-button>
        </base-space>
        <n-alert type="default">
          <template #icon> <base-icon icon="i-carbon:warning" /> </template>
          {{ $t('deleteEquipmentTips') }}
        </n-alert>
      </section>
      <base-spin :show="isLoadingContainerData">
        <n-scrollbar x-scrollable trigger="none">
          <div
            class="relative overflow-hidden border-solid border-1 border-gray-400 whitespace-nowrap"
            :style="{
              background: 'url(' + useGetImageUrl(containerData?.image) + ') no-repeat',
              backgroundSize: '100% 100%',
              width: `${containerData?.width}px`,
              height: `${containerData?.height}px`
            }"
          >
            <div
              v-for="(item, index) in _equipmentList"
              id="drag-item"
              :key="item.id"
              v-draggable="{ onMouseup, index }"
              select-none
              :style="{
                width: `${item.width}px`,
                height: `${item.height}px`,
                left: `${item.left}px`,
                top: `${item.top}px`
              }"
              class="select-none border-1 border-solid border-gray-400 absolute flex-center font-bold"
              @contextmenu="e => handleContextMenu(e, item)"
              @dblclick="handleDelete(item)"
            >
              <div>{{ item.eqpName }}</div>
            </div>
          </div>
        </n-scrollbar>
      </base-spin>
    </base-card>
    <base-dropdown
      placement="bottom-start"
      trigger="manual"
      :on-clickoutside="() => (showDropdown = false)"
      :x="posX"
      :y="posY"
      :options="options"
      :show="showDropdown"
      @select="handleSelect"
    />
    <base-modal
      :loading="isLoadingHandleEquipment"
      :show="showModal"
      :title="modalTitle"
      @close="closeModal"
      @after-leave="resetField"
      @negative-click="closeModal"
      @positive-click="handleEquipment"
    >
      <base-form ref="formRef" v-model="formData" layout="dialog" :schemas="formSchemas" />
    </base-modal>
  </div>
</template>
