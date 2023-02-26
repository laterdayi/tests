// @unocss-include

import type { RenderSlotType } from '@/components/base-ui/base-form/type';
import type { AstrictFileType, UseUploadParamsType } from '@/components/base-ui/base-upload/hooks';
import { ButtonProps, FormItemProps, InputProps, NEllipsis, UploadProps } from 'naive-ui';
import type { TableBaseColumn, TableColumn } from 'naive-ui/es/data-table/src/interface';
import BaseTag from '@c/base-ui/base-tag/base-tag.vue';
import BaseSwitch from '@c/base-ui/base-switch/base-switch.vue';
import BaseButton from '@c/base-ui/base-button/base-button.vue';
import type { HTMLAttributes } from 'vue';
const appStore = useAppStore();

// -------------------------------------------------------------------------------------------- > Common

/**
 * @description: 渲染文本省略标签
 * @param {object} option
 * @param {string} key
 * @return {*}
 */
export const useRenderEllipsisLabel = ({
  option,
  key,
  contentProps
}: {
  option: TreeOption<any>;
  key: string;
  contentProps?: HTMLAttributes | null | undefined;
}) =>
  h(
    NEllipsis,
    { tooltip: { scrollable: true, contentStyle: { maxWidth: TOOLTIP_WIDTH } } },
    { default: () => h('span', { ...contentProps }, option[key]) }
  );

// -------------------------------------------------------------------------------------------- > Form

// 渲染表单状态项
export const useRenderFormSwitch = (
  key?: string,
  label?: string,
  { formItemClass }: { formItemClass?: string | string[] } = {}
): BaseForm.Schema.Item => ({
  type: 'switch',
  model: key ?? 'status',
  formItemProps: { label: i18nt(label ?? 'isValid') },
  componentProps: { checkedValue: OpenState.open, uncheckedValue: OpenState.close },
  class: 'w-min!',
  formItemClass
});

/**
 * @description: 渲染输入域
 * @param {*} BaseForm.Schema.Item
 * @return {*} BaseForm.Schema.Item
 */
export const useRenderFormTextarea = ({
  model = 'description',
  label = 'description',
  formItemProps,
  componentProps,
  maxlength = MAX_LENGTH_DESCRIPTION,
  extraParams
}: {
  model?: string;
  label?: string;
  maxlength?: number;
  formItemProps?: FormItemProps;
  componentProps?: InputProps & { replaceSpace?: boolean };
  extraParams?: Omit<
    BaseForm.Schema.FormItemSchemaType<'input'>,
    'type' | 'model' | 'formItemProps' | 'componentProps'
  >;
} = {}): BaseForm.Schema.Item => {
  return {
    type: 'input',
    model: model,
    formItemProps: {
      label: i18nt(label),
      ...formItemProps
    },
    componentProps: { type: 'textarea', maxlength, showCount: true, ...componentProps },
    ...extraParams
  };
};

/**
 * @description: 渲染上传
 * @param {*} BaseForm.Schema.Item
 * @return {*} BaseForm.Schema.Item
 */
export const useRenderFormUpload = ({
  model = 'filePath',
  label = 'filePath',
  rule,
  formItemProps,
  componentProps: extraComponentProps,
  useUploadParams,
  extraParams,
  slots
}: {
  model?: string;
  label?: string;
  formItemProps?: FormItemProps;
  componentProps?: UploadProps;
  useUploadParams?: UseUploadParamsType;
  rule?: AstrictFileType;
  extraParams?: Omit<BaseForm.Schema.FormItemSchemaType<'upload'>, 'type' | 'model'>;
  slots?: RenderSlotType[];
} = {}): BaseForm.Schema.Item => {
  const { fileList: _fileList, ...otherComponentProps } = extraComponentProps as UploadProps;
  // 上传
  const { beforeUpload, customRequest, fileList, onRemove, onFinish, handleUploadChange } = useUpload({
    model: model,
    astrictFileType: rule,
    ...useUploadParams,
    clearFileList: false,
    defaultFileList: _fileList ?? []
  });
  return {
    type: 'upload',
    model: model,
    formItemProps: { label: i18nt(label), ...formItemProps },
    componentProps: computed(() => ({
      shouldUseThumbnailUrl: () => true,
      fileList: fileList.value,
      onChange: handleUploadChange,
      accept: rule?.rule.toString(),
      onBeforeUpload: beforeUpload,
      customRequest: customRequest,
      onRemove: onRemove,
      onFinish: onFinish,
      ...otherComponentProps
    })),
    slots,
    ...extraParams
  };
};

