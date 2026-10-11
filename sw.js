// Remplace le service worker de l'ancienne démo GitHub Pages : un navigateur qui l'avait installée
// vide son cache, le désinscrit et recharge la page, qui renvoie alors vers orinergie.vercel.app.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: 'window' });
      await Promise.all(windows.map((client) => client.navigate(client.url)));
    })(),
  );
});
