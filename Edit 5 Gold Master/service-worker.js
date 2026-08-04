const CACHE_NAME = 'travel-companion-v19';
const ASSETS = [
  '/',
  '/index.html',
  '/london.html',
  '/shopping.html',
  '/faversham.html',
  '/edinburgh.html',
  '/cruise.html',
  '/dover.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      const responseClone = networkResponse.clone();

      caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, responseClone);
      });

      return networkResponse;
    }).catch(() => {
      return caches.match(event.request).then((cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse;
        }

        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }

        return undefined;
      });
    })
  );
});
