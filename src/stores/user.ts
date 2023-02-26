import router from '@/router';
import { LoginType, UserApis } from '@/service/apis/user';
import type { UserInfoType } from '@/types/user';
import { Routes } from '@/router/routes';

interface UserStoreState {
  userInfo: UserInfoType | null | undefined;
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    // 用户信息
    userInfo: null
  }),
  getters: {
    // 是否有用户名
    hasUserInfo: state => !!state.userInfo
  },
  actions: {
    // 登录
    async login(userInfo: LoginType) {
      const { execute } = useAxiosPost<UserInfoType>(UserApis.loginApi, { ...userInfo, ipaddress: '' });
      const { data, error } = await execute();
      this.userInfo = data?.value ?? null;
      if (error.value) return Promise.reject(error.value);
    },
    // 退出
    async logout() {
      const { error } = await useAxiosGet(UserApis.logoutApi, __, __, {
        immediate: true
      });
      if (error.value) return;
      const routeStore = useRouteStore();
      routeStore.resetRouteStore();
      this.$reset();
      router.push(Routes.LOGIN);
    },
    // 获取用户信息
    async getUserInfo() {
      const { data, error } = await useAxiosGet<UserInfoType>(
        UserApis.getUserInfoApi,
        __,
        { showTooltip: false },
        {
          immediate: true
        }
      );
      !error.value && (this.userInfo = { ...this.userInfo, user: data.value?.user } as UserInfoType);
    },
    // 更新用户信息
    updateUserInfo(userInfo: UserInfoType | null | undefined) {
      this.userInfo = userInfo;
    }
  },
  persist: true
});
