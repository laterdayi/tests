import type { DateLike } from '@vueuse/core';

/**
 * @description: 转换为标准时间范围
 * @param {*} day：往前推*天数
 * @return {*}  [2022-10-12 00:00:00,2022-10-18 23:59:59]
 */
export const useFormatDateRange = (day = 7) => {
  const time = +new Date(new Date().toLocaleDateString());
  const start = useDateFormat(time - 3600 * 1000 * 24 * (day - 1), 'YYYY-MM-DD HH:mm:ss');
  const end = useDateFormat(time + 24 * 60 * 60 * 1000 - 1, 'YYYY-MM-DD HH:mm:ss');
  return [start.value, end.value];
};

/**
 * @description: 时间转换为标准日期
 * @param {*} name：时间
 * @param {*} type：生成时间格式
 * @return {*}  2022-11-09
 */
export const useFormatDate = (time: DateLike = new Date(), type = 'YYYY-MM-DD') => useDateFormat(time, type).value;

/**
 * @description: 时间转换为标准时间
 * @param {*} name：时间戳
 * @param {*} type：生成时间格式
 * @return {*} 14:25:59
 */
export const useFormatTime = (time: DateLike = new Date(), type = 'HH:mm:ss') => useDateFormat(time, type).value;

/**
 * @description: 日期时间 -> 日期时间请求参数
 * @param {string} timestamp：时间数据
 * @param {*} field：日期时间字段名称
 * @param {*} start：开始字段名称
 * @param {*} end：结束字段名称
 * @return {*}
 */
export const useFormatDateTimeParams = (
  timestamp: string[] | null | undefined,
  field = 'timestamp',
  start = 'startTime',
  end = 'endTime'
) => {
  if (!timestamp) return;
  return {
    [field]: __,
    [start]: timestamp?.at(0),
    [end]: timestamp?.at(-1)
  };
};
