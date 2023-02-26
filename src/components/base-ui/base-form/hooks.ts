import type { BaseFormRefType } from '@/components/base-ui/base-form/type';
import type { FormItemRule, FormValidationError } from 'naive-ui';
import type { UnwrapRef } from 'vue';

/**
 * @param {*} T 原始表单数据
 * @return {*}
 */
export const useForm = <T = any>(data: T) => {
  // 表单数据
  const initData = data;

  const formData = ref<T>({ ...initData });

  // 表单模板引用
  const formRef = ref<BaseFormRefType | null>(null);

  // 重置表单验证
  const restoreValidation = () => formRef?.value?.baseFormRef?.restoreValidation();

  // 表单验证
  const validate = (
    validateCallback?: (errors?: FormValidationError[]) => void,
    shouldRuleBeApplied?: (rule: FormItemRule) => boolean
  ) => formRef?.value?.baseFormRef?.validate(validateCallback, shouldRuleBeApplied);

  // 更新表单数据
  const updateField = (fields: Partial<T> | null | undefined) => {
    if (!fields) return;
    formData.value = { ...toRaw(formData.value ?? {}), ...fields } as UnwrapRef<T>;
  };

  // 重置表单数据，并移出校验
  const resetField = () => {
    updateField(initData);
    restoreValidation();
  };

  /**
   * ref [] > {}
   * @description:  过滤列表选择项提供给表单
   * @return {*}
   */
  const useFilterSelectedData = <T = any, Q = any>(selectedList?: T, formData?: Q) => {
    const list = toRaw(selectedList) as unknown as object[];
    return pick(list?.at(0), Object.keys(formData ?? {})) as unknown as Q;
  };

  return {
    updateField,
    resetField,
    formData,
    formRef,
    restoreValidation,
    validate,
    useFilterSelectedData
  };
};
