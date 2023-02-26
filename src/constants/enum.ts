// 是否开启状态
export enum OpenState {
  // 打开
  open = 1,
  // 关闭
  close = 0
}

// 标签状态
export enum TagState {
  default = 'default',
  warning = 'warning',
  primary = 'primary',
  success = 'success',
  error = 'error'
}

// 编辑表单入口
export enum EditModalEntry {
  // 标题编辑
  title = 1,
  // 按钮编辑
  button
}

// 布局
export enum LayoutType {
  // 标准布局
  default = 1,
  // 空布局
  blank
}

// 数据字典类型
export enum AttributeType {
  // 备件区域
  toolingArea = 'ToolingArea',
  // 备件站别
  toolingStage = 'ToolingStage',
  // 存放位置
  warehouseLocation = 'WarehouseLocation',
  // 归还库房
  returnLocation = 'ReturnLocation',
  // 保养库位
  pMStock = 'PMStock',
  // 保养方式
  maintainMode = 'MaintainMode',
  // 保养原因
  maintainReason = 'MaintainReason'
}
