// Кэш приложения: после первого открытия страница работает без интернета.
const C="fotofix-v2",FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{const net=fetch(e.request).then(x=>{if(x&&x.ok&&new URL(e.request.url).origin===location.origin){const cp=x.clone();caches.open(C).then(c=>c.put(e.request,cp))}return x}).catch(()=>r);return r||net}))});
