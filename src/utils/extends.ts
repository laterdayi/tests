/**
 * @description: 异步emit
 * @return {*}
 */
export const asyncEmit = (
  emit: (e: string, params?: any, resolve?: AsyncEmitResolveType) => void,
  name: string,
  params?: any
) => {
  return new Promise(resolve => emit(name, params, resolve));
};
