/* SEVJ · Relevé chantier — service worker (mode hors-ligne)
   ⚠ Après chaque mise à jour de l'app, incrémente la version (CACHE) ci-dessous
   pour forcer le rafraîchissement du cache sur les téléphones. */
const CACHE = 'sevj-v15';
const ASSETS = [
  './',
  './index.html',
  './materiel.js',
  './manifest.webmanifest',
  './logo.png',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png',
  './regie-logo.png',
  './regie-band.png',
  './regie-deco.png',
  './couleur-THFWG.png',
  './couleur-EDIZIOliv-AP.png',
  './couleur-EDIZIOliv-ENC.png',
  './couleur-EDIZIOdue-ENC-1.png',
  './couleur-EDIZIOdue-ENC-2.png',
  './vendor/jspdf.umd.min.js',
  './vendor/jspdf.plugin.autotable.min.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Navigation (index.html) : réseau d'abord, cache en secours (pour recevoir les mises à jour en ligne)
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return r;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Autres ressources : cache d'abord, réseau en secours (et on met en cache au passage)
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(r => {
      if (r && r.status === 200 && new URL(req.url).origin === location.origin) {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return r;
    }).catch(() => cached))
  );
});
