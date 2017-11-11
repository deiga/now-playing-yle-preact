self.addEventListener('install', function(event) {
  caches.open('myCache').then(function(cache) {
    cache.addAll([
      '/favicon.ico',
      '/static/js/bundle.js',
      'https://fonts.googleapis.com/css?family=Roboto+Mono',
      'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
      'https://fonts.googleapis.com/icon?family=Material+Icons',
    ]);
  });
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
      .catch(function(e) {
        console.log('error in service worker while intercepting fetch', e);
      }),
  );
});
