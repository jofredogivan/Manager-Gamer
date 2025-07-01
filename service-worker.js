// service-worker.js

const CACHE_NAME = 'fmanager-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/js/ui.js',
  '/js/core.js',
  '/js/team.js',
  '/js/match.js',
  '/js/cup.js',
  '/partials/elenco.html',
  '/partials/taticas.html',
  '/partials/partida.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
