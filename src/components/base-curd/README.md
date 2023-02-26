# base-curd

统一表单+表格，满足大部分业务场景

## base-curd Props

| Name                          | Type                                 | Default     | Description                                                    |
| ----------------------------- | ------------------------------------ | ----------- | -------------------------------------------------------------- |
| createApi                     | `string`                             | `undefined` | 新增 Api，不传触发 emit('handle', '\*') 进行自定义             |
| updateApi                     | `string`                             | `undefined` | 更新 Api，不传触发 emit('handle', '\*') 进行自定义             |
| readApi                       | `string`                             | `undefined` | 查询 Api，不传触发 emit('handle', '\*') 进行自定义             |
| editDetailApi                 | `string`                             | `undefined` | 获取编辑数据详情 Api，不传触发 emit('handle', '\*') 进行自定义 |
| deleteApi                     | `string`                             | `undefined` | 删除 Api，不传触发 emit('handle', '\*') 进行自定义             |
| exportApi                     | `string`                             | `undefined` | 导出数据 Api，不传触发 emit('handle', '\*') 进行自定义         |
| downloadApi                   | `string`                             | `undefined` | 下载接口 Api，不传触发 emit('handle', '\*') 进行自定义         |
| importApi                     | `string`                             | `undefined` | 导入接口 Api，不传触发 emit('handle', '\*') 进行自定义         |
| showPagination                | `boolean`                            | `true`      | 是否显示分页                                                   |
| queryFormParams               | `any`                                | `undefined` | 查询表单参数                                                   |
| queryFormSchemas              | `FormSchemaType`                     | `[]`        | 查询表单 Scheme                                                |
| queryShallowRef               | `boolean`                            | `true`      | 查询结果是否为 shallowRef 类型数据                             |
| formParams                    | `any`                                | `undefined` | 操作表单参数                                                   |
| formSchemas                   | `FormSchemaType`                     | `[]`        | 操作表单 Scheme                                                |
| columns                       | `DataTableColumns<any>`              | `[]`        | 需要展示的列                                                   |
| tableProps                    | `DataTableProps`                     | `undefined` | Table Props                                                    |
| refactorFormQueryParams       | `(data: any) => object \| undefined` | `undefined` | 重构查询表单参数函数                                           |
| refactorFormEditParams        | `(data: any) => object \| undefined` | `undefined` | 重构编辑表单参数函数                                           |
| refactorFormSubmitParams      | `(data: any) => object \| undefined` | `undefined` | 重构新增 or 编辑表单提交参数函数                               |
| submitValidate                | `() => void`                         | `undefined` | 提交前验证                                                     |
| queryFormRowLimitNumber       | `number`                             | `undefined` | 查询表单元素超出限制（展开收起）                               |
| formRowLimitNumber            | `number`                             | `undefined` | 表单元素超出限制（展开收起）                                   |
| modalTitle                    | `string`                             | `undefined` | 模态框标题                                                     |
| refactorTableData             | `(data: any) => any[]`          | `undefined` | 重构表格数据                                                   |
| paramsSerializerQuery         | `boolean`                            | `undefined` | Axios 查询列表参数序列化                                       |
| ignoreQueryFormPermissionList | `PermissionType[]`                   | `[]`        | 忽略查询表单权限按钮显示                                       |
| ignoreFormPermissionList      | `PermissionType[]`                   | `[]`        | 忽略表单权限按钮显示                                           |
| ignorePermissionActions       | `PermissionType[]`                   | `true`      | 忽略权限按钮内置操作，触发`handle`事件自定义处理               |
| queryFormPermissionDisable    | `PermissionDisableType`              | `undefined` | 查询表单按钮无效条件                                           |
| formPermissionDisable         | `PermissionDisableType`              | `undefined` | 表单按钮无效条件                                               |
| permissionLoadingProps        | `PermissionCustomTypeLoading`        | `undefined` | 自定义权限按钮 loading                                         |

## base-curd emit

| Name         | Type                         | Description        |
| ------------ | ---------------------------- | ------------------ |
| handle       | `emit('handle', permission)` | 权限按钮操作       |
| add-before   | `void`                       | 新增前回调         |
| add-after    | `void`                       | 新增后回调         |
| edit-before  | `void`                       | 获取编辑数据前回调 |
| edit-after   | `void`                       | 获取编辑数据后回调 |
| modal-closed | `void`                       | Modal 关闭后回调   |

## base-curd defineExpose

| Name               | Type                                                                                                         | Description                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| initQueryFormData  | `Ref<any>`                                                                                                   | 查询表单数据                                                          |
| queryFormData      | `any`                                                                                                        | 查询表单参数 + 分页数据                                               |
| formData           | `Ref<any>`                                                                                                   | 编辑表单数据                                                          |
| isLoadingQuery     | `Ref<boolean>`                                                                                               | 列表 loading                                                          |
| isEditMode         | `Ref<boolean>`                                                                                               | 是否编辑模式                                                          |
| sourceTableData    | `tableData: Ref<L \| undefined> \|\| shallowRef<L \| undefined>`                                             | 原始表格数据                                                          |
| tableData          | `tableData: Ref<L \| undefined> \|\| shallowRef<L \| undefined>`                                             | 表格数据 \| 重构后表格数据                                            |
| currentEditData    | `Ref<unknown> \| undefined`                                                                                  | 当前编辑数据                                                          |
| tableRef           | `Ref<{selectedKeysList: any; selectedRowsList: any[]; queryParams: any; clearChecked: () => void;} \| null>` | table 模板应用 <已选择 key 列表，已选择 row 列表，请求参数，清空选择> |
| handleAdd          | `() => void`                                                                                                 | 新增按钮操作，场景：<安装包上传>                                      |
| openEditModal      | `(rowData?: unknown) => Promise<void>`                                                                       | 打开编辑弹框，场景：<标题编辑>                                        |
| handleReset        | `() => void`                                                                                                 | 重置表单                                                              |
| handleResetPage    | `() => void`                                                                                                 | 重置表格分页                                                          |
| handleSearch       | `() => void`                                                                                                 | 查询执行函数（跳转首页，清空选择项）                                  |
| executeQueryList   | `() => Promise<void>`                                                                                        | 查询执行函数                                                          |
| executeQuery       | `ExecuteFunctionType`                                                                                        | 原始查询执行函数                                                      |
| openEditModalEntry | `EditModalEntry`                                                                                             | 编辑表单入口                                                          |

## base-curd slots

| Name         | Description  |
| ------------ | ------------ |
| table-prefix | `表格前缀`   |
| table-center | `表格中心`   |
| table-suffix | `表格后缀`   |
| modal-header | `模态框头部` |
| modal-prefix | `模态框前缀` |
| modal-suffix | `模态框后缀` |
| modal-footer | `模态框底部` |
