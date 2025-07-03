self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("fmanager-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        // Caminho corrigido para main.js
        "/js/main.js", 
        "/js/ui.js",
        "/js/core.js",
        "/js/team.js", // <-- MANTENHA se existir, REMOVA se não existir
        "/js/match.js",
        "/js/cup.js",
        // Caminhos para partials (assumindo que estão na pasta partials na raiz)
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
