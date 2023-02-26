export const useTree = <T = any>() => {
  // 选中列表
  const selectedKeysList = ref<T[]>([]);

  // 搜索文字
  const searchText = ref('');

  // 半选列表
  const halfSelectedList = ref<T[]>([]) as Ref<T[]>;

  // 全选列表
  const checkAllList = ref<T[]>([]) as Ref<T[]>;

  // 更新全选列表
  const updateCheckAllList = (val: T[]) => (checkAllList.value = val);

  // 更新半选列表
  const updateHalfSelectedList = (val: T[]) => (halfSelectedList.value = val);

  // 选中列表-空验证
  const emptyCheckedListValidate = (msg: string) => {
    if (!halfSelectedList.value.length && !checkAllList.value.length) {
      $message.warning(msg);
      throw msg;
    }
  };

  // 节点勾选项发生变化时的回调函数
  const handleCheck = (keys: T[]) => (checkAllList.value = keys);

  // 节点部分勾选项发生变化时的回调函数
  const handleIndeterminate = (keys: T[]) => (halfSelectedList.value = keys);

  // 清空列表
  const clearCheckedList = () => (updateCheckAllList([]), updateHalfSelectedList([]));

  return {
    emptyCheckedListValidate,
    clearCheckedList,
    updateHalfSelectedList,
    updateCheckAllList,
    selectedKeysList,
    searchText,
    halfSelectedList,
    checkAllList,
    handleCheck,
    handleIndeterminate
  };
};
