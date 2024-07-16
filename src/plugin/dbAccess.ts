export default {
    install: (app: any) => {
        app.config.globalProperties.$initiateDB = () => {
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
        }
    }
}