// -------------------------------------------------------------------------------------------- > Table

/**
 * @description: 渲染表格固定列
 * @param {props} DataTableColumn  Props
 * @return {*}
 */
export const useRenderTableActionColumn = <T>(props: Omit<TableBaseColumn<T>, 'key'>): TableColumn<T> => ({
  title: i18nt('action'),
  key: 'action',
  fixed: 'right',
  width: TABLE_WIDTH_ACTION,
  ...props
});

/**
 * @description: 渲染表格固定列按钮
 * @param {ButtonProps} props Button Props
 * @param {string} content 翻译前文本
 * @return {*}
 */
export const useRenderTableFixedButton = (props: ButtonProps, content: string) =>
  h(
    BaseButton,
    {
      text: true,
      type: 'primary',
      buttonName: content,
      ...props
    },
    { default: () => i18nt(content) }
  );

/**
 * @description: 渲染表格可点击标题
 * @param {string} content 文本内容
 * @param {function} execute 点击事件
 * @param {boolean} translate 是否需要翻译
 * @return {*}
 */
export const useRenderTableTitleEdit = (content: string | number, execute: () => void, translate?: boolean) => {
  return h(
    'span',
    {
      class: ['cursor-pointer', `text-${appStore.themePrimary}`],
      onClick: () => {
        execute();
        useButtonClickRecord('edit');
      }
    },
    translate ? i18nt(content) : content
  );
};

/**
 * @description: 渲染表格状态列
 * @param {number} value
 * @return {*}
 */
export const useRenderTableSwitch = (value: boolean) => h(BaseSwitch, { value, disabled: true, size: 'small' });

/**
 * @description: 渲染表格 Switch
 * @param {string} key：model
 * @param {string} label：标签
 * @return {FormItem}
 */

/**
 * @description: 渲染表格单个 Tag
 * @param {string[]} data
 * @return {*}
 */
export const useRenderTableSingleTag = (type: string, content: string | number) =>
  h(BaseTag, { type, size: 'small' }, { default: () => content });

/**
 * @description: 渲染表格多个 Tag > ellipsis + render
 * @param {string} field 字段名称
 * @param {*} ellipsis 是否省略
 * @return {*}
 */
export const useRenderTableMultiTag = (field: string, ellipsis = false) => ({
  ellipsis: ellipsis ? { tooltip: { scrollable: true, contentStyle: { maxWidth: TOOLTIP_WIDTH } } } : false,
  render: (rowData: any) => useRenderTableTag(rowData[field], ellipsis)
});

/**
 * @description: 渲染表格多个 Tag > Vnode
 * @param {string} data
 * @return {VNode}
 */
export const useRenderTableTag = (data: string[], ellipsis = false) => {
  const result = data?.map(item =>
    h(
      BaseTag,
      { class: 'm-4px h-auto! p-8px! whitespace-normal!', type: 'primary', size: 'small' },
      { default: () => item }
    )
  );
  return ellipsis ? result : h('div', { class: 'text-left' }, result);
};

/**
 * @description: 渲染表格序号
 * @param {*} 行，行索引，分页对象
 * @return {*}
 */
export const useRenderTableIndex = <Q, T>(
  queryParams: ComputedRef<QueryParamsType<Q> | undefined> | Ref<QueryParamsType<Q> | undefined>
): TableColumn<T> => {
  return {
    title: i18nt('index'),
    key: 'index',
    align: 'center',
    width: TABLE_WIDTH_INDEX,
    render: (rowData: T, rowIndex: number) =>
      h('span', undefined, {
        default: () => rowIndex + 1 + ((queryParams?.value?.page ?? 1) - 1) * (queryParams?.value?.size ?? 10)
      })
  };
};

// -------------------------------------------------------------------------------------------- > Tree

/**
 * @description: 格式化树 - 翻译
 * @return {*}
 */
export const useFormatTreeTranslate = <T extends { [key: string]: any } = any>(
  list: T[] | undefined,
  field: string
): T[] => {
  if (!list?.length) return [];
  return list.map(item => {
    const _item: any = { ...item, children: useFormatTreeTranslate(item.children, field) };
    _item[`${field}`] = i18nt(item[field]);
    return _item;
  });
};
