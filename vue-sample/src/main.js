import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Notifications from '@kyvg/vue3-notification'
import yjspinia from './plugins/yjs-pinia'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia';
import awareness from './plugins/yjs-awareness'
const pinia = createPinia();
pinia.use(yjspinia)

loadFonts()

createApp(App)
  .use(vuetify)
  .use(pinia)
  .use(awareness)
  .use(Notifications)
  .mount('#app')

