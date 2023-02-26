<script setup lang="ts">
import type { DatePickerProps } from 'naive-ui';
import type { DatePickerType } from 'naive-ui/es/date-picker/src/config';
import type { DefaultTime } from 'naive-ui/es/date-picker/src/interface';

interface PropsType {
  componentProps: DatePickerProps;
}

type PickerDefaultTimeType = {
  [K in DatePickerType]: DefaultTime;
};

type PickerValueFormateType = {
  [K in DatePickerType]: string;
};

const slots = useSlots();
const { componentProps } = defineProps<PropsType>();

// 选择器默认值
const defaultTime = computed(() => {
  const types: Partial<PickerDefaultTimeType> = {
    date: 'undefined',
    datetimerange: ['00:00:00', '23:59:59']
  };
  return types[componentProps.type ?? 'date'];
});

// valueFormat
const valueFormat = computed(() => {
  const types: Partial<PickerValueFormateType> = {
    date: 'yyyy-MM-dd',
    datetimerange: 'yyyy-MM-dd HH:mm:ss'
  };
  return types[componentProps.type ?? 'date'];
});
</script>

<template>
  <n-date-picker :default-time="defaultTime" :value-format="valueFormat" clearable>
    <template v-for="slot in Object.keys(slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </n-date-picker>
</template>
