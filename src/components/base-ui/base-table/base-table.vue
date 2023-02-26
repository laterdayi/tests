<script lang="ts">
export default { inheritAttrs: false };
</script>
<script setup lang="ts">
import type { DataTableColumns, DataTableInst } from 'naive-ui';
import type { TableColumn } from 'naive-ui/es/data-table/src/interface';
export interface PropsType {
  columns: DataTableColumns<any>;
  // 顶层容器class
  containerClass?: string;
}

const props = withDefaults(defineProps<PropsType>(), {
  containerClass: undefined
});

const slots = useSlots();

const useExtendColumn = (columns: DataTableColumns<any>) => {
  const tableColumns = [];
  for (let i = 0; i < columns.length; i++) {
    const item = columns[i];
    if (item.type === 'selection') {
      tableColumns.push({ ...item, width: 45, align: 'center' } as TableColumn);
    } else {
      tableColumns.push({
        align: 'center',
        resizable: true,
        ellipsis: { tooltip: { scrollable: true, contentStyle: { maxWidth: TOOLTIP_WIDTH } } },
        minWidth: 80,
        ...item
      } as TableColumn);
    }
  }
  return tableColumns;
};

const tableColumns = useExtendColumn(props.columns);

// 多选
const { selectedKeysList, clearChecked, selectedRowsList, handleCheckedChange, rowKey } = useTableSelection('id');

const tableRef = ref<DataTableInst | null>(null);

defineExpose({ selectedRowsList, selectedKeysList, clearChecked, tableRef });
</script>

<template>
  <div class="w-full base-table" :class="[props.containerClass]">
    <!-- 头部 -->
    <div v-if="slots.header" class="base-table-header flex justify-between">
      <slot name="header" />
    </div>
    <div v-if="slots.center" class="my">
      <slot name="center" />
    </div>
    <!-- 主体 -->
    <n-data-table
      ref="tableRef"
      row-class-name="table-row-class"
      :columns="tableColumns"
      :row-key="rowKey"
      size="small"
      :single-line="false"
      v-bind="$attrs"
      :checked-row-keys="selectedKeysList"
      class="base-table"
      @update:checked-row-keys="handleCheckedChange"
    >
      <template #empty> <empty-data /></template>
    </n-data-table>
  </div>
</template>
<style lang="less" scoped>
.base-table {
  &-header {
    margin: var(--margin) 0;
  }
}
</style>
