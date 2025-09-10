const CACHE = 'wncil-well-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './js/app.js',
  './wasm/well_recovery.js',
  './wasm/well_recovery.wasm',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(caches.match(evt.request).then(resp => resp || fetch(evt.request)));
});
