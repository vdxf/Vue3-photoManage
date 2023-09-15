import { createApp } from 'vue'
import pinia from '@/store'
import App from './App.vue'
import router from './router'

import './assets/js/flexible.js'
import '@/assets/icon/iconfont.css'

import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(Vant)
app.mount('#app')
