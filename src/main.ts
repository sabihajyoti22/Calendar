import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import apiCallsPlugin from './plugin/apiCalls.ts'
import { createVuetify } from 'vuetify'
// import 'vuetify/styles'
import './style.css'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
    .then(() => {
      console.log("Service worker is registered")
    })
    .catch(() => {
      console.log("Service worker is not registered") 
    })
} else {
  console.log("Your browser doesn't support service worker")
}

const vuetify = createVuetify()

const app = createApp(App)
app.use(router)
app.use(apiCallsPlugin)
app.use(vuetify)
app.mount('#app')
