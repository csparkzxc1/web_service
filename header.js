/* 월급플러스 - 공통 헤더 주입 스크립트
   사용법: 각 페이지 <body> 안 원하는 위치에
     <div id="site-nav"></div>
   를 넣고, </body> 직전에
     <script src="/header.js" defer></script>
   를 추가하면 끝.
   기존 <header class="topbar">...</header> 블록은 삭제하세요.

   active 메뉴는 현재 경로(location.pathname)로 자동 판별합니다.
   헤더에 필요한 CSS(.topbar, .topnav 등)는 각 페이지에 이미 있다고 가정합니다.
*/
(function () {
  'use strict';

  // 메뉴 정의 (순서 = 표시 순서). match: 이 경로로 시작하면 active.
  var MENU = [
    { href: '/tools/salary',          label: '실수령액',   match: ['/tools/salary'] },
    { href: '/tools/salary-table',    label: '연봉표',     match: ['/tools/salary-table'] },
    { href: '/tools/median-income',   label: '중위소득',   match: ['/tools/median-income'] },
    { href: '/tools/severance',       label: '퇴직금',     match: ['/tools/severance'] },
    { href: '/tools/hourly',          label: '시급',       match: ['/tools/hourly'] },
    { href: '/tools/insurance',       label: '4대보험',    match: ['/tools/insurance'] },
    { href: '/tools/unemployment',    label: '실업급여',   match: ['/tools/unemployment'] },
    { href: '/tools/loan',            label: '대출',       match: ['/tools/loan'] },
    { href: '/blog/',                 label: '블로그',     match: ['/blog'] }
  ];

  // 현재 경로 정규화 (.html 제거, 끝 슬래시 정리)
  var path = location.pathname.replace(/\.html$/, '');
  if (path.length > 1 && path.charAt(path.length - 1) === '/') {
    path = path.slice(0, -1);
  }
  if (path === '') path = '/';

  function isActive(item) {
    // 홈은 정확히 '/' 일 때만
    if (item.href === '/') {
      return path === '/' || path === '/index';
    }
    for (var i = 0; i < item.match.length; i++) {
      var m = item.match[i].replace(/\/$/, '');
      if (path === m || path.indexOf(m + '/') === 0) return true;
    }
    return false;
  }

  var links = MENU.map(function (item) {
    var cls = isActive(item) ? ' class="active"' : '';
    return '<a href="' + item.href + '"' + cls + '>' + item.label + '</a>';
  }).join('');

  var html =
    '<header class="topbar">' +
      '<div class="topbar-inner">' +
        '<a class="brand" href="/">' +
          '<span class="brand-logo">\u20A9</span>' +
          '<span class="brand-name">\uC6D4\uAE09<em>\uD50C\uB7EC\uC2A4</em></span>' +
        '</a>' +
        '<nav class="topnav" id="topnav">' + links + '</nav>' +
        '<button class="topnav-toggle" id="topnav-toggle" aria-label="\uBA54\uB274 \uC5F4\uAE30">' +
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
    '</header>';

  var mount = document.getElementById('site-nav');
  if (mount) {
    mount.outerHTML = html; // 마운트 지점을 헤더로 치환
  } else {
    document.body.insertAdjacentHTML('afterbegin', html); // 폴백: body 맨 앞
  }

  // 모바일 햄버거 토글 (inline onclick 대신 이벤트 바인딩)
  var toggle = document.getElementById('topnav-toggle');
  var nav = document.getElementById('topnav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }
})();
