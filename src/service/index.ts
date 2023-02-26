import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAxios, UseAxiosOptions } from '@vueuse/integrations/useAxios';
import { onRequest, onRequestError, onResponse, onResponseError } from './modules/interceptor';

const service: AxiosInstance = axios.create({
  timeout: SERVICE_TIME_OUT,
  baseURL: import.meta.env.VITE_BASE_API
});

// 请求拦截器
service.interceptors.request.use(onRequest, onRequestError);
// 响应拦截器
service.interceptors.response.use(onResponse, onResponseError);

// get
const useAxiosGet = <T>(url: string, params?: object, config?: AxiosRequestConfig, options?: UseAxiosOptions) => {
  return useAxios<T, ResponseDataType<T>>(url, { method: 'GET', params, ...config }, service, {
    immediate: options?.immediate ?? false,
    shallow: options?.shallow ?? true
  });
};

// post
const useAxiosPost = <T>(url?: string, data?: object, config?: AxiosRequestConfig, options?: UseAxiosOptions) => {
  return useAxios<T, ResponseDataType<T>>(url ?? '', { method: 'POST', data, ...config }, service, {
    immediate: options?.immediate ?? false,
    shallow: options?.shallow ?? true
  });
};

export { service, useAxiosGet, useAxiosPost };
