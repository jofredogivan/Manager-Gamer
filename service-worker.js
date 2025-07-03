self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("fmanager-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/main.js",
        "/js/ui.js",
        "/js/core.js",
        "/js/team.js",
        "/js/match.js",
        "/js/cup.js",
        "/partials/elenco.html",
        "/partials/taticas.html",
        "/partials/partida.html"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
