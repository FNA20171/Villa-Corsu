const CACHE = 'airbnb-cal-v1';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});

// Notification scheduling check (called on sync)
self.addEventListener('periodicsync', e => {
  if (e.tag === 'check-arrivals') {
    e.waitUntil(checkUpcomingArrivals());
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('./index.html'));
});

async function checkUpcomingArrivals() {
  try {
    const allClients = await clients.matchAll();
    // Notify via postMessage to active clients
    allClients.forEach(c => c.postMessage({ type: 'CHECK_ARRIVALS' }));
  } catch {}
}
