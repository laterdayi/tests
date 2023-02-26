/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  // 当前目录即为根目录，ESLint规则将被限制到该目录下
  root: true,
  env: {
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  plugins: ['standard-recommended'],
  // 基础配置继承
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    './.eslintrc-auto-import.json'
  ],
  // 解析器
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    }
  },
  /*
   * 需要修改的启用规则以及各自的错误类别
   * off 或 0  - 关闭规则
   * warn 或 1 - 开启规则，使用警告级别的错误，不会导致程序退出
   * error 或 2  - 开启规则，使用错误级别的错误，当被触发时候，程序会退出
   */
  rules: {
    // -------------------------------------------------------------------------------------------- > 文件

    // 禁止文件命名为 index
    'standard-recommended/no-index': 'error',
    // -------------------------------------------------------------------------------------------- > Eslint https://eslint.bootcss.com/docs/rules/
    'prettier/prettier': ['warn', { printWidth: 120 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 要求使用 === 和 !==
    eqeqeq: 'error',
    // 禁用 alert、confirm 和 prompt
    'no-alert': 'error',
    // 引号
    quotes: 'off',
    // 禁止修改const声明的变量
    'no-const-assign': 'error',
    // 禁止eval函数
    'no-eval': 'error',
    // 禁用隐式的eval
    'no-implied-eval': 'error',
    // 语句强制分号结尾
    semi: 'off',
    // 禁止出现多个空格
    'no-multi-spaces': 'error',
    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new-wrappers': 'error',
    // 禁用 Script URL
    'no-script-url': 'error',
    // 禁止自身比较
    'no-self-compare': 'error',
    // 禁止多余的 return 语句
    'no-useless-return': 'error',
    // 禁止使用void操作符
    'no-void': 'error',
    // 禁止使用不带 await 表达式的 async 函数
    'require-await': 'error',
    // 要求 IIFE 使用括号括起来
    'wrap-iife': ['error', 'inside'],
    // 要求或禁止 Yoda 条件
    yoda: 'error',
    // 禁止未定义
    'no-undef': 'off',
    // 	禁止在变量定义之前使用
    'no-use-before-define': 'off',
    // 要求 require() 出现在顶层模块作用域中
    'global-require': 'error',
    // 禁止调用 require 时使用 new 操作符
    'no-new-require': 'error',
    // 强制使用骆驼拼写法命名约定
    camelcase: 'error',
    // 禁止末尾逗号
    'comma-dangle': 'error',
    // 强制行注释的位置
    'line-comment-position': 'error',
    // 强制可嵌套的块的最大深度
    'max-depth': 'error',
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': 'error',
    // 强制对多行注释使用特定风格
    'multiline-comment-style': 'error',
    // 禁止在代码后使用内联注释
    'no-inline-comments': 'error',
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 'error',
    // 禁用行尾空格
    'no-trailing-spaces': 'error',
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unneeded-ternary': 'error',
    // 禁止属性前有空白
    'no-whitespace-before-property': 'error',
    // 要求简化赋值操作
    'operator-assignment': 'error',
    // 禁止块内填充
    'padded-blocks': ['error', 'never'],
    // 禁止函数圆括号之前有一个空格
    'space-before-function-paren': 'off',
    // 禁止函数圆括号之前有一个空格
    'spaced-comment': 'error',
    // 强制在 switch 的冒号左右空格
    'switch-colon-spacing': 'error',
    // 禁止重复模块导入
    'no-duplicate-imports': 'error',
    // 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字
    'no-useless-rename': 'error',
    // 要求使用 let 或 const 而不是 var
    'no-var': 'error',
    // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': 'error',
    // 要求所有 switch 语句都有 default
    'default-case': 'error',
    // 强制 switch 语句中的 default 在最后
    'default-case-last': 'error',
    // 强制默认参数在最后
    'default-param-last': 'error',
    // 要求构造函数名称以大写字母开头
    'new-cap': 'error',
    // 在 if 语句中，禁止在 return 语句后使用 else 块
    'no-else-return': 'error',
    // 不允许空函数
    'no-empty-function': 'error',
    // 禁止不必要的嵌套块
    'no-lone-blocks': 'error',
    // 禁止不必要的 return await
    'no-return-await': 'error',
    // 不允许数组括号内有空格
    'array-bracket-spacing': 'error',
    // 箭头函数参数需要括号，在可以省略的地方不强制执行括号
    'arrow-parens': ['error', 'as-needed'],
    // 在箭头函数中的箭头前后强制执行一致的间距
    'arrow-spacing': 'error',
    // 为块强制执行一致的大括号样式
    'brace-style': 'error',
    // 在逗号前后强制执行一致的间距
    'comma-spacing': 'error',
    // 在对象文字属性中强制 key 和 value 间的一致间距
    'key-spacing': 'error',
    // 在关键字前后强制使用一致的间距
    'keyword-spacing': 'error',
    // 要求班级成员之间有一个空行
    'lines-between-class-members': 'error',
    // 不允许多个空行
    'no-multiple-empty-lines': 'error',
    // 强制执行单行语句的位置
    'nonblock-statement-body-position': 'error',
    // 在大括号内强制执行一致的间距
    'object-curly-spacing': ['error', 'always'],
    // 在大括号内强制执行一致的间距
    'rest-spread-spacing': 'error',
    // 在块之前强制执行一致的间距
    'space-before-blocks': 'error',
    // 在括号内强制使用一致的间距
    'space-in-parens': 'error',

    // -------------------------------------------------------------------------------------------- > TypeScript https://typescript-eslint.io/rules

    // 始终对数组使用T[]
    '@typescript-eslint/array-type': 'error',

    /*
     * 不允许等待不是 Thenable 的值
     * '@typescript-eslint/await-thenable': 'error',
     */
    // 不允许重复的枚举成员值
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    // 不允许声明空接口
    '@typescript-eslint/no-empty-interface': 'error',
    // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
    '@typescript-eslint/no-inferrable-types': 'error',
    // 禁止定义未使用的变量
    '@typescript-eslint/no-unused-vars': 'error',
    // 禁止使用 any 类型
    '@typescript-eslint/no-explicit-any': 'warn',
    // 禁止命名空间
    '@typescript-eslint/no-namespace': 'off',
    // 强制使用简洁的可选链式表达式，而不是链式逻辑与、否定逻辑或或空对象
    '@typescript-eslint/prefer-optional-chain': 'off',

    // 命名约定
    '@typescript-eslint/naming-convention': [
      'error',
      // 强制 接口 类型别名 枚举 为大驼峰
      { selector: ['interface', 'typeAlias', 'enum'], format: ['PascalCase'] },
      // 强制 函数 参数 为小驼峰
      { selector: ['function', 'parameter'], format: ['camelCase'] },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require'
      }
    ],
    /*
     * 在并非旨在处理它们的地方禁止 Promises
     * '@typescript-eslint/no-misused-promises': 'error',
     * 不允许类型始终为真或始终为假的条件
     * '@typescript-eslint/no-unnecessary-condition': 'error',
     * 强制includes方法优于indexOf方法
     * '@typescript-eslint/prefer-includes': 'error',
     * 要求任何返回 Promise 的函数或方法被标记为异步
     * '@typescript-eslint/promise-function-async': 'error',
     */

    // -------------------------------------------------------------------------------------------- > Vue https://eslint.vuejs.org/rules

    // 标签自闭和
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    // 在多行元素的内容之前和之后强制换行。
    'vue/multiline-html-element-content-newline': 'error',
    // 属性中的等号周围不允许有空格
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    // 禁止在外部作用域中声明的隐藏变量中的变量声明
    'vue/no-template-shadow': 'error',
    // 关闭响应式结构默认值
    'vue/no-setup-props-destructure': 'off',
    // 为 Vue 组件中的 Prop 名称强制使用特定大小写
    'vue/prop-name-casing': 'error',
    // 组件名称始终为多词
    'vue/multi-word-component-names': 'off',
    // 禁止使用 v-html 来防止 XSS 攻击
    'vue/no-v-html': 'off'
  },
  overrides: [
    {
      files: [
        'src/components/base-chart/**/*',
        'src/components/base-curd/base-curd.vue',
        'src/components/base-ui/**/*',
        'src/types/global.d.ts',
        'src/utils/component.ts',
        'src/utils/extends.ts',
        'src/utils/localstorage.ts'
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    },
    {
      files: ['src/directive/index.ts', 'src/plugins/core/index.ts', 'src/service/index.ts', 'src/router/index.ts'],
      rules: {
        'standard-recommended/no-index': 'off'
      }
    },
    {
      files: ['env.d.ts'],
      rules: {
        'multiline-comment-style': 'off',
        'spaced-comment': 'off'
      }
    }
  ]
};
