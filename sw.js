// Minimal Service Worker to enable PWA "Add to Home Screen"
const CACHE_NAME = 'crewcrew-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './crew.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Don't fail if some assets are missing during build/dev
      return cache.addAll(ASSETS).catch(() => {});
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
