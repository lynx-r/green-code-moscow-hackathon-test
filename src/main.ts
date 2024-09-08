import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { createYmaps } from 'vue-yandex-maps'
import { YMAPS_KEY } from './env'

const app = createApp(App)

app.use(
  createYmaps({
    apikey: YMAPS_KEY
  })
)
app.use(createPinia())
app.use(router)

app.mount('#app')
