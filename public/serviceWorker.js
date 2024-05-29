const staticCacheName = "site-static"
const assets = [
  '/src/style.css',
  '/src/assets/fonts/LilitaOne-Regular.ttf'
]

self.addEventListener('install', evt => {
  console.log("Service worker installed")
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener('activate', evt => {
  console.log(evt)
  console.log("Service worker activated")
})

self.addEventListener("fetch", evt => {
  console.log(evt.request.url)
})