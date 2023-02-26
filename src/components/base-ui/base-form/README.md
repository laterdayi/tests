# base-form

公用表单，Support:

- `input`
- `input-number`
- `switch`
- `select`
- `date-picker`
- `tree-select`
- `upload`
- `transfer`
- `time-picker`
- `time-picker`
- `radio`
- `cascader`
- `color-picker`
- `slider`
- `custom-form-item`：自定义 form item render 函数
- `custom-node`：自定义 render 节点函数

## base-form props

| Name                 | Type                           | Default     | Description               |
| -------------------- | ------------------------------ | ----------- | ------------------------- |
| type                 | `query \| edit`                | `undefined` | 表单类型                  |
| modelValue           | `any`                          | `undefined` | v-model                   |
| schemas              | `FormSchemaType`               | `[]`        | json-schema               |
| labelWidth           | `number`                       | `undefined` | label 列宽                |
| labelAlign           | `'left' \| 'right'`            | `undefined` | 标签的文本对齐方式        |
| inline               | `boolean`                      | `undefined` | 是否行内表单              |
| labelPlacement       | `boolean`                      | `undefined` | v-model                   |
| labelPlacement       | `'left' \| 'top'`              | `left`      | label 位置                |
| rowLimitNumber       | `number`                       | `3`         | 元素超出限制（展开收起）  |
| rowLayoutLimitNumber | `number`                       | `4`         | 元素超出限制（grid 布局） |
| layout               | `'base' \| 'page' \| 'dialog'` | `page`      | 布局方式                  |

## base-form defineExpose

| Name        | Type                                                                  | Description   |
| ----------- | --------------------------------------------------------------------- | ------------- |
| baseFormRef | `Ref<{validate: FormValidate;restoreValidation: () => void} \| null>` | form 模板引用 |

# useForm Hooks

## Params

| Name | Type | Default     | Description        |
| ---- | ---- | ----------- | ------------------ |
| data | `T`  | `undefined` | 非响应式初始化数据 |

## Return

| Name                  | Type                                                                                                                                                                                    | Description              |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| formData              | `Ref<T>`                                                                                                                                                                                | 响应式表单数据           |
| formRef               | `Ref<BaseFormRefType \| null>`                                                                                                                                                             | form 模板引用            |
| updateField           | `(data: T) => void`                                                                                                                                                                     | 更新表单数据             |
| restoreValidation     | `() => void \| undefined`                                                                                                                                                               | 重置表单项               |
| resetField            | `() => void`                                                                                                                                                                            | 重置表单项，并移出校验   |
| validate              | `(validateCallback?: ((errors?: FormValidationError[]) => void) \| undefined, shouldRuleBeApplied?: ((rule: FormItemRule) => boolean) \| undefined) => Promise<void \| undefined>` | 表单验证                 |
| useFilterSelectedData | `<T = any, Q = any>(selectedList?: T \| undefined, formData?: Q \| undefined) => Q`                                                                                                     | 过滤列表选择项提供给表单 |
