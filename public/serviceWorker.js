// const staticCacheName = "site-static-v0"
// const dynamicCacheName = "site-dynamic-v0"
// const offlineURL = '/src/views/Offline.vue'
// const assets = [
//   '/src/style.css',
//   '/src/assets/fonts/LilitaOne-Regular.ttf',
//   '/images/icon-144x144.png',
//   '/src/views/Offline.vue'
// ]

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