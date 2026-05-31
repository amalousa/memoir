const DEV_MODE = true;
const CACHE = 'memoir-v2';
const ASSETS = ['./', './index.html', './manifest.json', './apple-touch-icon.png', './icon-192x192.png'];

self.addEventListener('install', e => {
  if (!DEV_MODE) e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (DEV_MODE) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
