const staticCacheName = "site-static-v1"
const dynamicCacheName = "site-dynamic-v1"
const offlineURL = '/src/views/Offline.vue'
const assets = [
  '/src/style.css',
  '/src/assets/fonts/LilitaOne-Regular.ttf',
  '/images/icon-144x144.png',
  '/src/views/Offline.vue'
]

let db = null
let events = []
let currentEvent = null
let today = null

const initiateIndexedDB = () => {
  const request = indexedDB.open("Calendar", 1)

  request.onerror = (err) => {
    console.error(`Database error: ${err.target.errorCode}`);
  }

  request.onsuccess = (evt) => {
    db = evt.target.result
    if(db.objectStoreNames.length){
      getAllEvents()
    }
  }
}

const getAllEvents = () => {
  const request = db.transaction('events').objectStore('events').getAll();

  request.onerror = (err) => {
    console.error(`Error to get all events: ${err}`)
  }

  request.onsuccess = () => {
    events = JSON.parse(JSON.stringify(request.result))
    console.log(events)
    today = new Date()
    currentEvent = events.filter((el) => el.day === today.getDate() && (today.getMonth() + 1) === el.month && today.getFullYear() === el.year)

    if(currentEvent.length){
      if(((currentEvent[0].time === 'PM' && currentEvent[0].currentHour + 12 === new Date().getHours()) || currentEvent[0].currentHour === new Date().getHours()) && currentEvent[0].currentMintue === new Date().getMinutes()){
        sendNotification()
      }
    }
    setTimeout(() => {
      getAllEvents()
    }, 60000)
  }
}

const sendNotification = () => {
  const title = 'Calendar App'
  const options = {
    body: `${currentEvent[0].title} is on ${currentEvent[0].currentHour} : ${currentEvent[0].currentMintue} ${currentEvent[0].time}`,
    icon: "./images/calendarLogo.jpg"
  }
  self.registration.showNotification(title, options)
}

self.addEventListener('install', evt => {
  console.log("Service worker installed")
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
       cache.addAll(assets)
     }).catch(err => {
       console.log(err)
     }),
    initiateIndexedDB()
  )
})

self.addEventListener('activate', evt => {
  console.log("Service worker activated")
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      )
    }).catch(err => {
      console.log(err)
    })
  )
})

// const limitCacheSize = (name, size) => {
//   caches.open(name).then(cache => {
//     cache.keys().then(keys => {
//       if (keys.length > size) {
//         cache.delete(keys[0]).then(limitCacheSize(name, size))
//       }
//     })
//   })
// }

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request)
        .then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone())
            return fetchRes
          })
        })
        .catch(() => {
          if (evt.request.url.indexof('.vue') >= 0) {
            return caches.match(offlineURL)
          }
        })
    })
  )
})