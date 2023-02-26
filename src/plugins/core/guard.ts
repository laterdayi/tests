import { Routes, routeGuardWhiteList } from '@/router/routes';
import { parseRouterPath } from '@/router/utils';
import { useRouteStore } from '@/stores/route';
import { useUserStore } from '@/stores/user';
import type { Router } from 'vue-router';

export function setupGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    $loadingBar?.start();
    const userStore = useUserStore();
    const routeStore = useRouteStore();
    // 如果登录
    if (userStore.userInfo?.token) {
      if (to.path === Routes.LOGIN) {
        next(Routes.WORKBENCH);
        // 如果没有路由
      } else if (!routeStore.hasRoutes) {
        // 获取用户信息
        userStore.getUserInfo();
        // 获取路由
        const routes = await routeStore.getDynamicRoutes();
        if (routes.length) {
          // 默认取第一个
          const defaultModel = routeStore.workbenchList.find(item => item.meta.link !== 1);
          if (defaultModel?.name) routeStore.changeCurrentModule(defaultModel.name);
          // 动态添加路由
          routes.forEach(route => {
            router.addRoute(route);
          });
          if (to.name === '404') {
            /*
             * 动态路由没有加载导致404，等待权限路由加载好了，回到之前的路由
             * 若路由是从根路由重定向过来的，重新回到根路由
             */
            const path = to.redirectedFrom?.name === Routes.WORKBENCH ? '/' : to.fullPath;
            next({ path, replace: true });
            return false;
          }
          next();
        } else {
          next();
        }
      } else {
        next();
      }
      // 如果白名单存在，前往该路由
    } else if (routeGuardWhiteList.includes(to.path)) {
      next();
    } else {
      // 否则进入登录
      next(Routes.LOGIN);
    }
  });

  router.afterEach(to => {
    const routeStore = useRouteStore();
    const parsePath = parseRouterPath(to.path);
    //  对比router path 和 当前模式
    if (parsePath !== routeStore.currentModule) {
      const res = routeStore.workbenchList.filter(item => item.path === parsePath);
      if (res?.[0]?.path) routeStore.changeCurrentModule(camelCase(res?.[0]?.path));
    }
    $loadingBar?.finish();
  });
}
