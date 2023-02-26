<script setup lang="ts">
import type { UploadProps } from 'naive-ui';

interface PropsType {
  componentProps?: UploadProps & { label: string };
  class?: string | string[];
  loading?: boolean;
  // 按钮名称
  buttonName?: string;
  // 拖拽上传
  directoryDnd?: boolean;
}
const { componentProps, class: attrClass, buttonName, directoryDnd } = defineProps<PropsType>();
</script>

<template>
  <n-upload :class="attrClass" :max="1">
    <n-upload-dragger v-if="componentProps?.directoryDnd || directoryDnd">
      <div>
        <base-icon icon="i-carbon:folder-details-reference" :size="36" color="gray" />
        <div>{{ $t('uploadHint') }}</div>
      </div>
    </n-upload-dragger>
    <base-button
      v-else-if="componentProps?.listType !== 'image-card'"
      :button-name="buttonName ?? 'uploadFile'"
      :disabled="loading"
      :loading="loading"
      type="primary"
    >
      <template #icon>
        <base-icon icon="i-carbon:cloud-upload" />
      </template>
      <slot>
        {{ $t('uploadFile') }}
      </slot>
    </base-button>
  </n-upload>
</template>
