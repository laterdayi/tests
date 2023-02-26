<script lang="tsx">
import type { LoginType } from '@/service/apis/user';
import type { LocalType } from 'semi-theme-vars';

const initFormSchemas = (
  formData: Ref<Nullable<LoginType>>,
  lang: Ref<string>,
  toggleLocales: (val: string) => void,
  handleLogin: () => Promise<void>,
  isLoading: Ref<boolean>
): FormSchemaType => [
  {
    type: 'custom-form-item',
    render() {
      return (
        <n-radio-group v-model:value={formData.value.loginType}>
          <n-radio-button value={1} label={i18nt('account')}></n-radio-button>
          <n-radio-button value={2} label="LDAP"></n-radio-button>
        </n-radio-group>
      );
    }
  },
  {
    type: 'input',
    model: 'username',
    formItemProps: {
      label: i18nt('userName'),
      rule: [useRules('input', 'userName'), useRuleStringLength()],
      showLabel: false
    },
    componentProps: {
      autofocus: true,
      onKeydown: (e: KeyboardEvent) => e.key === 'Enter' && handleLogin()
    },
    slots: [{ name: 'prefix', render: () => <base-icon icon="i-carbon:user"></base-icon> }],
    class: 'w-full!'
  },
  {
    type: 'input',
    model: 'password',
    formItemProps: {
      label: i18nt('password'),
      rule: [useRules('input', 'password'), useRuleStringLength()],
      showLabel: false
    },
    componentProps: {
      type: 'password',
      showPasswordOn: 'mousedown',
      onKeydown: (e: KeyboardEvent) => e.key === 'Enter' && handleLogin()
    },
    slots: [{ name: 'prefix', render: () => <base-icon icon="i-carbon:locked"></base-icon> }],
    class: 'w-full!'
  },
  {
    type: 'custom-form-item',
    render: () => (
      <section class="w-full border-1 border-red rounded-4px">
        <base-icon class="absolute top-10px left-16px z-30" icon="i-carbon:language" />
        <n-select
          value={lang.value}
          options={[
            { label: '中文', value: 'zh-CN' },
            { label: 'English', value: 'en' }
          ]}
          onUpdateValue={(val: string) => toggleLocales(val)}
        />
      </section>
    )
  },
  {
    type: 'custom-form-item',
    render: () => (
      <base-button
        class="w-full"
        size="large"
        loading={isLoading.value}
        disabled={isLoading.value}
        button-name="login"
        shouldRecord={false}
        type="primary"
        onClick={() => handleLogin()}>
        {i18nt('login')}
      </base-button>
    )
  }
];
</script>
<script setup lang="tsx">
const appStore = useAppStore();
const router = useRouter();
const userStore = useUserStore();
const { local, themePrimary } = storeToRefs(appStore);

const { formData, validate, formRef } = useForm<Nullable<LoginType>>({
  username: null,
  password: null,
  loginType: 1
});

// 语言设置
const lang = ref(local);
const { locale } = useI18n();

// 更改语言
const toggleLocales = (val: string) => {
  if (locale.value === val) return;
  $dialog.warning({
    content: i18nt('toggleLanguageTips', { val }),
    onPositiveClick: () => {
      try {
        appStore.setLocal(val as LocalType);
        location.reload();
      } catch (error) {
        console.log('切换语言异常：', error);
      }
    }
  });
};

// 登录
const isLoading = ref(false);
const handleLogin = async () => {
  try {
    await validate();
    isLoading.value = true;
    await userStore.login(formData.value as LoginType);
    useButtonClickRecord('login');
    router.push('/');
  } catch (error) {
    console.log('登录异常：', error);
  } finally {
    isLoading.value = false;
  }
};

const formSchemas = initFormSchemas(formData, lang, toggleLocales, handleLogin, isLoading);
</script>

<template>
  <div id="login" class="w-full h-full flex" un-cloak>
    <section class="left-area">
      <div class="flex items-center ml-40px mt-40px">
        <img src="@/assets/images/login/semi-logo.png" class="h-32px" />
        <div class="w-2px h-20px bg-#ccc mx" />
        <img src="@/assets/images/login/e-fab-logo.png" class="h-32px" />
      </div>
    </section>
    <section class="right-area">
      <div class="w-400px">
        <div class="flex-center mb-80px">
          <img src="@/assets/images/login/e-fab-mini-logo.png" class="h-40px mr" />
          <div class="right-area-title text-36px text-center">{{ $t('loginPage.form.title') }} E-Fab</div>
        </div>
        <base-form ref="formRef" v-model="formData" size="large" layout="base" :schemas="formSchemas" />
      </div>
      <span class="copyright">Copyright @ 2021-2022 SEMI-TECH. All Rights Reserved</span>
    </section>
  </div>
</template>

<style lang="less" scoped>
#login {
  background-color: #f5fcff;
  .left-area {
    flex: 1;
    background: url('@/assets/images/login/login-bg.png') no-repeat;
    background-position: 50%;
  }
  .right-area {
    position: relative;
    width: 500px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: white;
    border: 2px solid rgba(255, 255, 255, 1);
    margin: 40px 40px 40px 0;
    border-radius: var(--border-radius-large);
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.12), 0px 4px 5px 0px rgba(0, 0, 0, 0.08),
      0px 1px 10px 0px rgba(0, 0, 0, 0.05);
    &-title {
      color: v-bind(themePrimary);
    }
  }
  .copyright {
    position: absolute;
    bottom: var(--margin);
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
  }
  :deep(.n-base-selection .n-base-selection-label) {
    padding-left: 28px;
  }
}
</style>
