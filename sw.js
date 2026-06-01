const DEV_MODE = false;
const CACHE = 'memoir-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './apple-touch-icon.png',
  './icon-192x192.png',
  './assets/images/a-decor.svg',
  './assets/images/sprout.svg',
  './assets/images/4star.svg',
  './assets/images/bird.svg',
  './assets/images/cherries.svg',
  './assets/images/flower.svg',
  './assets/images/girl.svg',
  './assets/images/lips.svg',
  './assets/images/pencil.svg',
  './assets/images/sun.svg',
  './assets/images/talk-bubble.svg',
  './assets/images/home-divider.svg'
];

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
