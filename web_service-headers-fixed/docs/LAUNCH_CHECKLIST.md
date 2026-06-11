# 런칭 체크리스트

## 🚀 배포 전 (코드 작업)

- [ ] `index.html`의 `[CANONICAL_URL]`, og:image, og:url을 실제 도메인으로 교체
- [ ] `sitemap.xml`의 `https://example.com`을 실제 도메인으로 교체
- [ ] `robots.txt`의 Sitemap URL 교체
- [ ] favicon 확인 (현재 인라인 SVG, 필요시 교체)
- [ ] OG 이미지 만들기 (1200×630px, `assets/og-image.png`로 저장)
- [ ] 모바일에서 직접 테스트 (Chrome DevTools 모바일 뷰)

## 🌐 배포

- [ ] GitHub 저장소 생성 + 전체 파일 업로드
- [ ] Vercel 계정 생성 + 저장소 연결
- [ ] Vercel에서 **Deploy** 클릭
- [ ] 라이브 URL 확인 (예: `mwage.vercel.app`)

## 🌍 도메인 (선택, 나중에 해도 됨)

- [ ] 도메인 구매 (가비아·후이즈, 1~2만원/년)
- [ ] Vercel Project Settings → Domains에 도메인 추가
- [ ] 도메인 등록업체에서 DNS 레코드 설정 (Vercel 안내대로)
- [ ] HTTPS 자동 발급 확인 (Vercel이 알아서 함)

## 📊 검색엔진 등록

- [ ] **Google Search Console** 등록 (`search.google.com/search-console`)
  - URL prefix 방식으로 등록
  - HTML 메타태그 검증 또는 DNS 레코드 검증
- [ ] `sitemap.xml` 제출
- [ ] **Naver Search Advisor** 등록 (한국 트래픽엔 필수, `searchadvisor.naver.com`)
- [ ] **Bing Webmaster Tools** 등록 (Google에서 자동 가져오기 가능)

## 📈 분석

- [ ] **Google Analytics 4** 계정 생성
- [ ] 측정 ID(`G-XXXXXXXXXX`) 받아서 `index.html` 및 모든 도구 페이지에 삽입
- [ ] GA4 → Google Search Console 연동 (Search Console 데이터 보기)
- [ ] (선택) Microsoft Clarity 추가 (무료 히트맵·세션녹화)

## 💰 수익화 (콘텐츠 쌓고 한참 후)

**AdSense 신청 권장 시점**:
- 도구 3개 이상 + 블로그/정보 콘텐츠 20개 이상
- 일 방문자 100명 이상
- 사이트 운영 기간 3개월 이상

신청 절차:
- [ ] AdSense 가입 (`adsense.google.com`)
- [ ] 사이트 추가 → 검토 신청 (1~4주)
- [ ] **승인되면**: `index.html`의 AdSense 주석 활성화 + `<ins class="adsbygoogle">` 광고 단위 삽입
- [ ] **자동 광고**보다 **수동 광고 단위** 추천 (UX 보호)

## ✅ 운영

- [ ] 매주: Search Console에서 색인 상태 확인
- [ ] 매월: 검색어 보고서로 새 콘텐츠 아이디어 발굴
- [ ] 매년 1월: 세율·요율 업데이트 (CLAUDE.md 참고)

## 🚨 트러블슈팅

**색인이 안 됨**:
- robots.txt 확인
- sitemap.xml 검증 (XML 문법 오류 없는지)
- Search Console에서 URL 검사 → "색인 요청"

**Vercel 배포 실패**:
- vercel.json 문법 오류 확인 (JSON 검증)
- 파일 경로 대소문자 일치 확인

**AdSense 거절**:
- 콘텐츠 부족이 가장 흔한 이유 → 더 쌓고 재신청
- 개인정보 처리방침·이용약관 페이지 필수
