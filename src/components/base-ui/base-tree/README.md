# useTree Hooks

## Return

| Name                   | Type                 | Default     | Description                        |
| ---------------------- | -------------------- | ----------- | ---------------------------------- |
| searchText             | `Ref<string>`        | `undefined` | 搜索文字                           |
| halfSelectedList       | `Ref<T[]>`           | `undefined` | 半选列表                           |
| checkAllList           | `Ref<T[]>`           | `undefined` | 全选列表                           |
| updateHalfSelectedList | `(val: T[]) => T[]`  | `undefined` | 更新半选列表                       |
| updateCheckAllList     | `(val: T[]) => T[]`  | `undefined` | 更新全选列表                       |
| handleCheck            | `(keys: T[]) => T[]` | `undefined` | 节点勾选项发生变化时的回调函数     |
| handleIndeterminate    | `(keys: T[]) => T[]` | `undefined` | 节点部分勾选项发生变化时的回调函数 |
| clearCheckedList       | `() => void`         | `undefined` | 清空列表                           |
