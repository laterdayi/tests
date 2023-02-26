import { light } from 'semi-theme-vars';

// 按钮设置
export const buttonSizeOption = [
  { label: i18nt('minimum'), value: 'tiny' },
  { label: i18nt('smallScale'), value: 'small' },
  { label: i18nt('standard'), value: 'medium' },
  { label: i18nt('extremely'), value: 'large' }
];

// 系统主题
export const themePrimaryOption: string[] = [
  light.common.primaryColor,
  '#409eff',
  '#18A058',
  '#FB9300',
  '#0084F4',
  '#009688',
  '#536DFE',
  '#FF5C93',
  '#41b584',
  '#0096C7',
  '#9C27B0',
  '#165DFF',
  '#00C1D4',
  '#1890ff',
  '#171010',
  '#78DEC7',
  '#1768AC',
  '#FC5404'
];

// 表格按钮
export const pageSizeOption: {
  label: string;
  value: number;
}[] = [
  { label: '10 ' + i18nt('stripPage'), value: 10 },
  { label: '15 ' + i18nt('stripPage'), value: 15 },
  { label: '20 ' + i18nt('stripPage'), value: 20 },
  { label: '30 ' + i18nt('stripPage'), value: 30 },
  { label: '50 ' + i18nt('stripPage'), value: 50 },
  { label: '100 ' + i18nt('stripPage'), value: 100 },
  { label: '200 ' + i18nt('stripPage'), value: 200 }
];
