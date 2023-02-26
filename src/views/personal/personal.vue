<script lang="ts">
import { UserApis } from '@/service/apis/user';
import type { UserInfoType } from '@/types/user';
import BaseButton from '@c/base-ui/base-button/base-button.vue';
import type { FormItemRule } from 'naive-ui/es/form';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import type { UploadFileInfo } from 'naive-ui/es/upload';
import { CommonApis } from '@/service/apis/common/common';

interface PasswordType {
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
}

// 个人信息
const initPersonalFormSchemas = (
  handleUpdateInfo: () => Promise<void>,
  isLoadingUpdateUserInfo: boolean
): FormSchemaType => [
  {
    type: 'input',
    model: 'userName',
    formItemProps: { label: i18nt('userName'), rule: [useRules('input', 'userName'), useRuleStringLength(0, 50)] }
  },
  {
    type: 'input',
    model: 'mobilePhone',
    formItemProps: {
      label: i18nt('mobilePhone'),
      rule: [useRules('input', 'mobilePhone'), useRuleStringLength(0, 20)]
    }
  },
  {
    type: 'custom-form-item',
    formItemProps: { label: ' ' },
    render: () =>
      h(
        BaseButton,
        {
          disabled: isLoadingUpdateUserInfo,
          loading: isLoadingUpdateUserInfo,
          buttonName: 'save',
          type: 'primary',
          onClick: handleUpdateInfo
        },
        { default: () => i18nt('save') }
      )
  }
];
// 密码
const initPasswordFormSchemas = (
  passwordFormData: Ref<Nullable<PasswordType>>,
  handleUpdatePsw: () => Promise<void>
): FormSchemaType => [
  {
    type: 'input',
    model: 'oldpassword',
    formItemProps: {
      label: i18nt('oldPassword'),
      rule: [useRules('input', 'oldPassword'), useRuleStringLength(6, 20)]
    },
    componentProps: { showPasswordOn: 'mousedown', type: 'password' }
  },
  {
    type: 'input',
    model: 'newpassword',
    formItemProps: {
      label: i18nt('newPassword'),
      rule: [useRules('input', 'newPassword'), useRuleStringLength(6, 20)]
    },
    componentProps: { showPasswordOn: 'mousedown', type: 'password' }
  },
  {
    type: 'input',
    model: 'confirmpassword',
    formItemProps: {
      label: i18nt('confirmPassword'),
      rule: [
        useRules('input', 'confirmPassword'),
        {
          trigger: ['blur', 'input'],
          validator: (rule: FormItemRule, value: string) =>
            value !== passwordFormData.value?.newpassword ? new Error(i18nt('checkNewPswTip')) : true
        }
      ]
    },
    componentProps: { showPasswordOn: 'mousedown', type: 'password' }
  },
  {
    type: 'custom-form-item',
    formItemProps: { label: ' ' },
    render: () =>
      h(BaseButton, { buttonName: 'save', type: 'primary', onClick: handleUpdatePsw }, { default: () => i18nt('save') })
  }
];
</script>
<script setup lang="ts">
const useStore = useUserStore();
const appStore = useAppStore();
const { userInfo } = storeToRefs(useStore);
const { themePrimary } = storeToRefs(appStore);

const menus = [
  { title: 'personalInfo', icon: 'i-carbon:identification' },
  { title: 'password', icon: 'i-carbon:locked', key: 'password' }
];

const currentMenu = ref('personalInfo');

// 更新用户信息
const {
  formRef: formRefPersonal,
  formData: personalFormData,
  validate: validatePersonalForm
} = useForm({
  userName: userInfo?.value?.user?.userName,
  mobilePhone: userInfo?.value?.user?.mobilePhone
});
const { execute: executeUpdateUserInfo, isLoading: isLoadingUpdateUserInfo } = useAxiosPost(UserApis.updateUserInfoApi);
const handleUpdateUserInfo = async () => {
  try {
    await validatePersonalForm();
    const { error } = await executeUpdateUserInfo(__, {
      data: { id: userInfo?.value?.user?.id, ...toRaw(personalFormData.value) }
    });
    !error.value && handleGetUserInfo();
  } catch (error) {
    console.log('更新用户信息异常：', error);
  }
};
// 获取用户信息
const handleGetUserInfo = async () => {
  try {
    const { error, data } = await useAxiosGet<UserInfoType>(UserApis.getUserInfoApi, __, __, { immediate: true });
    !error.value && useStore.updateUserInfo({ ...userInfo.value, user: data?.value?.user } as UserInfoType);
  } catch (error) {
    console.log('获取用户信息异常：', error);
  }
};
const personalFormSchemas = computed(() =>
  initPersonalFormSchemas(handleUpdateUserInfo, isLoadingUpdateUserInfo.value)
);

