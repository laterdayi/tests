<script lang="ts">
import type { SpaceProps, UploadFileInfo } from 'naive-ui';
import type { Type } from 'naive-ui/es/button/src/interface';
// 默认权限按钮位置
export const PRESET_PERMISSION_BUTTON_POSITION = ['search', 'add', 'edit', 'delete', 'import', 'export', 'download'];
</script>

<script setup lang="ts">
interface PropsType extends PermissionTypeLoading {
  // 是否为查询表单
  form?: boolean;
  // 当前选中列表项个数
  selectLength?: number;
  // 忽略权限按钮显示
  ignorePermissionList?: PermissionType[];
  // 忽略权限按钮内置操作
  ignorePermissionActions?: PermissionType[];
  // 按钮无效条件
  disableCondition?: PermissionDisableType;
  // 删除api
  deleteApi?: string;
  // Space Props
  spaceProps?: SpaceProps;
  /*
   * https://github.com/vuejs/core/issues/4294
   * loading
   */
  searchLoading?: boolean;
  addLoading?: boolean;
  deleteLoading?: boolean;
  editLoading?: boolean;
  importLoading?: boolean;
  downloadLoading?: boolean;
  exportLoading?: boolean;
  loadingProps?: PermissionCustomTypeLoading;
}
const router = useRouter();
const props = defineProps<PropsType>();

const emit = defineEmits<{
  (e: 'handle' | string, permission: PermissionType, resolve?: AsyncEmitResolveType): void;
}>();

const importApi = inject('importApi', '');

// 权限列表
const permissions = router.currentRoute.value.meta.powers as string[];
// 图标
const buttonIcons: { [K in PermissionType]?: string } = {
  search: 'i-carbon:search',
  add: 'i-carbon:add',
  edit: 'i-carbon:edit',
  delete: 'i-carbon:trash-can',
  download: 'i-carbon:download',
  import: 'i-carbon:cloud-upload',
  export: 'i-carbon:cloud-download',
  reset: 'i-carbon:reset',
  permissionAssign: 'i-carbon:reset',
  resetPassword: 'i-carbon:reset',
  uploadApk: 'i-carbon:cloud-upload',
  scanCodeDownload: 'i-carbon:qr-code',
  generateQRcode: 'i-carbon:qr-code',
  executeNow: 'i-carbon:update-now',
  startTimer: 'i-carbon:alarm',
  collect: 'i-carbon:document-tasks',
  grant: 'i-carbon:arrow-up-right',
  boarding: 'i-carbon:arrow-up',
  disembark: 'i-carbon:arrow-down',
  maintain: 'i-carbon:tools',
  restitution: 'i-carbon:arrow-down-right',
  receive: 'i-carbon:down-to-bottom',
  externalRepairRestitution: 'i-carbon:arrows-horizontal',
  copy: 'i-carbon:copy',
  associateSetting: 'i-carbon:movement'
};

// 查询表单预设权限
const formActionPermissions: string[] = ['search'];
const buttons = computed(() => {
  const queryPermissions = [...intersection(permissions, formActionPermissions)];
  permissions.includes('search') && queryPermissions.push('reset');
  const result = props?.form ? queryPermissions : without(permissions, ...formActionPermissions);
  return without(result, ...(props.ignorePermissionList ?? []));
});

// 无效条件
const _buttonDisableCondition = (item: PermissionType) => {
  const state: PermissionDisableType = {
    edit: props?.selectLength !== 1,
    delete: props?.selectLength === 0,
    search: false,
    add: false,
    ...props.disableCondition
  };
  return state[item];
};

// 按钮主题配置
const buttonsPrimary: { [K in PermissionType]?: Type } = {
  delete: 'error'
};

// emit
const handleEmit = (permission: string) => {
  const permissionAction: PermissionActionType = {
    delete:
      !props.deleteApi || props.ignorePermissionActions?.includes('delete')
        ? __
        : () => {
            const _dialog = $dialog.warning({
              title: i18nt('tips'),
              content: i18nt('permission-button.deleteTooltip'),
              onPositiveClick: async () => {
                try {
                  _dialog.loading = true;
                  const result = await asyncEmit(emit, 'handle', permission);
                  return !!result;
                } catch (error) {
                  console.log('handleDeleteEmit - asyncEmit：异常', error);
                } finally {
                  _dialog.loading = false;
                }
              }
            });
          }
  };
  permissionAction[permission as PermissionType]
    ? permissionAction[permission as PermissionType]?.()
    : emit('handle', permission as PermissionType);
};

// 上传
const { beforeUpload, customRequest, fileList, onError, onFinish, isLoadingUpload } = useUpload({
  astrictFileType: astrictXlsxRule,
  clearFileList: true,
  executeOnFinish: () => emit('handle', 'import')
});

const handleBeforeUpload = (options: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  if (!importApi) return false;
  return beforeUpload(options);
};
</script>

<template>
  <base-space v-bind="props.spaceProps">
    <template v-for="item in buttons" :key="item">
      <!-- 导入 -->
      <base-upload
        v-if="item === 'import'"
        ref="uploadRef"
        v-model:file-list="fileList"
        :button-name="item"
        :loading="isLoadingUpload"
        :action="importApi"
        :custom-request="customRequest"
        :max="1"
        :show-file-list="false"
        @finish="onFinish"
        @error="onError"
        @before-upload="handleBeforeUpload"
      >
        {{ i18nt(item) }}
      </base-upload>
      <!-- 其余权限 -->
      <base-button
        v-else
        :button-name="item"
        :type="`${buttonsPrimary[item as PermissionType] ?? 'primary'}`"
        :disabled="props[`${item}Loading` as keyof PermissionTypeLoading] || props.loadingProps?.[`${item}Loading`as  keyof PermissionCustomTypeLoading] || _buttonDisableCondition(item as PermissionType)"
        :loading="props[`${item}Loading` as keyof PermissionTypeLoading] || props.loadingProps?.[`${item}Loading`as  keyof PermissionCustomTypeLoading]"
        @click="handleEmit(item)"
      >
        {{ i18nt(item) }}
        <template #icon>
          <base-icon :icon="`${buttonIcons[item as PermissionType] ?? 'i-carbon:cube'}`" />
        </template>
      </base-button>
    </template>
  </base-space>
</template>
