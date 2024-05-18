import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import apiCallsPlugin from './plugin/apiCalls.ts'

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/worker/ServiceWorker.js')
//     .then(() => {
//       console.log("Service worker is registered")
//     })
//     .catch(() => {
//       console.log("Service worker is not registered")
//     })
// } else {
//   console.log("Your browser doesn't support service worker")
// }

const app = createApp(App)
app.use(router)
app.use(apiCallsPlugin)
app.mount('#app')
