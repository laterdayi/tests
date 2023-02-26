import type { Directive, DirectiveBinding } from 'vue';
import router from '@/router';

// v-permission：权限按钮自定义指令
export const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (!binding?.arg) return el.parentNode && el.parentNode.removeChild(el);
    const permissions = router.currentRoute.value.meta.powers as string[];
    if (!permissions.includes(binding?.arg)) el.parentNode && el.parentNode.removeChild(el);
  }
};
