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
let objectStore = null
let events = []
let currentEvent = null
let today = null
let interval
const channel2 = new BroadcastChannel('channel2')

const initiateIndexedDB = () => {
  const request = indexedDB.open("Calendar", 1)

  request.onerror = (err) => {
    console.error(`Database error: ${err.target.errorCode}`);
  }

  request.onsuccess = (evt) => {
    db = evt.target.result
    getAllEvents()
    checkEvents()
  }

  request.onupgradeneeded = (evt) => {
    db = evt.target.result
    const objectStore = db.createObjectStore("events", { keyPath: "id" })
    objectStore.createIndex("id", "id", { unique: true })
  }

  console.log('Initiate IndexedDB')
}

const getAllEvents = () => {
  const request = db.transaction('events').objectStore('events').getAll();

  request.onerror = (err) => {
    console.error(`Error to get all events: ${err}`)
  }

  request.onsuccess = () => {
    events = JSON.parse(JSON.stringify(request.result))
    channel2.postMessage({
      toDo: 'getAllEvents',
      data: events
    })
  }
}

const checkEvents = () => {
  const request = db.transaction('events').objectStore('events').getAll();

  request.onerror = (err) => {
    console.error(`Error to get all events: ${err}`)
  }

  request.onsuccess = () => {
    events = JSON.parse(JSON.stringify(request.result))

    today = new Date()
    currentEvent = events.filter((el) => el.day === today.getDate() && (today.getMonth() + 1) === el.month && today.getFullYear() === el.year)

    if (currentEvent.length) {
      if (((currentEvent[0].time === 'PM' && currentEvent[0].currentHour + 12 === new Date().getHours()) || currentEvent[0].currentHour === new Date().getHours()) && currentEvent[0].currentMintue === new Date().getMinutes()) {
        channel2.postMessage({
          toDo: 'sendNotification',
          data: currentEvent[0]
        })
      }
    }
    setTimeout(() => {
      checkEvents()
    }, 50000)
  }
}

channel2.onmessage = (event) => {
  objectStore = db.transaction(["events"], "readwrite").objectStore("events")
  switch (event.data.toDo) {
    case 'create':
      event.data.data.id = Date.now()
      objectStore.add(JSON.parse(JSON.stringify(event.data.data)))
      getAllEvents()
      break;
    case 'update':
      objectStore.put(JSON.parse(JSON.stringify(event.data.data)))
      getAllEvents()
      break;
    case 'delete':
      objectStore.delete(event.data.id)
      getAllEvents()
      break;
    default:
      console.log('No action')
      break;
  }
}
self.addEventListener('message', function (event) {
  //Message received from client
  // console.log(event);
  //Send response to client using the port that was sent with the message
  // event.ports[0].postMessage("world");
  initiateIndexedDB()
  if (event.data.toDo) {
    objectStore = db.transaction(["events"], "readwrite").objectStore("events")
    switch (event.data.toDo) {
      case 'create':
        event.data.data.id = Date.now()
        objectStore.add(JSON.parse(JSON.stringify(event.data.data)))
        getAllEvents()
        break;
      case 'update':
        objectStore.put(JSON.parse(JSON.stringify(event.data.data)))
        getAllEvents()
        break;
      case 'delete':
        objectStore.delete(event.data.id)
        getAllEvents()
        break;
      default:
        console.log('No action')
        break;
    }
  }
});
self.addEventListener('install', evt => {
  console.log('Service worker installed')
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets)
    }).catch(err => {
      console.log(err)
    })
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

addEventListener("fetch", (event) => {
  event.waitUntil(
    (async () => {
      // Exit early if we don't have access to the client.
      // Eg, if it's cross-origin.
      if (!event.clientId) return;

      // Get the client.
      const client = await self.clients.get(event.clientId);
      // Exit early if we don't get the client.
      // Eg, if it closed.
      if (!client) return;

      // Send a message to the client.
      client.postMessage({
        msg: "Hey I just got a fetch from you!",
        url: event.request.url,
      });
    })(),
  );
});
