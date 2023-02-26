<script lang="ts">
import BaseInput from '../base-input/base-input.vue';
import BaseSelect from '../base-select/base-select.vue';
import BaseDatePicker from '../base-date-picker/base-date-picker.vue';
import BaseSwitch from '../base-switch/base-switch.vue';
import BaseInputNumber from '../base-input-number/base-input-number.vue';
import BaseTreeSelect from '../base-tree-select/base-tree-select.vue';
import BaseUpload from '../base-upload/base-upload.vue';
import BaseTransfer from '../base-transfer/base-transfer.vue';
import BaseTimePicker from '../base-time-picker/base-time-picker.vue';
import BaseRadio from '../base-radio/base-radio.vue';
import BaseCascader from '../base-cascader/base-cascader.vue';
import BaseColorPicker from '../base-color-picker/base-color-picker.vue';
import BaseSlider from '../base-slider/base-slider.vue';

import type { FormInst } from 'naive-ui';

interface PropsType {
  // 表单类型
  type?: FormType;
  // v-model
  modelValue: any;
  // json-schema
  schemas: FormSchemaType;
  // label列宽
  labelWidth?: number;
  // 标签的文本对齐方式
  labelAlign?: 'left' | 'right';
  // 行内表单
  inline?: boolean;
  // label位置
  labelPlacement?: 'left' | 'top';
  // 元素超出限制（展开收起）
  rowLimitNumber?: number;
  // 元素超出限制（grid布局）
  rowLayoutLimitNumber?: number;
  // 禁用
  disabled?: boolean;
  // 布局方式
  layout?: 'base' | 'page' | 'dialog';
}

export default {
  components: {
    'base-input-number': BaseInputNumber,
    'base-input': BaseInput,
    'base-select': BaseSelect,
    'base-date-picker': BaseDatePicker,
    'base-switch': BaseSwitch,
    'base-tree-select': BaseTreeSelect,
    'base-upload': BaseUpload,
    'base-transfer': BaseTransfer,
    'base-time-picker': BaseTimePicker,
    'base-radio': BaseRadio,
    'base-cascader': BaseCascader,
    'base-color-picker': BaseColorPicker,
    'base-slider': BaseSlider
  }
};
</script>

<script setup lang="ts">
const {
  layout = 'page',
  labelWidth = undefined,
  labelAlign = 'right',
  inline,
  type,
  labelPlacement = 'left',
  modelValue,
  schemas,
  rowLimitNumber = 3,
  rowLayoutLimitNumber = 4
} = defineProps<PropsType>();

// 是否显示展开项
const formShowExpand = ref<boolean>();
const formInline = ref<boolean>();
// 是否展开
const isExpand = ref(false);

// 表单预设
watch(
  () => layout,
  val => {
    formShowExpand.value = val === 'page';
    formInline.value = inline || val === 'page';
  },
  { immediate: true }
);

// json-schema
const formSchemas = computed<FormSchemaType>(() =>
  formShowExpand.value ? (isExpand.value ? schemas : schemas.slice(0, rowLimitNumber)) : schemas
);

const formModel = computed(() => modelValue);

const baseFormRef = ref<FormInst | null>(null);

// 获取自定义model-value参数，默认：value
const getModelValue = computed(() => {
  return (item: BaseForm.Schema.Item) =>
    item.type !== 'custom-node' && item.type !== 'custom-form-item' ? item.modelValue ?? 'value' : 'value';
});

defineExpose({ baseFormRef });
</script>

<template>
  <n-form
    ref="baseFormRef"
    :inline="formInline"
    :model="formModel"
    require-mark-placement="left"
    :label-align="labelAlign"
    :label-width="labelWidth ?? 120"
    :label-placement="labelPlacement"
    :show-feedback="layout !== 'page'"
    v-bind="$attrs"
  >
    <!-- 表单区域 -->
    <div
      class="form-area"
      :class="[
        // 页面表单
        { 'flex flex-wrap gap-y-16px mr': layout === 'page' },
        { 'flex-1': layout === 'page' && schemas?.length > rowLimitNumber },
        // 弹框表单
        { 'grid grid-cols-2 gap-x-8': layout === 'dialog' && schemas.length > rowLayoutLimitNumber },
        { 'w-full': !formShowExpand }
      ]"
    >
      <template v-for="(item, index) in formSchemas" :key="index">
        <template v-if="item">
          <!-- base - *** -->
          <n-form-item
            v-if="item.type !== 'custom-node' && item.type !== 'custom-form-item'"
            :path="item.model ?? item?.formItemProps?.path"
            v-bind="item.formItemProps"
            :class="item.formItemClass"
            :label="item.formItemProps?.label"
          >
            <!-- v-model -->
            <component
              :is="`base-${item.type}`"
              v-if="item.model"
              v-model:[getModelValue(item)]="formModel[item.model]"
              :component-props="{
                ...unref(item.componentProps as any),
                // 预设placeholder
                label: (item.formItemProps?.label)
              }"
              :disabled="disabled"
              v-bind="unref(item.componentProps as any)"
              :class="[{ 'w-full!': layout === 'dialog' }, item.class]"
              :form-type="type"
            >
              <template v-for="slot in item.slots" #[slot.name] :key="slot.name">
                <RenderSlot :render-slot="slot" />
              </template>
            </component>
            <!-- 非v-model -->
            <component
              :is="`base-${item.type}`"
              v-else
              :disabled="disabled"
              :component-props="{
                ...unref(item.componentProps as any),
                // 预设placeholder
                label: (item.formItemProps?.label)
              }"
              v-bind="unref(item.componentProps as any)"
              :form-type="type"
              :class="[{ 'w-full!': layout === 'dialog' }, item.class]"
            >
              <template v-for="slot in item.slots" #[slot.name] :key="slot.name">
                <RenderSlot :render-slot="slot" />
              </template>
            </component>
          </n-form-item>
          <!-- 自定义组件 -->
          <n-form-item
            v-else-if="item.type === 'custom-form-item'"
            v-bind="item.formItemProps"
            :class="item.formItemClass"
            :label="item.formItemProps?.label"
            :path="item.model ?? item?.formItemProps?.path"
          >
            <RenderSlot :render-slot="item" />
          </n-form-item>
          <div v-else-if="item.type === 'custom-node'" :class="item.class">
            <RenderSlot :render-slot="item" />
          </div>
        </template>
      </template>
    </div>
    <!-- 控制区域 -->
    <div class="flex mt-2px">
      <slot name="header-action" :form-ref="baseFormRef" />
      <base-button
        v-if="formShowExpand && schemas?.length > rowLimitNumber"
        :button-name="isExpand ? 'baseForm.putAway' : 'baseForm.expand'"
        quaternary
        class="ml-12px"
        @click="isExpand = !isExpand"
      >
        {{ $t(isExpand ? 'baseForm.putAway' : 'baseForm.expand') }}
        <base-icon class="ml-5px" icon="i-carbon:chevron-down" :rotate="isExpand ? '180' : '0'" />
      </base-button>
    </div>
  </n-form>
  <slot name="action" />
</template>
