import type { AxiosRequestConfig } from 'axios';

export default class CancelRequest {
  // 待请求列表
  pendingRequestList: Map<string, AbortController>;

  constructor() {
    this.pendingRequestList = new Map();
  }

  // 添加请求
  addPendingRequest = (config: AxiosRequestConfig) => {
    const { method, url, params, data } = config;
    const controller = new AbortController();
    config.signal = controller.signal;
    const uniqueKey = [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
    this.pendingRequestList.set(uniqueKey, controller);
  };

  // 取消重复请求
  removePendingRequest(config: AxiosRequestConfig) {
    const { method, url, params, data } = config;
    const uniqueKey = [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
    if (this.pendingRequestList.has(uniqueKey)) {
      // 取消请求
      this.pendingRequestList.get(uniqueKey)?.abort();
      // 删除对应Map
      this.pendingRequestList.delete(uniqueKey);
    }
  }
}
