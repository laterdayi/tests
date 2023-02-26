// 默认权限按钮
export type PermissionPresetType = 'search' | 'add' | 'edit' | 'delete' | 'download' | 'import' | 'export';

declare global {
  // 自定义权限按钮
  type PermissionCustomType =
    | 'associateSetting'
    | 'unlock'
    | 'copy'
    | 'updatePartition'
    | 'grant'
    | 'confirmScrap'
    | 'reset'
    | 'startTimer'
    | 'permissionAssign'
    | 'resetPassword'
    | 'uploadApk'
    | 'scanCodeDownload'
    | 'executeNow'
    | 'collect'
    | 'grant'
    | 'restitution'
    | 'receive'
    | 'boarding'
    | 'disembark'
    | 'maintain'
    | 'externalRepairRestitution'
    | 'applyForScrapping'
    | 'confirmScrap'
    | 'generateQRcode';

  type PermissionType = PermissionPresetType | PermissionCustomType;

  type PermissionTypeLoading = {
    [K in PermissionType as `${K}Loading`]?: boolean;
  };

  type PermissionCustomTypeLoading = {
    [K in PermissionCustomType as `${K}Loading`]?: boolean;
  };

  type PermissionDisableType = {
    [K in PermissionType]?: boolean;
  };

  type ButtonIconType = {
    [K in PermissionType]: string;
  };

  type PermissionActionType = {
    [K in PermissionType]?: any;
  };
}
