import { service } from '@/service';
import { CommonApis } from '@/service/apis/common/common';
import type { AxiosRequestConfig } from 'axios';
/**
 * @description: 按钮点击记录
 * @param {string} buttonName
 * @return {*}
 */
export const useButtonClickRecord = (buttonName: string) => {
  try {
    if (!buttonName) throw Error('按钮名称不能为空');
    const routeNames = window.location.pathname.split('/');
    const params = {
      buttonName,
      pageName: camelCase(last(routeNames)),
      bussinessModule: camelCase(head(routeNames) || routeNames.at(1))
    };
    service.post(CommonApis.sendButtonClickRecordApi, params, { showTooltip: false });
  } catch (error) {
    throw Error(`${error}`);
  }
};

/**
 * @description:下载文件
 * @param {string} url: 下载Api
 * @return {*}
 */
export type ExportParamsType = {
  page: number | (() => number);
  size: number | (() => number);
  toexcel?: number;
};

export const useDownloadFile = (url: string) => {
  const { data, error, execute: handle, isLoading } = useAxiosGet<string>(url);
  function execute(queryParams: ExportParamsType | object, config?: AxiosRequestConfig): Promise<void>;
  function execute(): Promise<void>;
  async function execute(queryParams?: ExportParamsType | object, config?: AxiosRequestConfig): Promise<void> {
    const params = queryParams ? { ...queryParams, toexcel: 1 } : __;
    await handle({ params, ...config });
    !error.value && data.value?.includes('xlsx') && window.open(`${import.meta.env.VITE_BASE_API}/${data.value}`);
  }
  return {
    execute,
    isLoading
  };
};
