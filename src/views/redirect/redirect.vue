<script setup lang="ts">
const { replace } = useRouter();
const route = useRoute();
const { params } = route;
const { path } = params;
replace({ path: `/${Array.isArray(path) ? path.join('/') : path}` });
</script>

<template>
  <div id="redirect-page" />
</template>
