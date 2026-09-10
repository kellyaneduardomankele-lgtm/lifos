const CACHE='lifeos-v2';
const ASSETS=['./','index.html','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus'in c)return c.focus()}return clients.openWindow('./')}))});
self.addEventListener('push',e=>{let data={title:'LifeOS',body:'Du hast eine Erinnerung.'};try{data=e.data.json()}catch{}e.waitUntil(self.registration.showNotification(data.title||'LifeOS',{body:data.body||'',icon:'icon.svg',badge:'icon.svg',tag:data.tag||'lifeos-push',data:{url:'./'}}))});
