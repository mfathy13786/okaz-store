const CACHE_NAME = 'store-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/checkout.html'
];

// تحميل الملفات الأساسية في الكاش (عشان الموقع يفتح طلقة بعد كده)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// استرجاع الداتا من النت، ولو النت فاصل يجيبها من الكاش
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});