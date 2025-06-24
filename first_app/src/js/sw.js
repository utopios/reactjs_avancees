window.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    // Perform install steps
    event.waitUntil(
        caches.open('v1').then((cache) => {
            console.log('Service Worker caching app shell');
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                '/images/logo.png'
            ]);
        })
    );
});
window.addEventListener('offline', (event) => {
    self.addEventListener('fetch', (event) => {
        console.log('Service Worker fetching:', event.request.url);
    })
    console.log('You are now offline. Some features may not be available.');
});
