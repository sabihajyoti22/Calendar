// const staticCacheName = "site-static-v0"
// const dynamicCacheName = "site-dynamic-v0"
// const offlineURL = '/src/views/Offline.vue'
// const assets = [
//   '/src/style.css',
//   '/src/assets/fonts/LilitaOne-Regular.ttf',
//   '/images/icon-144x144.png',
//   '/src/views/Offline.vue'
// ]

let events = []
let checked = false
let currentEvent = null
let today = null
const channel2 = new BroadcastChannel('channel2')

const checkEvents = () => {
  console.log(events)
  console.log(checked)
  today = new Date()
  currentEvent = events.filter((el) => el.day === today.getDate() && (today.getMonth() + 1) === el.month && today.getFullYear() === el.year)

  if (currentEvent.length) {
    if (((currentEvent[0].time === 'PM' && currentEvent[0].currentHour + 12 === new Date().getHours()) || currentEvent[0].currentHour === new Date().getHours()) && currentEvent[0].currentMintue === new Date().getMinutes()) {
      // sendNotification()
      channel2.postMessage({
        toDo: 'sendNotification',
        data: currentEvent[0]
      })
    }
  }
  if(checked){
    const timeoutVar = setTimeout(() => {
      checkEvents()
      clearTimeout(timeoutVar)
    }, 1000)
  }
}

channel2.onmessage = (event) => {
  events = event.data.data
  if(events.length){
    if(!checked){
      checked = true
      checkEvents()
    }
  }else{
    checked = false
  }
}

self.addEventListener('install', () => {
  console.log('Service worker installed')
  // evt.waitUntil(
  //   caches.open(staticCacheName).then(cache => {
  //     cache.addAll(assets)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // )
})

self.addEventListener('activate', () => {
  console.log("Service worker activated")
  // evt.waitUntil(
  //   caches.keys().then(keys => {
  //     return Promise.all(keys
  //       .filter(key => key !== staticCacheName)
  //       .map(key => caches.delete(key))
  //     )
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // )
})

// self.addEventListener("fetch", (evt) => {
//   evt.respondWith(
//     caches.match(evt.request).then(cacheRes => {
//       return cacheRes || fetch(evt.request)
//         .then(fetchRes => {
//           return caches.open(dynamicCacheName).then(cache => {
//             cache.put(evt.request.url, fetchRes.clone())
//             return fetchRes
//           })
//         })
//         .catch(() => {
//           if (evt.request.url.indexof('.vue') >= 0) {
//             return caches.match(offlineURL)
//           }
//         })
//     })
//   )
// })