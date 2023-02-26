import type { AxiosRequestConfig } from 'axios';
import type { StrictUseAxiosReturn } from '@vueuse/integrations';

type TooltipType = 'dialog' | 'notification' | 'message';

export enum ResponseCodeType {
  error = 0,
  success,
  // 带有参数的错误：string[]
  needFormatError,
  // 导入错误：{index:number,msgCode:number}[]
  importError,
  // 抛出异常错误：string
  throwError
}

export type UploadErrorType = { index: number; msgCode: number };

declare global {
  // Axios Response Data
  interface ResponseDataType<T = unknown> {
    code: number;
    data: T;
    message: number;
    page?: number;
    size?: number;
    total?: number;
  }

  // useAxios excute function type
  type ExecuteFunctionType<T, R = ResponseDataType<T>, D = any> = (
    url?: string | AxiosRequestConfig<any> | undefined,
    config?: AxiosRequestConfig<any> | undefined
  ) => PromiseLike<StrictUseAxiosReturn<T, R, D>>;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    // 显示提示框
    showTooltip?: boolean;
    // 提示框类型
    tooltipType?: TooltipType;
    // 提示框内容
    tooltipContent?: string;
    // 标题
    tooltipTitle?: string;
    // 是否使用默认 token
    useDefaultToken?: boolean;
    // 取消回调
    executecancel?: () => void;
    // 确定回调
    executeConfirm?: () => void;
  }

  interface AxiosError {
    data?: object;
  }
}
