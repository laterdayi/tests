import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ResponseCodeType, UploadErrorType } from '../type';
import CancelRequest from './cancel-request';

const cancelRequest = new CancelRequest();
interface ErrorStateType {
  [index: number]: ErrorStateReturnType | string;
}
type ErrorStateReturnType = () => {
  msg: string;
  handle: () => void;
};

// 请求拦截器
export function onRequest(config: InternalAxiosRequestConfig) {
  const userStore = useUserStore();
  // 检查是否存在重复请求，若存在则取消已发的请求
  cancelRequest.removePendingRequest(config);
  // 把当前请求信息添加到pendingRequest对象中
  cancelRequest.addPendingRequest(config);
  if (userStore?.userInfo?.token && config?.useDefaultToken !== false) {
    config.headers.set('Token', userStore?.userInfo?.token);
    config.headers.set('Refresh', userStore?.userInfo.refreshToken?.refreshToken);
  }
  return config;
}

// 请求拦截器 - 错误
export function onRequestError(error: AxiosError) {
  console.log('请求错误', error);
  return Promise.reject(error);
}

// 响应拦截器
export function onResponse(res: AxiosResponse) {
  // 从pendingRequest对象中移除请求
  cancelRequest.removePendingRequest(res.config);
  const userStore = useUserStore();
  const result = res.data;
  if (result.code === ResponseCodeType.success) {
    if (res.config.method === 'post') {
      handleTooltip(res, i18nt(result.message), 'success', 'message');
    }
    return result;
  } else if (SERVICE_AUTH_ERROR_CODES?.includes(result.message)) {
    // 如果包含token错误
    userStore.logout();
  }
  handleError(res);
  return Promise.reject(result);
}

// 响应拦截器 - 错误
export function onResponseError(error: AxiosError<ResponseDataType<string>>) {
  if (!error.config?.showTooltip === false) return;
  const response = error?.response;
  if (axios.isCancel(error)) return;
  const userStore = useUserStore();
  const errState: ErrorStateType = {
    400: i18nt('response.state.400'),
    401: () => {
      return {
        msg: i18nt('response.state.401'),
        handle: () => {
          setTimeout(() => {
            userStore.logout();
          }, 1000);
        }
      };
    },
    403: i18nt('response.state.403'),
    404: i18nt('response.state.404'),
    405: i18nt('response.state.405'),
    408: i18nt('response.state.408'),
    429: i18nt('response.state.429'),
    500: i18nt('response.state.500'),
    501: i18nt('response.state.501'),
    502: i18nt('response.state.502'),
    503: i18nt('response.state.503'),
    504: i18nt('response.state.504'),
    505: i18nt('response.state.505')
  };
  // 错误提示信息
  let errorMessage = '';
  if (response?.status) {
    if (typeof errState[response?.status] === 'function') {
      const { msg, handle } = (errState[response?.status] as ErrorStateReturnType)();
      errorMessage = msg;
      handle();
    } else {
      errorMessage = errState[response?.status] as string;
    }
  }
  $notification.error({
    title: i18nt(response?.data?.message ?? 'requestError'),
    content: response?.data?.data ?? (errorMessage || i18nt('response.state.400'))
  });
  return Promise.reject(error);
}

// 错误处理
const handleError = (res: AxiosResponse) => {
  const { code, message, data } = res.data;
  switch (code) {
    case ResponseCodeType.error:
      handleTooltip(res, i18nt(message), 'error');
      break;
    case ResponseCodeType.needFormatError:
      handleTooltip(res, i18nt(message, handleFormatErrorMsg(data)), 'error', 'notification');
      break;
    case ResponseCodeType.importError:
      handleTooltip(res, handleImportErrorMsg(data), 'error', 'notification');
      break;
    case ResponseCodeType.throwError:
      handleTooltip(res, data, 'error', 'notification');
      break;
    default:
      break;
  }
};

// 提示操作
export const handleTooltip = (
  res: AxiosResponse<ResponseDataType>,
  content: string,
  type: 'info' | 'success' | 'warning' | 'error' = 'info',
  tooltipType: 'message' | 'dialog' | 'notification' = 'message'
) => {
  const { config } = res;
  const {
    showTooltip,
    tooltipType: customTooltipType,
    tooltipTitle,
    tooltipContent,
    executeConfirm,
    executecancel
  } = config ?? {};
  const _showTooltip = showTooltip ?? true;
  const _tooltipType = customTooltipType ?? tooltipType;
  const _content = content;
  if (_showTooltip) {
    switch (_tooltipType) {
      case 'message':
        $message[type](tooltipContent ?? _content);
        break;
      case 'dialog':
        $dialog[type]({
          title: tooltipTitle ?? i18nt('tips'),
          content: tooltipContent ?? _content,
          onPositiveClick: executeConfirm,
          onNegativeClick: executecancel
        });
        break;
      case 'notification':
        $notification[type]({
          title: i18nt('requestError'),
          content: tooltipContent ?? _content
        });
        break;
      default:
        break;
    }
  }
};

/**
 * @description: 处理带参数的响应错误
 * @response {code: 2,data: (string | number)[]}
 * @param {} data
 * @return {*}
 */
const handleFormatErrorMsg = (data: string[]) => {
  const params: { [key: string]: string } = {};
  for (let i = 0; i < data.length; i++) {
    params[`v${i}`] = i18nte(data[i]) ? i18nt(data[i]) : data[i];
  }
  return params;
};

/**
 * @description: 处理Excel导入错误
 * @response {code: 3, data: {index:number,msgCode:number}[]}
 * @param {UploadErrorType[]} data
 * @return {*}
 */
export const handleImportErrorMsg = (data: UploadErrorType[]) => {
  let message = '';
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      message += filterImportErrMsg(item);
    }
  }
  return message;
};
const filterImportErrMsg = (item: UploadErrorType) => {
  const state: { [key: number]: string } = {
    10006: `${i18nt('file.templateError')}, ${i18nt(item.msgCode)}`,
    10007: i18nt(item.msgCode)
  };
  return (
    state[item.msgCode] ??
    `${i18nt('file.whichRow', { val: item.index })}${i18nt(item.msgCode)}
`
  );
};
