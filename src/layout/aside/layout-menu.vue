<script setup lang="ts">
import { Routes } from '@/router/routes';
import { useRouteStore } from '@/stores/route';
import type { RouteType } from '@/types/route';
import { MenuOption, NEllipsis } from 'naive-ui';
import BaseIcon from '@/components/base-icon.vue';
import { RouterLink } from 'vue-router';
const route = useRoute();
const { routes, currentModule } = storeToRefs(useRouteStore());

const { collapsed } = defineProps<{ collapsed?: boolean }>();

/**
 * @param icon 图标
 */
const renderIcon = (icon: string) => () => h(BaseIcon, { icon });

/**
 * @param path 路由地址
 * @param label 文本
 */
const renderLabel = (path: string, label: string, link?: number) => () => {
  const item = link
    ? h('a', { href: path, target: '_blank' }, i18nt(label))
    : h(RouterLink, { to: { path } }, { default: () => i18nt(label) });
  return collapsed
    ? item
    : h(NEllipsis, null, {
        default: () => item
      });
};

// 菜单项
const menuOptions = computed<MenuOption[]>(() => {
  const menus: MenuOption[] = [
    {
      label: renderLabel(Routes.WORKBENCH, 'workbench', 0),
      key: Routes.WORKBENCH,
      icon: renderIcon('i-carbon:home')
    }
  ];
  const module = routes.value.filter((item: RouteType) => toLower(item.name) == toLower(currentModule.value));
  return module?.length && module[0]?.children?.length
    ? menus.concat([...convertToMenu(`/${toLower(module[0].path)}`, '', module[0].children)])
    : menus;
});

/**
 * 转换为菜单
 * @param routes 路由表
 */
const convertToMenu = (module: string, parentPath: string, routes: RouteType[]) => {
  const menus: MenuOption[] = [];
  routes.forEach(route => {
    const { meta } = toRaw(route);
    const menu: MenuOption = {
      label: renderLabel(
        meta?.link ? route.path : route.children?.length ? `` : `${module}/${parentPath}${route.path}`,
        route.name,
        meta?.link
      ),
      key: `${module}/${parentPath}${route.path}`,
      icon: renderIcon(route.meta.icon ?? 'i-carbon:settings-adjust')
    };
    if (route.children?.length) menu.children = convertToMenu(module, `${route.path}/`, route.children);
    if (!meta.hidden) menus.push(menu);
  });
  return menus;
};
</script>

<template>
  <n-menu
    :collapsed-width="systemThemeVars.menuCollapsedWidth"
    :options="menuOptions"
    :value="route.path"
    :watch-props="['defaultValue', 'defaultExpandedKeys']"
    :indent="systemThemeVars.menuIndent"
    accordion
  />
</template>
