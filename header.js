/* 월급플러스 - 공통 헤더 (CSS 자체 포함 버전)
   ─────────────────────────────────────────────
   사용법: 각 페이지에서
     1) <body> 안 헤더가 들어갈 위치에  <div id="site-nav"></div>
     2) </body> 직전에  <script src="/header.js" defer></script>
   끝. 기존 <header class="topbar">...</header> 가 있으면 삭제하세요.

   - 메뉴/경로는 아래 MENU 배열 한 곳에서만 관리.
   - active 메뉴는 현재 경로(location.pathname)로 자동 판별.
   - 스타일은 이 스크립트가 .mwp-* 클래스로 직접 주입하므로
     페이지에 topbar CSS가 없어도 동일하게 보입니다.
*/
(function () {
  'use strict';

  var MENU = [
    { href: '/tools/salary',        label: '실수령액',  match: ['/tools/salary'] },
    { href: '/tools/salary-table',  label: '연봉표',    match: ['/tools/salary-table'] },
    { href: '/tools/median-income', label: '중위소득',  match: ['/tools/median-income'] },
    { href: '/tools/severance',     label: '퇴직금',    match: ['/tools/severance'] },
    { href: '/tools/hourly',        label: '시급',      match: ['/tools/hourly'] },
    { href: '/tools/insurance',     label: '4대보험',   match: ['/tools/insurance'] },
    { href: '/tools/unemployment',  label: '실업급여',  match: ['/tools/unemployment'] },
    { href: '/tools/loan',          label: '대출',      match: ['/tools/loan'] },
    { href: '/blog/',               label: '블로그',    match: ['/blog'] }
  ];

  // ── 현재 경로 정규화 (.html 제거, 끝 슬래시 정리) ──
  var path = location.pathname.replace(/\.html$/, '');
  if (path.length > 1 && path.charAt(path.length - 1) === '/') path = path.slice(0, -1);
  if (path === '') path = '/';

  function isActive(item) {
    for (var i = 0; i < item.match.length; i++) {
      var m = item.match[i].replace(/\/$/, '');
      if (path === m || path.indexOf(m + '/') === 0) return true;
    }
    return false;
  }

  // ── CSS 주입 (한 번만) ──
  if (!document.getElementById('mwp-nav-style')) {
    var css =
      '.mwp-topbar{background:rgba(250,247,242,.85);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid #E8E2D5;position:sticky;top:0;z-index:50;padding:14px 0}' +
      '.mwp-inner{max-width:1280px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:20px}' +
      '.mwp-brand{display:flex;align-items:center;gap:10px;text-decoration:none}' +
      '.mwp-logo{width:34px;height:34px;border-radius:10px;background:#D94A1F;color:#fff;display:grid;place-items:center;font-family:serif;font-weight:600;font-size:20px}' +
      ".mwp-name{font-family:'Fraunces',serif;font-size:20px;font-weight:500;color:#1A1815;letter-spacing:-.01em}" +
      '.mwp-name em{font-style:italic;color:#D94A1F}' +
      '.mwp-nav{display:flex;gap:6px;font-size:14px}' +
      '.mwp-nav a{color:#5C5852;text-decoration:none;padding:8px 14px;border-radius:8px;font-weight:500;transition:all .15s;white-space:nowrap}' +
      '.mwp-nav a:hover{background:#F2EDE4;color:#D94A1F}' +
      '.mwp-nav a.active{color:#D94A1F;background:#FFF1EB}' +
      '.mwp-toggle{display:none;background:none;border:none;cursor:pointer;color:#1A1815;padding:8px}' +
      '@media (max-width:980px){' +
        '.mwp-nav{display:none;position:absolute;top:62px;left:0;right:0;flex-direction:column;background:#fff;border-bottom:1px solid #E8E2D5;padding:12px;gap:2px;box-shadow:0 8px 24px rgba(26,24,21,.08)}' +
        '.mwp-nav.open{display:flex}' +
        '.mwp-nav a{padding:12px;border-radius:8px}' +
        '.mwp-toggle{display:block}' +
      '}';
    var style = document.createElement('style');
    style.id = 'mwp-nav-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ── 헤더 HTML ──
  var links = MENU.map(function (item) {
    return '<a href="' + item.href + '"' + (isActive(item) ? ' class="active"' : '') + '>' + item.label + '</a>';
  }).join('');

  var html =
    '<header class="mwp-topbar">' +
      '<div class="mwp-inner">' +
        '<a class="mwp-brand" href="/">' +
          '<span class="mwp-logo">\u20A9</span>' +
          '<span class="mwp-name">\uC6D4\uAE09<em>\uD50C\uB7EC\uC2A4</em></span>' +
        '</a>' +
        '<nav class="mwp-nav" id="mwp-nav">' + links + '</nav>' +
        '<button class="mwp-toggle" id="mwp-toggle" aria-label="\uBA54\uB274 \uC5F4\uAE30">' +
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
    '</header>';

  var mount = document.getElementById('site-nav');
  if (mount) {
    mount.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML('afterbegin', html);
  }

  var toggle = document.getElementById('mwp-toggle');
  var nav = document.getElementById('mwp-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
  }
})();
