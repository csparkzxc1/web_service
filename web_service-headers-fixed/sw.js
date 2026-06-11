// 월급플러스 Service Worker
// PWA 설치 가능 + 오프라인 지원

const CACHE_VERSION = 'mwage-v1';
const PRECACHE_URLS = [
  '/',
  '/tools/severance.html',
  '/tools/hourly.html',
  '/tools/annual-leave.html',
  '/tools/insurance.html',
  '/tools/salary-table.html',
  '/tools/median-income.html',
  '/blog/',
  '/about.html',
  '/privacy.html',
  '/terms.html',
  '/contact.html'
];

// Install: 핵심 페이지를 캐시에 미리 저장
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => {
        // 개별 추가 (하나 실패해도 다른 건 계속 진행)
        return Promise.allSettled(
          PRECACHE_URLS.map(url => cache.add(url).catch(err => {
            console.warn('Cache add failed:', url, err);
          }))
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: 이전 버전 캐시 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: 네트워크 우선, 실패하면 캐시
self.addEventListener('fetch', event => {
  // GET 요청만 캐시
  if (event.request.method !== 'GET') return;

  // 외부 리소스(fonts, GA 등)는 캐시 안 함
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 성공 시 캐시 업데이트
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_VERSION).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 제공
        return caches.match(event.request);
      })
  );
});
