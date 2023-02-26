module.exports = {
  //  继承的规则
  extends: ['@commitlint/config-conventional'],
  roles: {
    // type类型定义：提交的type必须在以下的类型范围内
    'type-enum': [
      // 错误级别
      2,
      // 在什么情况下验证
      'always',
      [
        // 新功能 feature
        'feat',
        // 修复 bug
        'fix',
        // 文档注释
        'docs',
        // 代码格式（不影响代码运行的变动）
        'style',
        // 重构 （既不新增，也不修复bug）
        'refactor',
        // 性能优化
        'perf',
        // 增加测试
        'test',
        // 构建过程或辅助工具的变动
        'chore',
        // 回退
        'revert',
        // 打包
        'build'
      ]
    ],
    // 不检验 subject 大小写
    'subject-case': [0]
  },
  prompt: {
    messages: {
      type: '选择提交的类型 :',
      scope: '选择修改范围（可选）:',
      customScope: '请输入修改范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #101 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: 'feat', name: 'feat:     ✨  新增功能 | A new feature', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      🐛  修复缺陷 | A bug fix', emoji: ':bug:' },
      {
        value: 'docs',
        name: 'docs:     📝  文档更新 | Documentation only changes',
        emoji: ':memo:'
      },
      {
        value: 'style',
        name: 'style:    💄  代码格式 | Changes that do not affect the meaning of the code',
        emoji: ':lipstick:'
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️   代码重构 | A code change that neither fixes a bug nor adds a feature',
        emoji: ':recycle:'
      },
      {
        value: 'perf',
        name: 'perf:     ⚡️  性能提升 | A code change that improves performance',
        emoji: ':zap:'
      },
      {
        value: 'test',
        name: 'test:     ✅  测试相关 | Adding missing tests or correcting existing tests',
        emoji: ':white_check_mark:'
      },
      {
        value: 'build',
        name: 'build:    📦️  构建相关 | Changes that affect the build system or external dependencies',
        emoji: ':package:'
      },
      {
        value: 'ci',
        name: 'ci:       🎡  持续集成 | Changes to our CI configuration files and scripts',
        emoji: ':ferris_wheel:'
      },
      { value: 'revert', name: 'revert:   ⏪️  回退代码 | Revert to a commit', emoji: ':hammer:' },
      {
        value: 'chore',
        name: 'chore:    🔨  其他修改 | Other changes that do not modify src or test files',
        emoji: ':rewind:'
      }
    ],
    useEmoji: true,
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: ['body', 'breaking', 'footerPrefix', 'customFooterPrefixs'],
    issuePrefixs: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
};
