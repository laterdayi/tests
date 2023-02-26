import type { MaybeComputedRef } from '@vueuse/core';
import type { DataTableInst, PaginationProps } from 'naive-ui';
import type { ColumnKey } from 'naive-ui/es/data-table/src/interface';

// table 分页
export type UsePaginationProps = Omit<PaginationProps, 'page' | 'pageSize' | 'itemCount'> & {
  page: MaybeComputedRef<number>;
  pageSize: MaybeComputedRef<number>;
  itemCount: MaybeComputedRef<number | undefined>;
};

declare global {
  // 表格模板引用
  interface TableRefType<T> {
    selectedKeysList: (string | number)[];
    selectedRowsList: T[];
    queryParams: QueryParamsType;
    clearChecked: () => void;
    tableRef: DataTableInst | null;
  }

  // 分页
  interface PaginationType {
    page?: number;
    size?: number;
    sortName?: ColumnKey;
    sort?: SortOrder;
  }

  // 查询表单参数
  type QueryParamsType<T = any> = T & PaginationType;
}

export {};
