import type { ParamsSerializerOptions } from 'axios';
import Qs from 'qs';

/**
 * @description: 过滤请求参数：null undefined ''
 * @param {object} data  { name: 'Tom', age: null, link: '', address: undefined }
 * @return {*}   { name:'Tom' }
 */
export const useOmitNilRequestParams = (data: object) => omitBy(data, e => isNil(e) || e === '');

/**
 * @description: Axios 参数序列化
 * @param {*} ParamsSerializerOptions
 * @return {*}
 */
export const useParamsSerializer = (): ParamsSerializerOptions => {
  return {
    serialize: params => Qs.stringify(params, { arrayFormat: 'repeat' })
  };
};
