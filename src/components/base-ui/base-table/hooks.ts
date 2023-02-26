import { pageSizeOption } from '@/layout/aside/layout-setting/constants';
import type { DataTableSortState } from 'naive-ui/es/data-table';
import type { RowData } from 'naive-ui/es/data-table/src/interface';
import type { UsePaginationProps } from './type';
const appStore = useAppStore();

/**
 * @description: use-table
 * @return {*} 排序函数，列表数据，是否loading，总数，分页，response，查询数据，分页参数，查询函数
 */
export const useTable = <L>(
  api: string | undefined,
  {
    refactorFormQueryParams,
    queryFormParams,
    queryShallowRef,
    refactorTableData,
    paramsSerializerQuery,
    tableRef,
    remote = true
  }: {
    queryFormParams?: Ref<any>;
    refactorFormQueryParams?: (data: any) => object | undefined;
    queryShallowRef?: boolean;
    refactorTableData?: (data: L) => L[];
    paramsSerializerQuery?: boolean;
    tableRef?: Ref<TableRefType<L> | null>;
    remote?: boolean;
  } = {}
) => {
  const pageParams = ref<PaginationType>({
    page: 1,
    size: appStore.pageSize,
    sortName: undefined,
    sort: undefined
  });

  // 监听appStore变化
  watch(
    () => appStore.pageSize,
    val => {
      pageParams.value.size = val;
      remote && executeQueryList();
    }
  );

  const queryFormData = computed(() => ({
    ...queryFormParams?.value,
    ...pageParams.value
  }));

  // 请求列表
  const sourceTableData = queryShallowRef ? shallowRef<L>() : ref<L>();
  const tableData = queryShallowRef ? shallowRef<L>() : ref<L>();

  const {
    isLoading: isLoadingQuery,
    execute: executeQuery,
    response,
    error
  } = useAxiosGet<any>(api ?? '', __, __, { shallow: queryShallowRef });

  const executeQueryList = async () => {
    let params = { ...queryFormData.value };
    if (refactorFormQueryParams) params = refactorFormQueryParams?.(params) ?? params;
    const { data } = await executeQuery(__, {
      params: useOmitNilRequestParams(params),
      paramsSerializer: paramsSerializerQuery ? useParamsSerializer() : __
    });
    sourceTableData.value = data.value;
    let _taleData = data.value;
    if (refactorTableData) _taleData = refactorTableData?.(data.value);
    tableData.value = _taleData;
  };
  // 总数
  const total = computed(() => response?.value?.total);

  // 分页
  const pagination = ref<UsePaginationProps>({
    page: computed(() => pageParams.value.page ?? 1),
    pageSize: computed(() => pageParams.value.size ?? 15),
    itemCount: total,
    showSizePicker: true,
    showQuickJumper: true,
    displayOrder: ['size-picker', 'pages', 'quick-jumper'],
    prefix: () => `${i18nt('baseTable.total')} ${total.value || 0} ${i18nt('baseTable.strip')}`,
    pageSizes: pageSizeOption.map((item: { label: string; value: number }) => {
      return {
        label: item.label,
        value: item.value
      };
    }),
    onChange: (page: number) => {
      pageParams.value.page = page;
      remote && executeQueryList();
    },
    onPageSizeChange: (pageSize: number) => {
      pageParams.value.size = pageSize;
      pageParams.value.page = 1;
      remote && executeQueryList();
    }
  });

  // 排序
  const handleSorterChange = (options: DataTableSortState | null) => {
    if (options) {
      pageParams.value.page = 1;
      pageParams.value.sortName = options.order !== false ? options.columnKey : __;
      pageParams.value.sort = options.order !== false ? options.order : __;
      executeQueryList();
    }
  };

  // 清除排序
  const handleClearSorter = () => {
    [pageParams.value.sortName, pageParams.value.sort] = [__, __];
    tableRef?.value?.tableRef?.clearSorter();
  };

  // 重置表格分页
  const handleResetPage = () => (pageParams.value.page = 1);

  return {
    handleResetPage,
    handleClearSorter,
    handleSorterChange,
    sourceTableData,
    tableData,
    isLoadingQuery,
    total,
    pagination,
    error,
    response,
    queryFormData,
    pageParams,
    executeQueryList,
    executeQuery
  };
};

/**
 *
 * @param keyField row-key：保持唯一
 */
export const useTableSelection = (keyField: string) => {
  // 选中数据key列表
  const selectedKeysList = ref<(string | number)[]>([]);

  // 选中数据列表
  const selectedRowsList = ref<object[]>([]);

  // row-key
  const rowKey = (row: RowData) => row[keyField];

  // checked-row-keys 值改变时触发的回调函数
  const handleCheckedChange = (keys: (string | number)[], rows: object[]) => {
    selectedKeysList.value = keys;
    selectedRowsList.value = rows;
  };
  // 清空多选
  const clearChecked = () => {
    selectedKeysList.value = [];
    selectedRowsList.value = [];
  };

  return {
    selectedKeysList,
    clearChecked,
    selectedRowsList,
    rowKey,
    handleCheckedChange
  };
};
