const CACHE_NAME = "rotiya-v2026-09-19-3d";
const CORE = ["./","./index.html","./logo.png","./banner-héroe.jpg","./manifiesto.json"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", event => { if(event.request.method !== "GET") return; event.respondWith(fetch(event.request).then(r => { const copy=r.clone(); caches.open(CACHE_NAME).then(c => c.put(event.request,copy)).catch(()=>{}); return r; }).catch(()=>caches.match(event.request))); });
