import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import apiCallsPlugin from './plugin/apiCalls.ts'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(apiCallsPlugin)
app.mount('#app')
