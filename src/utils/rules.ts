import type { FormItemRule } from 'naive-ui';

type Rules =
  | 'onlyNotChineseRule'
  | 'onlyChineseRule'
  | 'onlyNegativeIntRule'
  | 'onlyPositiveIntRule'
  | 'onlyPositiveIntZeroRule'
  | 'officePhoneRule'
  | 'mobilePhoneRule'
  | 'emailRule'
  | 'onlyNumbersRule'
  | 'onlyLetterRule'
  | 'onlyLowercaseRule'
  | 'onlyUppercaseRule'
  | 'ipRule'
  | 'onlyIntRule';

type PresetRuletType = {
  [K in Rules]?: {
    rule: RegExp;
    errorMessage: string;
  };
};

type ValidationTrigger = 'input' | 'change' | 'input-number';

type PrefixType = {
  [K in ValidationTrigger]: string;
};

// 预设规则
const presetRule: PresetRuletType = {
  officePhoneRule: {
    rule: /((^0\d{2,3})-?)?\d+$/,
    errorMessage: i18nt('rules.officePhoneRule')
  },
  mobilePhoneRule: {
    rule: /^(?:(?:\+|00)86)?1\d{10}$/,
    errorMessage: i18nt('rules.mobilePhoneRule')
  },
  emailRule: {
    rule: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    errorMessage: i18nt('rules.emailRule')
  },
  onlyNumbersRule: { rule: /^\d+$/, errorMessage: i18nt('rules.onlyNumbersRule') },
  onlyLetterRule: { rule: /^[a-zA-Z]+$/, errorMessage: i18nt('rules.onlyLetterRule') },
  onlyLowercaseRule: { rule: /^[a-z]+$/, errorMessage: i18nt('rules.onlyLowercaseRule') },
  onlyUppercaseRule: { rule: /^[A-Z]+$/, errorMessage: i18nt('rules.onlyUppercaseRule') },
  onlyIntRule: { rule: /^(?:0|(?:-?[1-9]\d*))$/, errorMessage: i18nt('rules.onlyIntRule') },
  onlyPositiveIntRule: { rule: /^\+?[1-9]\d*$/, errorMessage: i18nt('rules.onlyPositiveIntRule') },
  onlyPositiveIntZeroRule: { rule: /^\+?[0-9]\d*$/, errorMessage: i18nt('rules.onlyPositiveIntZeroRule') },
  onlyNegativeIntRule: { rule: /^-[0-9]\d*$/, errorMessage: i18nt('rules.onlyNegativeIntRule') },
  ipRule: {
    rule: /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/,
    errorMessage: i18nt('rules.ipRule')
  },
  onlyChineseRule: { rule: /[\u4e00-\u9fa5]+$/, errorMessage: i18nt('rules.onlyChineseRule') },
  onlyNotChineseRule: {
    rule: /[^\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]$/,
    errorMessage: i18nt('rules.onlyNotChineseRule')
  }
};

// 默认前缀
const prefix: PrefixType = {
  input: 'baseForm.pleaseInput',
  'input-number': 'baseForm.pleaseInput',
  change: 'baseForm.pleaseSelect'
};

const validate = (type: Rules, val: string, required: boolean, label?: string) => {
  try {
    if (!required && !val) return true;
    if (!isRegExp(presetRule[type]?.rule)) throw Error('非RegExp表达式');
    if (required && (typeof val === 'number' ? val === null || val === undefined : !val))
      return new Error(i18nt(prefix.input, { val: i18nt(label ?? '') }));
    if (!presetRule[type]?.rule.test(val)) return new Error(presetRule[type]?.errorMessage);
    return true;
  } catch (error) {
    console.log('Rule验证失败', error);
  }
};

export function useRules(trigger: ValidationTrigger, type: string): FormItemRule;
export function useRules(trigger: ValidationTrigger, type: Rules, required?: boolean, label?: string): FormItemRule;
export function useRules(
  trigger: ValidationTrigger,
  type: string | Rules,
  required = true,
  label?: string
): FormItemRule {
  const params: FormItemRule = {
    trigger: ['blur', trigger === 'input-number' ? 'change' : trigger]
  };
  if (required) params.required = required;
  if (trigger === 'input-number') params.type = 'number';
  if (Object.keys(presetRule).includes(type)) {
    params.validator = (rule: FormItemRule, value: string) => validate(type as Rules, value, required, label);
  } else {
    params.message = i18nt(prefix[trigger], { val: i18nt(type) });
  }
  return params;
}

/**
 * @description: String 输入长度限制
 * @param {*} minLength 最小长度
 * @param {*} maxLength 最大长度
 * @param {*} message 反馈
 * @return {*} FormItemRule
 */
export const useRuleStringLength = (min = 0, max = MAX_LENGTH_INPUT, message?: string): FormItemRule => ({
  min,
  max,
  message: message
    ? i18nt(message)
    : min === 0
    ? i18nt('rules.onlyMaxLengthRule', { max })
    : max === 0
    ? i18nt('rules.onlyMinLengthRule', { min })
    : i18nt('rules.lengthRule', { min, max }),
  trigger: ['blur', 'input']
});

/**
 * @description: Number 输入长度限制
 * @param {*} min 最小长度
 * @param {*} max 最大长度
 * @param {string} message 反馈
 * @return {*} FormItemRule
 */
export const useRuleNumberLength = (min = 0, max = MAX_LENGTH_INPUT_NUMBER, message?: string): FormItemRule => ({
  type: 'number',
  trigger: ['blur', 'change'],
  min: min === 0 ? 0 : Math.pow(10, min),
  max: Math.pow(10, max) - 1,
  message: message
    ? i18nt(message)
    : min === 0
    ? i18nt('rules.onlyMaxLengthRule', { max })
    : max === 0
    ? i18nt('rules.onlyMinLengthRule', { min })
    : i18nt('rules.lengthRule', { min, max })
});

/**
 * @description: Number 输入大小限制
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @param {string} message 反馈
 * @return {*} FormItemRule
 */
export const useRuleNumberSize = (
  min = 0,
  max: number = Math.pow(10, MAX_LENGTH_INPUT_NUMBER) - 1,
  message?: string
): FormItemRule => ({
  type: 'number',
  trigger: ['blur', 'change'],
  min,
  max,
  message: message
    ? i18nt(message)
    : min === 0
    ? i18nt('rules.onlyMaxSizeRule', { max })
    : max === 0
    ? i18nt('rules.onlyMinSizeRule', { min })
    : i18nt('rules.sizeRule', { min, max })
});
