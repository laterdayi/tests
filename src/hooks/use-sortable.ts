import Sortable from 'sortablejs';

/**
 * @description: Sortable
 * @param {string} id：元素唯一ID
 * @return {*}
 */
export const useSortable = (id: string, options?: Sortable.Options) => {
  // 实例
  let instance: Sortable | null = null;

  // 初始化
  const initSortable = () => {
    const el: HTMLElement | null = document.getElementById(id);
    if (!el) return;
    instance = Sortable.create(el, { animation: 500, ...options });
  };

  //  销毁
  const destroy = () => instance && (instance?.destroy(), (instance = null));

  return {
    instance,
    initSortable,
    destroy
  };
};
