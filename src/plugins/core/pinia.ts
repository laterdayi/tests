import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export function setupStore(app: App) {
  app.use(pinia);
}
