export const useModal = () => {
  // 显示
  const showModal = ref(false);

  // 模态框标题
  const modalTitle = ref('');

  // 打开modal
  const openModal = (title = '打开') => {
    modalTitle.value = title ?? '';
    showModal.value = true;
  };

  // 关闭modal
  const closeModal = () => {
    showModal.value = false;
  };

  // 清空模态框标题
  const clearModalTitle = () => {
    modalTitle.value = '';
  };

  return {
    clearModalTitle,
    modalTitle,
    showModal,
    closeModal,
    openModal
  };
};
