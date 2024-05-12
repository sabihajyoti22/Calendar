import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

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

createApp(App).mount('#app')
