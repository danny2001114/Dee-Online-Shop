// app
import { createApp } from 'vue'
import App from './Views/Layouts/App.vue'
import router from './router'

// directives
import adjustWidth from '@/App/directives/adjustWidth'

// providers
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/App/firebase'

// css
import 'element-plus/dist/index.css'
import '@/assets/css/style.css'

// ======================= create app ======================= //
const app = createApp(App);
// directives
app.directive('adjust-width', adjustWidth);

// global
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
    .use(ElementPlus)
    .use(VueFire, {
      firebaseApp,
      modules: [VueFireAuth()]
    })
    .use(router)

app.mount('#app')
