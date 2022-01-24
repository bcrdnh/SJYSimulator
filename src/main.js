import { createApp } from 'vue'
import { store } from './store'
import { router } from './router'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/font.css'
import 'nes.css/css/nes.min.css'

const app = createApp(App)
app.config.productionTip = false

app.use(store)
app.use(router)
app.use(Antd)

app.mount('#app')