// 更新密码
const {
  formRef: formRefPassword,
  formData: passwordFormData,
  validate: validatePasswordForm
} = useForm<Nullable<PasswordType>>({
  oldpassword: null,
  newpassword: null,
  confirmpassword: null
});
const { execute: executeUpdatePsw } = useAxiosPost(UserApis.updatePasswordApi);
const handleUpdatePsw = async () => {
  await validatePasswordForm();
  const _dialog = $dialog.warning({
    content: i18nt('changePswSuccessTip'),
    onPositiveClick: async () => {
      try {
        _dialog.loading = true;
        const { error } = await executeUpdatePsw(__, {
          data: {
            id: userInfo?.value?.user?.id,
            newpassword: passwordFormData?.value?.newpassword,
            oldpassword: passwordFormData?.value?.oldpassword
          }
        });
        !error.value && useStore.logout();
      } catch (error) {
        console.log('更新密码异常：', error);
      } finally {
        _dialog.loading = false;
      }
    }
  });
};
const passwordFormSchemas = initPasswordFormSchemas(passwordFormData, handleUpdatePsw);

// 修改头像
const { showModal, openModal, closeModal, modalTitle } = useModal();
const { beforeUpload, fileList, handleClearFileList } = useUpload({
  astrictFileType: astrictImgRule,
  clearFileList: true
});

const imgRef = ref();

// 文件change回调
const onChange = (options: { file: UploadFileInfo; fileList: UploadFileInfo[]; event?: Event }) => {
  if (!options.file.file) return;
  if (cropperInst.value) handleCropperDestroy();
  imgRef.value.src = URL.createObjectURL(options.file.file);
  initCropper();
};

// 裁剪器实例
const cropperInst = ref<Cropper | null>(null);

// 初始化裁剪器
const initCropper = () => {
  try {
    cropperInst.value = new Cropper(imgRef.value, {
      dragMode: 'move',
      viewMode: 1,
      center: false,
      autoCropArea: 0.5,
      minCropBoxWidth: 30,
      minCropBoxHeight: 30,
      checkCrossOrigin: false,
      checkOrientation: false,
      preview: [
        document.getElementById('preview-img-1'),
        document.getElementById('preview-img-2'),
        document.getElementById('preview-img-3')
      ] as HTMLElement[]
    });
  } catch (error) {
    console.log('初始化裁剪器异常：', error);
  } finally {
    handleClearFileList();
  }
};
// 上传裁剪图片
const { execute: executeUpload, isLoading: isLoadingUpload } = useAxiosPost<string>(CommonApis.uploadImgApi);
const handleSubmitUpload = () => {
  cropperInst.value?.getCroppedCanvas().toBlob(async blob => {
    try {
      const params = new FormData();
      params.append('file', blob ?? '', 'avator.png');
      const { data, error } = await executeUpload(__, { data: params, showTooltip: false });
      !error.value && handleUpdateAvator(data.value);
    } catch (error) {
      console.log('上传裁剪图片异常：', error);
    }
  });
};

// 更新头像
const { execute: executeUpdateAvator, isLoading: isLoadingUpdateAvator } = useAxiosPost(UserApis.updateAvatarApi);
const handleUpdateAvator = async (avatar?: string) => {
  try {
    if (!avatar) return;
    const { error } = await executeUpdateAvator(__, { data: { avatar, id: userInfo?.value?.user?.id } });
    !error.value && (handleGetUserInfo(), closeModal(), handleCropperDestroy());
  } catch (error) {
    console.log('更新头像异常：', error);
  }
};

