'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "d3e43e22e99aef9b08b233c05fc59f8c",
"assets/AssetManifest.json": "4f81eaa372bb170892a7b9bf2ce39a45",
"assets/assets/fonts/hnd/HelveticaNowDisplay-ExtBlk.otf": "c5827617a46dc45ce9b378737ac2cff1",
"assets/assets/fonts/hnd/HelveticaNowDisplay-ExtraBold.otf": "6139a93e7833c865825d3c43c56b00f4",
"assets/assets/fonts/hnd/HelveticaNowDisplay-Hairline.otf": "b96e43611badd5fe48553de5bba8d8c2",
"assets/assets/fonts/hnd/HelveticaNowDisplay-Light.otf": "e80f6320ec8e4708814ac61c212d20f3",
"assets/assets/fonts/hnd/HelveticaNowDisplay-Thin.otf": "c1a77032966cc365ac80581651040aaa",
"assets/assets/fonts/hnd/HelveticaNowDisplayBold.otf": "0178222957d49f0f13dcc6e07098779c",
"assets/assets/fonts/hnd/HelveticaNowDisplayMedium.otf": "129d7a13f48640ae579ced50ed5fea9e",
"assets/assets/fonts/hnd/HelveticaNowDisplayRegular.otf": "52ff070eaaa0f22d3d0f41426c2af378",
"assets/assets/fonts/hpw/Heading-Pro-Wide-Bold-trial.ttf": "a51c00bf63c4597603d95bcaebdaace0",
"assets/assets/fonts/hpw/Heading-Pro-Wide-Regular-trial.ttf": "2fad04fe9fa75648fe7b952b456930d0",
"assets/assets/images/gab_image.png": "3fd99681a87f336c1d5711b2999c494f",
"assets/assets/images/github-mark-white.svg": "a0b00583d93c2f7084ad151ee0849934",
"assets/assets/images/github-mark.svg": "8dcc6b5262f3b6138b1566b357ba89a9",
"assets/assets/images/instagram-white.svg": "beb71dcb570100d531b28023eb3487ad",
"assets/assets/images/leocario_logo.svg": "9df44cb1cfb2a5dfd489daf281cdc5a9",
"assets/assets/images/leocario_logo_expanded.svg": "8bef42f124f739d2c4fc9c3004b2db7d",
"assets/assets/images/low.png": "a53a42c583dac268e215b1ec9caef969",
"assets/assets/images/splash.jpg": "d67ee3308d090b83d8df677afd2a677d",
"assets/assets/images/splash_image.png": "1fd1de81e49592db8a4783f5cc74c6e8",
"assets/assets/videos/composed_1.m4v": "a67b123743936dc7e9b9dbf57bb21bd0",
"assets/FontManifest.json": "9c6ed55bc00ce9f31259a3684a082f46",
"assets/fonts/MaterialIcons-Regular.otf": "bafe823c5636a4410d645ee9a9706ffa",
"assets/NOTICES": "f98fe74120ba64352d9adb14c23c99fc",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/wakelock_plus/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.ico": "11b94924348b2eadb01f4def2335fdcd",
"favicon.png": "f6224d883bea3cec7b23b8df8bb1bb76",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/android-chrome-192x192.png": "7c260193a3c7c23178b629204e90dca3",
"icons/android-chrome-512x512.png": "eadee9625a05740226f7d6319999bce6",
"icons/apple-touch-icon.png": "204cf6bd276da6b8d12acda75b7276ce",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "a0ce8c58a71aa8ae50b203c005cd6cb2",
"/": "a0ce8c58a71aa8ae50b203c005cd6cb2",
"main.dart.js": "ca6dec86bdfbbd608e498dd8261961c8",
"manifest.json": "f3223a4be59959f88172ada2774c60e1",
"version.json": "e829db8bdf95193b144e2aa51e11f2f1"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
