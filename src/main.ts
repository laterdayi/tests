import { createApp } from 'vue';
import AppProvider from './AppProvider.vue';
import router from './router';
import { setupPlugins } from './plugins/core';

import './style/index.less';

const app = createApp(AppProvider);

// 注册插件
setupPlugins(app, router);

// 为应用内抛出的未捕获错误
app.config.errorHandler = (err, instance, info) => {
  console.log(err, instance, info);
};

// 运行时警告
app.config.warnHandler = (msg, instance, trace) => {
  console.log(msg, instance, trace);
};

app.use(router).mount('#app');
