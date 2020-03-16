const staticCache = 'site-static-v2' ;
let dynamicCache = 'dynamicCache'
const asset = [
  '/',
  '/index.html',
  '/login.html',
  '/signup.html',
  '/css/style.css',
  '/css/login.css',
  '/css/materialize.min.css',
  '/manifest.json',
  '/js/app.js',
  '/js/auth-login.js',
  '/js/auth-main.js',
  '/js/auth-signup.js',
  '/js/main.js',
  '/js/ui.js',
  '/js/materialize.min.js'
] ;

// This is install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCache).then(cache =>{
      console.log('caching assets') ;
      cache.addAll(asset)
      console.log('service worker installed') ;

    })
  );

  });

// This is active event
  self.addEventListener('activate',e =>{
    console.log('sw activated') ;
    e.waitUntil(
      caches.keys().then(keys => {
        return Promise.all(keys
        .filter(key => key !== staticCache)
        .map(key => caches.delete(key))
      )
      }
      )
    )
  })



  self.addEventListener('fetch',e => {
    console.log('fetch event')
    e.respondWith(
      caches.match(e.request).then(
        res => {
          return res || fetch(e.request).then(fetchRes =>{
            return caches.open(dynamicCache).then(cache =>{
              cache.put(e.request.url,fetchRes.clone()) ;
              return fetchRes ;
            })

          }
          )
        }
      )
    )

  })