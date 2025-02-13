const CACHE_NAME = 'app-cache-v1';
const STATIC_ASSETS = [
  '/build/_shared/chunk-3AGTGK7T.js',
  // Add other static assets here
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Don't cache API calls or other dynamic requests
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('/rpc/') ||
      event.request.url.includes('/auth/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        // Fetch new version in background
        event.waitUntil(
          fetch(event.request).then((response) => {
            if (response.ok) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, response);
              });
            }
          })
        );
        return cachedResponse;
      }

      // Otherwise fetch and cache
      return fetch(event.request).then((response) => {
        // Don't cache non-successful responses
        if (!response.ok) return response;

        // Clone the response as it can only be consumed once
        const responseToCache = response.clone();

        event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          })
        );

        return response;
      });
    })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
