import { LOCAL_DEFAULT, THEME_DEFAULT, BUTTON_SIZE, PAGE_SIZE } from '@/constants/app';
import { ButtonSizeType, light, LocalType, ThemeType } from 'semi-theme-vars';

interface UserStoreState {
  // 黑夜模式
  theme: ThemeType;
  // 语言
  local: LocalType;
  // 系统主题色
  themePrimary: string;
  // 系统按钮风格
  buttonSize: ButtonSizeType;
  // 表格设置
  pageSize: number;
}
export const useAppStore = defineStore('app', {
  state: (): UserStoreState => ({
    theme: THEME_DEFAULT,
    local: LOCAL_DEFAULT,
    buttonSize: BUTTON_SIZE,
    pageSize: PAGE_SIZE,
    themePrimary: light.common.primaryColor
  }),
  getters: {},
  actions: {
    // 切换主题系
    toggleTheme(item: ThemeType) {
      this.theme = item;
    },
    // 设置语言
    setLocal(local: LocalType) {
      this.local = local;
    },
    // 切换系统主题色
    toggleThemePrimary(item: string) {
      this.themePrimary = item;
    },
    // 切换按钮大小
    toggleButtonSize(item: ButtonSizeType) {
      this.buttonSize = item;
    },
    // 切换表格页大小
    togglePageSize(item: number) {
      this.pageSize = item;
    }
  },
  persist: true
});
