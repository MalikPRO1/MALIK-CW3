// Service worker script to cache specific resources and serve them from cache when offline

// Name for the cache
let cacheName = "lessons-v1";

// Array of files to be cached
let cacheFiles = [
    "index.html",
];

// Event listener for the 'install' event
self.addEventListener("install", function (e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        // Open the cache and add specified files to it
        caches.open(cacheName).then(function (cache) {
            console.log("[Service Worker] Caching files");
            return cache.addAll(cacheFiles);
        })
    );
});

// Event listener for the 'fetch' event
self.addEventListener("fetch", function (e) {
    // Check if the requested URL is not the specified API endpoint
    if (e.request.url !== "https://cartvuebackend.eu-north-1.elasticbeanstalk.com/lessons") {
        e.respondWith(
            // Try to match the request with a cached response
            caches.match(e.request).then(function (cachedFile) {
                // If the file is in the cache, retrieve it from there
                if (cachedFile) {
                    console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
                    return cachedFile;
                } else {
                    // If the file is not in the cache, download the file
                    return fetch(e.request).then(function (response) {
                        return caches.open(cacheName).then(function (cache) {
                            // Add the new file to the cache
                            cache.put(e.request, response.clone());
                            console.log("[Service Worker] Resource fetched and saved in the cache for: " +
                                e.request.url);
                            return response;
                        });
                    });
                }
            })
        )
    }
});
