# permission-button

## permission-button Props

| Name                    | Type                          | Default | Description                                      |
| ----------------------- | ----------------------------- | ------- | ------------------------------------------------ |
| form                    | `boolean`                     | `---`   | 是否为查询表单                                   |
| selectLength            | `number`                      | `---`   | 当前选中列表项个数                               |
| ignorePermissionList    | `PermissionType[]`            | `---`   | 忽略权限按钮显示                                 |
| ignorePermissionActions | `PermissionType[]`            | `---`   | 忽略权限按钮内置操作，触发`handle`事件自定义处理 |
| disableCondition        | `PermissionDisableType`       | `---`   | 按钮无效条件                                     |
| \*\*\*loading           | `boolean`                     | `---`   | 按钮 loading                                     |
| loadingProps            | `PermissionCustomTypeLoading` | `---`   | 自定义权限按钮 loading                           |
| spaceProps              | `SpaceProps`                  | `---`   | Space 组件 Props                                 |

## permission-button emit

| Name   | Type                                                                 | Description  |
| ------ | -------------------------------------------------------------------- | ------------ |
| handle | `(permission: PermissionType, resolve?: AsyncEmitResolveType)=>void` | 按钮操作函数 |
