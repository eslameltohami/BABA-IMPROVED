const C='baba-v16',F=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-m192.png','icon-m512.png','apple-touch-icon.png','img/logo.webp','img/splash.jpg','img/hero.webp','img/av.webp','img/c0.webp','img/c1.webp','img/c2.webp','img/c3.webp','img/c4.webp','img/c5.webp','img/t0.webp','img/t1.webp','img/t2.webp','img/t3.webp','img/t4.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async cache=>{await Promise.allSettled(F.map(url=>cache.add(url)));}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!=='vids').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c)).catch(()=>{});}return r}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('./'):new Response('Offline',{status:503,statusText:'Offline'})))));
});
