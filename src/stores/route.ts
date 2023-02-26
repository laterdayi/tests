import { UserApis } from '@/service/apis/user';
import { generateAsyncRouter } from '@/router/utils';
import type { RouteType } from '@/types/route';
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import router from '@/router';
import { fixedRouteList, Routes } from '@/router/routes';

interface RouteStoreState {
  routes: RouteType[];
  currentModule: string;
  tagsViewList: Partial<RouteLocationNormalizedLoaded>[];
}

export const useRouteStore = defineStore('route', {
  state: (): RouteStoreState => ({
    routes: [],
    // 当前选择模块
    currentModule: '',
    // 标签列表
    tagsViewList: []
  }),
  getters: {
    hasRoutes: state => !!state.routes.length,
    //  工作台列表
    workbenchList: state => state.routes.map(item => ({ ...item, label: i18nt(item.name), children: __ })),
    // 模块列表
    modulesList: state => state.routes.map(item => item.name),
    // 是否为最后一个tag
    isLastTag: state => last(state.tagsViewList)?.path === router.currentRoute.value.path,
    // 是否为第一个tag
    isFirstTag: state => head(state.tagsViewList)?.path === router.currentRoute.value.path
  },
  actions: {
    /**
     * 更新工作台
     * @param module 产品项
     */
    changeCurrentModule(module: string) {
      this.currentModule = module;
    },
    /** 重置ttore */
    resetRouteStore() {
      this.resetRoutes();
      this.$reset();
    },
    /** 清空路由数据 */
    resetRoutes() {
      const routes = router.getRoutes();
      routes.forEach(route => {
        if (!fixedRouteList.includes(route.path)) router.removeRoute(route.name ?? '');
      });
    },
    /**
     * 获取动态路由
     */
    async getDynamicRoutes() {
      const { execute } = useAxiosGet<RouteType[]>(UserApis.getModulesRouteApi);
      const { data } = await execute();
      let routes: RouteRecordRaw[] = [];
      if (data.value && Array.isArray(data.value)) {
        routes = generateAsyncRouter('/', data.value);
        this.routes = data.value;
      }
      return routes;
    },

    /**
     * @param tag 当前项
     */
    addTagsView(tag: Partial<RouteLocationNormalizedLoaded>) {
      const isExist = this.tagsViewList.find(item => item?.path === tag.path);
      if (!isExist) {
        this.tagsViewList.push(tag);
      }
    },

    /**
     * @param tag 当前点击项
     * @param index 当前点击项索引
     * @param isCurrentTag 是否当前项
     */
    deleteTagsView(tag: Partial<RouteLocationNormalizedLoaded>, index: number, isCurrentTag: boolean) {
      const isLast = last(this.tagsViewList)?.path === tag.path;
      remove(this.tagsViewList, item => item.path === tag.path);
      if (isCurrentTag) {
        router.push(
          this.tagsViewList.length
            ? this.tagsViewList.at(isLast ? index - 1 : index)?.path ?? Routes.WORKBENCH
            : Routes.WORKBENCH
        );
      }
    },
    /**
     * @description: 更新tags-view列表
     * @param {Partial} tags 赋值项
     * @return {*}
     */
    updateTagsView(tags: Partial<RouteLocationNormalizedLoaded>[]) {
      this.tagsViewList = toRaw(tags);
    }
  },
  persist: {
    paths: ['tagsViewList']
  }
});
