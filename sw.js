// FGI Invoice System — Service Worker (v18, 100% offline: no CDN)
const CACHE = 'fgi-invoice-v18.3';
const ASSETS = [
  './', './index.html', './manifest.json',
  './lib/sql-wasm.js', './lib/sql-wasm.wasm', './lib/html2canvas.min.js',
  './lib/jspdf.umd.min.js', './lib/jspdf.plugin.autotable.min.js',
  './fonts/fonts.css',
  './fonts/barlow-latin-400-normal.woff2', './fonts/barlow-latin-500-normal.woff2',
  './fonts/barlow-latin-600-normal.woff2', './fonts/barlow-latin-700-normal.woff2',
  './fonts/barlow-latin-800-normal.woff2', './fonts/barlow-latin-900-normal.woff2',
  './fonts/barlow-condensed-latin-600-normal.woff2', './fonts/barlow-condensed-latin-700-normal.woff2',
  './fonts/barlow-condensed-latin-800-normal.woff2',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Page itself: network first (to pick up updates), cache fallback when offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put('./index.html', c)); return r; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Libraries, fonts, icons: cache first
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(r => {
      if (r && r.status === 200 && new URL(req.url).origin === location.origin) {
        const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c));
      }
      return r;
    }).catch(() => new Response('Offline', { status: 503 })))
  );
});
