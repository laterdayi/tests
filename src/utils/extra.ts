/**
 * @description:
 * @return {*}
 */
export const useOmitExtraParams = (sourceData: object, targetData: object) => pick(sourceData, Object.keys(targetData));

/**
 * @description: 获取动态图片
 * @param {string} url
 * @return {string}
 */
export const useGetImageUrl = (url?: string) => {
  if (!url) return;
  return new URL(BASE_API + '/' + url, import.meta.url);
};