// 销毁裁剪器
const handleCropperDestroy = () => {
  cropperInst.value?.destroy();
  cropperInst.value = null;
};
</script>

<template>
  <div id="personal" class="flex">
    <base-card class="w-240px py-20px">
      <div class="text-center">
        <div class="cursor-pointer relative" @click="openModal(i18nt('modifyAvator'))">
          <img
            class="w-70px h-70px rounded-full border-1 border-gray-200 border-solid"
            :src="BASE_API + '/' + userInfo?.user.avatar"
          />
          <base-icon class="absolute bottom-5px right-70px" color="grey" icon="i-carbon:camera" />
        </div>
        <p class="card-title">{{ userInfo?.user?.userID }}</p>
        <p>{{ userInfo?.user?.email }}</p>
      </div>
      <div>
        <div
          v-for="item in menus"
          :key="item.title"
          class="h-50px cursor-pointer flex items-center px-20px"
          :class="{ [`text-${themePrimary}`]: currentMenu === item.title }"
          @click="currentMenu = item.title"
        >
          <base-icon :icon="item.icon" class="mr" />
          {{ $t(item.title) }}
        </div>
      </div>
    </base-card>
    <section class="ml flex-1">
      <base-card v-if="currentMenu === 'personalInfo'" :title="$t('personalInfo')">
        <base-form ref="formRefPersonal" v-model="personalFormData" layout="base" :schemas="personalFormSchemas" />
      </base-card>
      <base-card v-if="currentMenu === 'password'" :title="$t('changePassword')">
        <base-form ref="formRefPassword" v-model="passwordFormData" layout="base" :schemas="passwordFormSchemas" />
      </base-card>
    </section>
    <!-- 头像裁剪 -->
    <base-modal
      class="cropper-modal-container w-640px!"
      :title="modalTitle"
      :show="showModal"
      :loading="isLoadingUpload || isLoadingUpdateAvator"
      @after-leave="handleCropperDestroy"
      @close="closeModal"
      @negative-click="closeModal"
      @positive-click="handleSubmitUpload"
    >
      <base-upload
        ref="uploadRef"
        v-model:file-list="fileList"
        directory-dnd
        :max="1"
        :default-upload="false"
        :show-file-list="false"
        @change="onChange"
        @before-upload="beforeUpload"
      />
      <div class="flex justify-between mt-20px">
        <div class="w-200px h-200px">
          <img ref="imgRef" />
        </div>
        <section v-show="cropperInst" class="flex items-center">
          <div id="preview-img-1" class="w-100px! h-100px! overflow-hidden border-1 border-solid border-gray-200" />
          <div
            id="preview-img-2"
            class="w-70px! h-70px! overflow-hidden rounded-full ml-20px border-1 border-gray-200 border-solid"
          />
          <div
            id="preview-img-3"
            class="w-24px! h-24px! overflow-hidden rounded-full ml-20px border-1 border-gray-200 border-solid"
          />
        </section>
      </div>
      <div v-show="cropperInst" class="mt-20px w-200px flex justify-between">
        <base-icon class="cursor-pointer" icon="i-carbon:reset" @click="cropperInst?.reset()" />
        <base-icon class="cursor-pointer" icon="i-carbon:rotate" @click="cropperInst?.rotate(-90)" />
        <base-icon class="cursor-pointer" icon="i-carbon:rotate-180" @click="cropperInst?.rotate(90)" />
        <base-icon
          class="cursor-pointer"
          icon="i-carbon:arrows-horizontal"
          @click="cropperInst?.scaleX(-cropperInst?.getData().scaleX)"
        />
        <base-icon
          class="cursor-pointer"
          icon="i-carbon:arrows-vertical"
          @click="cropperInst?.scaleY(-cropperInst?.getData().scaleY)"
        />
      </div>
    </base-modal>
  </div>
</template>

<style lang="less" scoped>
.cropper-modal-container img {
  display: block;
  max-width: 100% !important;
}
#personal {
  height: calc(~'100vh - 140px');
}
</style>
