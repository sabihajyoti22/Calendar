import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import apiCallsPlugin from './plugin/apiCalls.ts'
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

if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
} else if (Notification.permission !== "denied") {
    // Notification.requestPermission().then((permission) => {
    //     if (permission === "granted") {
    //         this.notifications(title, msg, icon, song)
    //     }
    // })
    alert("Please turn on notification")
}

const app = createApp(App)
app.use(router)
app.use(apiCallsPlugin)
app.mount('#app')
