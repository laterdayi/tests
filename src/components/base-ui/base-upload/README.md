# useUpload Hooks

## Params

| Name            | Type                                                    | Default     | Description            |
| --------------- | ------------------------------------------------------- | ----------- | ---------------------- |
| astrictFileType | `AstrictFileType`                                       | `undefined` | 限制文件类型           |
| formData        | `MaybeRef<any>`                                         | `undefined` | 表单数据               |
| model           | `string`                                                | `undefined` | 表单对应 model         |
| executeOnFinish | `() => Promise<void \| undefined> \| undefined \| void` | `undefined` | 成功回调函数           |
| executeOnError  | `() => Promise<void \| undefined> \| undefined \| void` | `undefined` | 失败回调函数           |
| clearFileList   | `boolean`                                               | `undefined` | 失败时是否清空文件列表 |

## Return

| Name                | Type                                                                                                            | Default     | Description                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------ |
| fileList            | `Ref<UploadFileInfo[]>`                                                                                         | `undefined` | 文件列表                                               |
| handleUploadChange  | `(options: { file: UploadFileInfo; fileList: UploadFileInfo[]; event?: Event \| undefined}) => void`            | `undefined` | 组件状态变化的回调，组件的任何文件状态变化都会触发回调 |
| customRequest       | `({ file, action, onFinish: finish, onError: error, onProgress }: UploadCustomRequestOptions) => Promise<void>` | `undefined` | n-upload customRequest                                 |
| beforeUpload        | `(options: {file: UploadFileInfo;fileList: UploadFileInfo[]}) => Promise<boolean>`                              | `undefined` | 上传前验证函数                                         |
| isLoadingUpload     | `Ref<boolean>`                                                                                                  | `undefined` | 上传 loading                                           |
| handleClearFileList | `() => Promise<void>`                                                                                           | `undefined` | 清空列表                                               |
| data                | `Ref<UploadResponseType \| undefined>`                                                                          | `undefined` | Response Data                                          |
| response            | `ShallowRef<ResponseDataType<UploadResponseType> \| undefined>`                                                 | `undefined` | Response                                               |
| onRemove            | `() => void`                                                                                                    | `undefined` | 文件删除回调                                           |
| onFinish            | `({ file }: {file: UploadFileInfo }) => UploadFileInfo`                                                         | `undefined` | 文件上传成功回调                                       |
| onError             | `() => void`                                                                                                    | `undefined` | 文件上传错误回调                                       |
