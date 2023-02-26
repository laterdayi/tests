import type { RouteType } from '@/types/route';

/**
 * @description:
 * @return {*}
 */
export const useRoutes = () => {
  const router = useRouter();

  // 当前权限列表
  const currentRoutePowers = computed(() => (router.currentRoute.value as unknown as RouteType)?.meta?.powers);

  // 是否拥有编辑权限
  const hasEditPermission = computed(() => currentRoutePowers.value?.includes('edit'));
  // 是否拥有删除权限
  const hasDeletePermission = computed(() => currentRoutePowers.value?.includes('delete'));

  // 是否拥有自定义权限权限
  const hasCustomPermission = (name: PermissionCustomType) => currentRoutePowers.value?.includes(name);

  // 网站标题
  const siteTitle = useTitle();
  // 修改网站标题
  const changeSiteTitle = () => {
    if (!router.currentRoute.value.name) return;
    siteTitle.value = `${i18nt((router.currentRoute.value?.name as string)?.split('-')?.at(-1) ?? '')} - ${i18nt(
      'siteTitle'
    )}`;
  };

  return {
    hasDeletePermission,
    changeSiteTitle,
    currentRoutePowers,
    hasEditPermission,
    hasCustomPermission
  };
};
