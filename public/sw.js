const CACHE='gym-v8';
const SHELL=['/','/app.js','/manifest.webmanifest','/icon-192.png','/icon-512.png','/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);
 if(u.origin===location.origin&&u.pathname.startsWith('/api/'))return; // API is always live, never cached
 if(u.origin===location.origin&&(r.mode==='navigate'||u.pathname==='/app.js')){ // network first for page + app code, so updates arrive
  const key=r.mode==='navigate'?'/':r;
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(key,c));return res;}).catch(()=>caches.match(key)));return;}
 e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com/.test(u.host))){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));}return res;})));});
