/* SEVJ · Relevé chantier — service worker (mode hors-ligne)
   ⚠ Après chaque mise à jour de l'app, incrémente la version (CACHE) ci-dessous
   pour forcer le rafraîchissement du cache sur les téléphones. */
const CACHE = 'sevj-v85-arbre';
const DELAI_RESEAU = 2500;   // ms d'attente du réseau avant de servir le cache (chantier mal couvert)
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
  './vendor/pdf.min.js',            // lecture des PDF (onglet OIBT)
  './vendor/pdf.worker.min.js',
  './vendor/pdf-lib.min.js',        // écriture sur le PDF d'origine
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

  /* Navigation (index.html) : réseau d'abord POUR RECEVOIR LES MISES À JOUR, mais avec un
     délai maximum. Sans ce délai, une barre de réseau dans un sous-sol fait attendre le
     navigateur plusieurs secondes avant d'abandonner — alors que l'app est entièrement en
     cache. Passé le délai on sert le cache, et le réseau continue en arrière-plan pour
     rafraîchir la version stockée (prête au prochain démarrage). */
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const reseau = fetch(req)
        .then(r => { if (r && r.ok) cache.put('./index.html', r.clone()); return r; })
        .catch(() => null);
      e.waitUntil(reseau);                         // le rafraîchissement survit à la réponse
      const enCache = await cache.match('./index.html');
      if (!enCache) return (await reseau) || Response.error();
      const delai = new Promise(res => setTimeout(() => res(null), DELAI_RESEAU));
      return (await Promise.race([reseau, delai])) || enCache;
    })());
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
