<script setup lang="ts">
const registerNaiveUiTools = () => {
  window.$message = useMessage();
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$notification = useNotification();
};
registerNaiveUiTools();
</script>

<template>
  <router-view />
</template>
