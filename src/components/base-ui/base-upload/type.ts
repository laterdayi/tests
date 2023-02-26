import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui';

export type UploadCustomRequestType = ({
  file,
  action,
  onFinish,
  onError
}: UploadCustomRequestOptions) => Promise<void>;

export type UploadBeforeUploadType = (options: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}) => Promise<boolean | void> | boolean | void;

export type UploadOnRemoveType = () => void;

export type UploadOnFinishType = ({ file }: { file: UploadFileInfo }) => void;
