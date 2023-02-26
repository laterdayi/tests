# base-table

## base-table props

| Name             | Type                            | Default     | Description    |
| ---------------- | ------------------------------- | ----------- | -------------- |
| columns          | `DataTableColumns<any>`         | `undefined` | 需要展示的列   |
| containerClass   | `string`                        | `---`       | 顶层容器 class |

## base-table defineExpose

| Name             | Type                          | Description        |
| ---------------- | ----------------------------- | ------------------ |
| tableRef         | `Ref<(DataTableInst \| null>` | DataTable 模板引用 |
| selectedKeysList | `Ref<(string \| number)[]>`   | 已选择 keys 列表   |
| selectedRowsList | `Ref<object[]> \| undefined`  | 已选择 row 列表    |
| clearChecked     | `() => void`                  | 清空多选           |

## base-table slots

| Name   | Description |
| ------ | ----------- |
| header | 表格头部    |
| center | 表格中心    |

# useTable Hooks

## Params

```javascript
useForm(api, {
  // 重构查询表单参数
  refactorFormQueryParams,
  // 查询表单参数
  queryFormParams,
  // 查询结果是否为 shallowRef 类型数据
  queryShallowRef,
  // 重构表格返回数据
  refactorTableData,
  // Axios 查询列表参数序列化
  paramsSerializerQuery,
  // table 模板引用
  tableRef
});
```

## Return

| Name               | Type                                                                                          | Description                                    |
| ------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| handleClearSorter  | `() => void`                                                                                  | 清除列表排序和对应查询参数 `sortName` `sorter` |
| handleSorterChange | `(options: DataTableSortState \| null) => void`                                               | 排序回调函数                                   |
| sourceTableData    | `tableData: Ref<L \| undefined> \|\| shallowRef<L \| undefined>`                              | 原始表格数据                                   |
| tableData          | `tableData: Ref<L \| undefined> \|\| shallowRef<L \| undefined>`                              | 表格数据 \| 重构后表格数据                     |
| isLoadingQuery     | `Ref<boolean>`                                                                                | 列表查询 loading                               |
| total              | `ComputedRef<number \| undefined>`                                                            | 列表 total                                     |
| pagination         | `Ref<UsePaginationProps>`                                                                     | Pagination props                               |
| response           | `ShallowRef<ResponseDataType<any> \| undefined> \|\| Ref<ResponseDataType<any> \| undefined>` | 列表 Response Data                             |
| error              | `ShallowRef<ResponseDataType<any> \| undefined> \|\| Ref<ResponseDataType<any> \| undefined>` | 列表 Response Error                            |
| queryFormData      | `any`                                                                                         | 表单查询参数 （表单参数、分页、排序...）       |
| pageParams         | `Ref<PaginationType>`                                                                         | 分页、排序参数                                 |
| executeQuery       | `ExecuteFunctionType`                                                                         | 原始查询执行函数                               |
| executeQueryList   | `() => Promise<void>`                                                                         | 查询执行函数                                   |
| handleResetPage    | `() => void`                                                                                  | 重置表格分页                                   |

# useTableSelection Hooks

## Params

```javascript
// api：请求接口地址
useTableSelection(keyField: string);
```

## Return

| Name                | Type                                                      | Description                             |
| ------------------- | --------------------------------------------------------- | --------------------------------------- |
| selectedKeysList    | `Ref<(string \| number)[]>`                               | 选中数据 key 列表                       |
| selectedRowsList    | `selectedRowsList: Ref<object[]>`                         | 选中数据列表                            |
| rowKey              | `(row: RowData) => any`                                   | table row key                           |
| clearChecked        | `() => void`                                              | 清空多选                                |
| handleCheckedChange | `(keys: (string \| number)[], rows: object[]) => void` | checked-row-keys 值改变时触发的回调函数 |
