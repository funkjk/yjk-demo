import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Notifications from '@kyvg/vue3-notification'
// import yjs from './plugins/yjs'
import yjspinia from './plugins/yjs-pinia'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia';
const pinia = createPinia();
pinia.use(yjspinia)

loadFonts()

createApp(App)
.use(vuetify)
.use(pinia)
.use(Notifications)
// .use(yjs)
  .mount('#app')
