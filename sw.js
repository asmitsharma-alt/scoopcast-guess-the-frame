// Scoopcast Guess The Frame - Production Service Worker
// Enables instant 0ms asset retrieval via Cache-First strategy

const CACHE_NAME = 'gtf-cache-v8';
const CORE_PRECACHE = [
  '/',
  '/css/tailwind.min.css',
  'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799513/scoopcast/bg/guess_the_frame.webp',
  'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799979/scoopcast/bg/cinema_bg.webp',
  'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799633/scoopcast/logo.png',
  'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799893/scoopcast/avvtar/aman.svg',
  'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799904/scoopcast/avvtar/amish.svg',
  'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799958/scoopcast/avvtar/aziz.svg',
  'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799966/scoopcast/avvtar/vish.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_PRECACHE).catch((err) => {
        console.warn('[SW] Non-blocking precache error:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Never intercept WebSocket or Appwrite API/Realtime calls
  if (url.protocol === 'ws:' || url.protocol === 'wss:' || url.pathname.startsWith('/v1/')) {
    return;
  }

  // Cache-First for media assets: movie frames, eyes, sounds, avatars, fonts, and Cloudinary CDN
  const isMediaAsset =
    url.hostname.includes('cloudinary.com') ||
    url.pathname.includes('/GUESSTHEFRAME/') ||
    url.pathname.includes('/GUESSTHEEYES/') ||
    url.pathname.includes('/tie breaker/') ||
    url.pathname.includes('/avvtar/') ||
    url.pathname.includes('/bg/') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.woff2');

  if (isMediaAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          return cachedResponse;
        });
      })
    );
    return;
  }

  // Network-First for HTML/document to ensure players always get latest updates
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => cached || caches.match('/'));
        })
    );
    return;
  }

  // Stale-While-Revalidate for other static requests
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
