import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
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
// .use(yjs)
  .mount('#app')
