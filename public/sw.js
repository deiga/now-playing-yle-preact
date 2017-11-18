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
  var isYleAPICall = event.request.url.match(/external.api.yle.fi\/v1/) !== null
  event.respondWith(
    caches
      .match(event.request)
      .then(function(response) {
        if (response == null) console.log("cache miss", isYleAPICall, event.request.url)
        return response || fetch(event.request).then(function(resp2) {
                // we need to add response to the cache manually, so let's open
                // a new cache and put responses there (for easier expiration
                // when logging out)
                var r = resp2.clone()
                if (isYleAPICall) {
                    caches.open("yle-api").then(function(cache) {
                      cache.put(event.request, resp2.clone())
                    })
                }
                return r
            })
      })
      .catch(function(e) {
        console.log('error in service worker while intercepting fetch', e);
      }),
  );
});
