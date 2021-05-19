//Import du script _localforage_
importScripts(
  "https://cdn.rawgit.com/mozilla/localForage/master/dist/localforage.js"
);

//MISE EN CACHE DES FICHIER + CYCLE DE VIE D'UN SERVICE WORKER
const FILES_TO_CACHE = ["/", "/css/app.css", "/js/app.js"];

const STATIC_CACHE_NAME = "pages-cache-v2";

self.addEventListener("install", (event) => {
  console.log("Installation du service Worker...");
  console.log("Mise en cache des ressources...");
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      }),
      fetch(
        "https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json"
      )
        .then((resp) => resp.json())
        .then((speakers) => {
          localforage.config({ storeName: "speakers" });
          for (key in speakers) {
            localforage.setItem(key, speakers[key]);
          }
        }),
    ])
  );
});

self.addEventListener("activate", (event) => {
  console.log("Activation du service Worker...");

  const cacheWhiteList = [STATIC_CACHE_NAME];
  //suppression des caches excepté le cache courant (STATIC_CAHCE_NAME)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhiteList.indexOf(cacheName) < 0) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//INTERCEPTION DES REQUETES + Utilisation du cache
self.addEventListener("fetch", (event) => {
  console.log("Fetching : ", event.request.url);

  //Utilisation du cache
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log(event.request.url, "servi depuis le cache");
          return response;
        }
        console.log(event.request.url, "servi depuis le réseau");
        return fetch(event.request);
      })
      //Mise d'une reponse dans le cache
      .then(function (response) {
        return caches.open(STATIC_CACHE_NAME).then((cache) => {
          //mise en caches des ressources qui ne contiennent pas no.cache
          if (event.request.url.indexOf("no cache") < 0) {
            cache.put(event.request.url, response.clone());
          }
          return response;
        });
      })
      .catch((error) => {
        console.log("oops");
      })
  );
});

//ecoute de message provenant d'un client
self.addEventListener("message", (event) => {
  console.log(event.data);
});

//Attention possible problème d'occurence (donc ne peut ne pas être visible)
self.clients.matchAll().then(function (clients) {
  clients.forEach(function (client) {
    client.postMessage({
      command: "HELLO_LES_CLIENTS",
      message: "Hello je suis un SW",
    });
  });
});

//TERMINE LE PRECEDENT SW + ACTIVE IMMEDIATEMENT UN NOUVEAU SERVICE WORKER
self.skipWaiting();
