const VERSION = 'V6';

const ASSETS = [
  '/images/hand-stands.opt.jpg',
  '/images/hand-stands.sopt.jpg',
  '/images/home-hero.ropt.jpg',
  '/images/home-hero.sopt.jpg',
  '/images/lunge.opt.jpg',
  '/images/lunge.sopt.jpg',
  '/images/kettle-bells.opt2.jpg',
  '/images/kettle-bells.sopt.jpg',
  '/images/helena.opt.jpg',
  '/images/helena.sopt.jpg',
  '/images/simon.opt.jpg',
  '/images/simon.sopt.jpg',
  '/images/claire.opt.jpg',
  '/images/claire.sopt.jpg',
];

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(VERSION).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
});

const TTL = 86400000;
const pages = {
  [`${location.origin}/about/`]: null,
  [`${location.origin}/people/helena/`]: null,
  [`${location.origin}/people/simon/`]: null,
  [`${location.origin}/people/claire/`]: null,
  [`${location.origin}/workouts/`]: null,
  [`${location.origin}/`]: null,
};

const checkCache = req => new Promise(res => {
  if (pages[req.url] === null || ((new Date() - pages[req.url]) > TTL)) {
    pages[req.url] = new Date();
    return res(fetch(req));
  }

  return res(caches.match(req));
});

this.addEventListener('fetch', event => {
  event.respondWith(
    checkCache(event.request).then(resp => resp || fetch(event.request).then(response => {
      if (response.ok && (pages[event.request.url] !== undefined || /bundle-[a-z0-9]*.css/.test(event.request.url))) {
        caches.open(VERSION).then(cache => cache.put(event.request, response));
      }
      return response.clone();
    })).catch(() => console.error('no match', event))
  );
});

this.addEventListener('activate', event =>
  event.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map(key => {
      if (key !== VERSION) {
        return caches.delete(key);
      }
    })))
  )
);
