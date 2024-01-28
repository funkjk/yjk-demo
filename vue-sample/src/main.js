import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import yjs from './plugins/yjs'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia';
const pinia = createPinia();

loadFonts()

createApp(App)
.use(vuetify)
.use(pinia)
.use(yjs)
  .mount('#app')
