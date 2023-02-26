// 占位
export const __ = undefined;
// base api
export const BASE_API = import.meta.env.VITE_BASE_API;

// -------------------------------------------------------------------------------------------- > Service

// 服务超时时间
export const SERVICE_TIME_OUT = systemThemeVars.serviceTimeOut;
// 服务认证错误码
export const SERVICE_AUTH_ERROR_CODES = systemThemeVars.serviceAuthErrorCodes;

// -------------------------------------------------------------------------------------------- > 主题设置

// 默认语言
export const LOCAL_DEFAULT = systemThemeVars.localDefault;
// 默认主题系(黑夜模式)
export const THEME_DEFAULT = systemThemeVars.themeDefault;
// 默认系统按钮风格
export const BUTTON_SIZE = systemThemeVars.buttonSize;
// 默认表格分页设置 (?/页)
export const PAGE_SIZE = systemThemeVars.pageSize;

// layout 名称
export const BLANK_LAYOUT = 'BlankLayout';
export const BASE_LAYOUT = 'Layout';

// 头部 内容区 内边距
export const LAYOUT_PADDING = systemThemeVars.layoutPadding;

// -------------------------------------------------------------------------------------------- > 宽度

// 表格 > 固定列操作按钮
export const TABLE_WIDTH_ACTION = 70;
// 表格 > 序号
export const TABLE_WIDTH_INDEX = 70;
// 表格 > 日期 + 时间
export const TABLE_WIDTH_DATETIME = 170;
// 表格 > 日期 + 时间 + 毫秒
export const TABLE_WIDTH_DATETIME_MILLISECOND = 200;
// 表格 > 日期 | 时间
export const TABLE_WIDTH_DATE = 120;
// 表格 > IP
export const TABLE_WIDTH_IP = 130;
// 表格 > 信息类
export const TABLE_WIDTH_INFO = 140;
// 表格 > 状态类
export const TABLE_WIDTH_STATE = 100;
// 表格 > 系统级模块
export const TABLE_WIDTH_MODULE = 130;
// 表格 > 人员名称 | 工单号
export const TABLE_WIDTH_NAME = 180;
// 表格 > 滚动 > 小
export const TABLE_WIDTH_SCROLL_SMALL = 1920;
// 表格 > 滚动 > 中等
export const TABLE_WIDTH_SCROLL_MIDDLE = 2560;
// 表格 > 滚动 > 大
export const TABLE_WIDTH_SCROLL_LARGE = 3840;

// tree
export const TREE_WIDTH = 240;
// tree 容器 = tree宽度 + 边框 + 边距
export const TREE_WIDTH_CONTAINER = TREE_WIDTH + 34;

// 表格 | Tree > Tooltip 最大值
export const TOOLTIP_WIDTH = '600px';

// 二维码宽度
export const QRCODE_WIDTH = 200;

// -------------------------------------------------------------------------------------------- > 高度

// layout 头部高度
export const LAYOUT_HEADER_HEIGHT = systemThemeVars.layoutHeaderHeight;
// layout tags-view 高度
export const LAYOUT_TAGS_VIEW_HEIGHT = systemThemeVars.layoutTagsViewHeight;

// tree高度
export const TREE_HEIGHT = 600;

// -------------------------------------------------------------------------------------------- > Input 限制

// 表单文本域描述最长限制
export const MAX_LENGTH_DESCRIPTION = 200;
// 表单文本input最长限制
export const MAX_LENGTH_INPUT = 50;
// 表单数字input最长限制
export const MAX_LENGTH_INPUT_NUMBER = 9;

// -------------------------------------------------------------------------------------------- > Dialog or Notification or Message

// 提示框延时
export const MESSAGE_DURATION = 3000;
export const NOTIFICATION_DURATION = 8000;

// -------------------------------------------------------------------------------------------- > Chart

// Xaxis label 个数
export const XAXIS_LENGTH = 10;
// 水平 bar 宽度
export const BAR_WIDTH_HORIZONTAL = 20;
// 垂直 bar 宽度
export const BAR_WIDTH_VERTICAL = 30;
