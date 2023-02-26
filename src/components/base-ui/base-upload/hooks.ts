import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui';

export interface UseUploadParamsType {
  astrictFileType?: AstrictFileType | undefined;
  formData?: MaybeRef<any>;
  model?: string | undefined;
  executeOnFinish?: (() => Promise<void | undefined> | undefined) | undefined;
  executeOnError?: (() => Promise<void | undefined> | undefined) | undefined;
}
export interface AstrictFileType {
  rule: string | string[];
  error: string;
}
type UploadErrorType = { index: number; msgCode: number };
type UploadResponseType = number | UploadErrorType[];

export const astrictImgRule = {
  rule: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/x-icon'],
  error: 'file.astrictImgHint'
};
export const astrictXlsxRule = {
  rule: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  error: 'file.astrictXlsxHint'
};
export const astrictApkRule = {
  rule: 'application/vnd.android.package-archive',
  error: 'file.astrictApkHint'
};

export const useUpload = ({
  // 限制文件类型
  astrictFileType,
  // 表单数据
  formData,
  // 表单对应model
  model,
  // 成功
  executeOnFinish,
  // 失败
  executeOnError,
  // 失败时是否清空文件列表
  clearFileList,
  // 默认文件列表
  defaultFileList
}: {
  astrictFileType?: AstrictFileType;
  formData?: MaybeRef<any>;
  model?: string;
  executeOnFinish?: () => Promise<void | undefined> | undefined | void;
  executeOnError?: () => Promise<void | undefined> | undefined | void;
  clearFileList?: boolean;
  defaultFileList?: UploadFileInfo[];
}) => {
  const {
    execute,
    isLoading: isLoadingUpload,
    data,
    response,
    error: uploadError
  } = useAxiosPost<UploadResponseType>();

  // 文件列表
  const fileList = ref<UploadFileInfo[]>(defaultFileList ?? []);

  // 组件状态变化的回调，组件的任何文件状态变化都会触发回调
  const handleUploadChange = (options: { file: UploadFileInfo; fileList: UploadFileInfo[]; event?: Event }) => {
    fileList.value = options.fileList;
  };

  // 上传前请验证文件格式
  const beforeUpload = (options: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
    if (!astrictFileType?.rule.includes(options.file.type ?? '')) {
      $message.warning(i18nt(astrictFileType?.error ?? ''));
      return false;
    }
    return true;
  };

  // 上传完成
  const onFinish = ({ file }: { file: UploadFileInfo }) => {
    if (formData && model) {
      // 表单字段赋值
      isRef(formData) ? ((formData.value as any)[model] = data.value) : (toRaw(formData)[model] = data.value);
    }
    executeOnFinish?.();
    if (clearFileList) handleClearFileList();
    return file;
  };

  // 上传失败
  const onError = () => {
    if (clearFileList) handleClearFileList();
    executeOnError?.();
  };

  // 删除
  const onRemove = () => {
    isRef(formData) ? ((formData.value as any)[model ?? ''] = null) : (toRaw(formData)[model ?? ''] = null);
  };

  // 清空列表
  const handleClearFileList = () => nextTick(() => (fileList.value = []));

  // 自定义上传
  const customRequest = async ({
    file,
    action,
    onFinish: finish,
    onError: error,
    onProgress
  }: UploadCustomRequestOptions) => {
    try {
      const params = new FormData();
      params.append('file', file.file ?? '');
      await execute(action, {
        data: params,
        onUploadProgress: ({ loaded, total }) => {
          onProgress({ percent: Math.ceil((loaded / (total ?? 0)) * 100) });
        }
      });
      uploadError.value ? error() : finish();
    } catch (err) {
      console.log('文件上传异常：', err);
      error();
    }
  };

  return {
    handleUploadChange,
    fileList,
    clearFileList,
    customRequest,
    beforeUpload,
    isLoadingUpload,
    handleClearFileList,
    data,
    response,
    onRemove,
    onFinish,
    onError
  };
};
