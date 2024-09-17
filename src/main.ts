import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import apiCallsPlugin from './plugin/apiCalls.ts'
import './style.css'

const channel1 = new BroadcastChannel('channel1')

if (!("Notification" in window)) {
    alert("Your browser doesn't support push notification")
} else {
    Notification.requestPermission().then(res => {
        if (res !== 'granted') {
            alert("You won't get any notification")
        }
    })
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
        .then(() => {
            console.log("Service worker is registered")
            // navigator.serviceWorker.controller?.postMessage('InitiateIndexedDB')
        })
        .catch(() => {
            console.log("Service worker is not registered")
        })
} else {
    alert("Your browser doesn't support service worker")
}

navigator.serviceWorker.ready.then((reg) => {
    // reg.active?.postMessage('InitiateIndexedDB')
    channel1.postMessage('initialised IndexedDB')
})

const app = createApp(App)
app.use(router)
app.use(apiCallsPlugin)
app.mount('#app')
