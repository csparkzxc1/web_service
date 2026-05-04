# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## 프로젝트 개요

**MWAGE (월급플러스)** — 한국 직장인 대상 금융 계산기 도구 사이트.

- **비즈니스 모델**: SEO 트래픽 → Google AdSense + 향후 제휴 광고
- **목표**: 12~18개월 내 일 1만 방문자 달성, 월 200~300만원 광고 수익
- **현재 단계**: MVP. 메인 도구(연봉 실수령액 계산기) 1개 완성. 추가 도구 확장 예정.
- **타겟 키워드**: "연봉 실수령액 계산기", "월급 계산기", "2026 연봉 계산기" 등 한국어 금융 롱테일

## 기술 스택 (의도적으로 단순)

- **Frontend**: Vanilla HTML + CSS + JavaScript (프레임워크 없음)
- **빌드 도구**: 없음 — 모든 페이지는 단일 HTML 파일로 자가완결
- **호스팅**: Vercel (정적 호스팅, 무료 플랜)
- **저장소**: GitHub
- **폰트**: Pretendard Variable (CDN), Fraunces (Google Fonts)
- **분석**: GA4 (코드 자리만 잡혀있음, 미연동)
- **수익화**: Google AdSense (코드 자리만 잡혀있음, 미승인)

**왜 빌드 도구를 안 쓰는가**: 운영자가 코딩 초보자(HTML/CSS 조금 가능). GitHub 웹 UI에서 파일 직접 편집 → Vercel 자동 배포 워크플로우. 빌드 단계가 없어야 진입장벽이 낮음. 추후 도구가 10개를 넘어가면 검토.

## 디렉토리 구조

```
mwage/
├── index.html              # 메인: 연봉 실수령액 계산기 (완성됨)
├── tools/
│   ├── _template.html      # 새 계산기 만들 때 시작점
│   └── README.md           # 도구 추가 가이드
├── assets/
│   └── (이미지·OG 이미지 등 정적 파일)
├── robots.txt              # 검색엔진 크롤링 허용
├── sitemap.xml             # 검색엔진 사이트맵 (도구 추가 시 갱신 필수)
├── vercel.json             # Vercel 라우팅 설정
├── .gitignore
├── CLAUDE.md               # 이 파일
└── README.md               # 사람용 문서 (배포·운영 가이드)
```

## 핵심 규약

### 1. 각 도구는 1개의 자가완결 HTML 파일

새 도구 추가 시 **빌드·번들링 없이 단일 HTML로 작성**. CSS와 JS를 `<style>`, `<script>` 태그로 인라인. 외부 CSS·JS 파일 분리하지 마세요. (이유: 빌드 단계 없음, 캐싱 단순화, 한 파일을 GitHub에서 직접 편집해도 즉시 배포됨)

**예외**: 정말 모든 도구에서 100% 동일한 코드(예: GA4 스니펫, AdSense 스니펫)는 향후 공통화 검토. 현재는 복사·붙여넣기로 충분.

### 2. 모든 도구는 SEO 메타 풀 세트를 갖춰야 함

새 페이지 추가 시 `tools/_template.html`을 시작점으로 사용. 다음 요소를 반드시 포함:

- `<title>` (50~60자, 키워드 + 브랜드)
- `<meta name="description">` (150~160자)
- `<link rel="canonical">`
- Open Graph 4종 (`og:type`, `og:title`, `og:description`, `og:image`)
- JSON-LD 구조화 데이터 (`WebApplication` 또는 `FAQPage`)
- `<link rel="icon">`

### 3. 디자인 시스템 (CSS 변수)

모든 도구는 동일한 CSS 변수를 사용. `index.html`의 `:root` 블록을 그대로 복사해 사용.

```css
--bg: #FAF7F2;       /* 배경 */
--ink: #1A1815;      /* 본문 텍스트 */
--accent: #D94A1F;   /* 강조 (불꽃 오렌지) */
--green: #2D7A4F;    /* 긍정/부가 정보 */
/* ... */
```

폰트: 본문은 **Pretendard Variable**, 디스플레이(헤딩·결과 숫자)는 **Fraunces** (italic 변형 활용).

### 4. 광고 위치 규칙

각 도구 페이지에는 광고 슬롯 **2개**를 배치:
1. 계산 결과 카드 직후 (가장 가치 높은 위치)
2. 본문 정보 섹션 중간

`<!-- Google AdSense placeholder -->` 주석으로 표시된 위치를 따르세요. AdSense 미승인 상태이므로 현재는 시각적 placeholder만 있음.

### 5. URL 파라미터로 결과 공유 가능해야 함

각 계산기는 입력값을 URL 쿼리스트링으로 받아 자동 채우기 지원. (예: `?s=4000&d=1`) 이는 SNS 공유 → 백링크 → SEO 강화의 핵심 메커니즘.

## 일반적인 작업 시나리오

### 새 계산기 도구 추가

요청 예: "퇴직금 계산기 만들어줘"

1. `tools/_template.html`을 `tools/severance.html`로 복사
2. 메타태그(title, description, og, JSON-LD) 업데이트
3. 입력 필드 정의 (해당 도구에 맞게)
4. 계산 로직 작성 (한국 노동·세법 기준 정확하게)
5. 결과 표시 + 공유 기능 구현 (메인 페이지 패턴 따라)
6. `index.html`의 "함께 쓰면 좋은 도구" 섹션에서 해당 카드의 `coming` 클래스 제거하고 `href` 연결
7. `sitemap.xml`에 새 URL 추가
8. 새 도구 페이지에서도 메인 페이지로 돌아가는 링크 + 다른 도구로 가는 링크 배치 (내부 링크 SEO)

### 새 도구의 우선순위 (추천 순서)

비즈니스 임팩트 + 검색량 기준:

1. **퇴직금 계산기** (`tools/severance.html`) — 검색량 매우 높음, 연봉 계산기와 시너지
2. **시급 계산기** (`tools/hourly.html`) — 알바생·시간제 근로자 타겟, 주휴수당 포함
3. **연차수당 계산기** (`tools/annual-leave.html`) — 회계연도 말 트래픽 폭증
4. **4대보험 계산기** (`tools/insurance.html`) — 사업주·인사담당자도 포함하는 더 넓은 타겟
5. **세후 월급 → 세전 연봉 역산기** (`tools/reverse.html`) — 이직 협상 시 검색

### 계산 로직 검증

한국 세법은 매년 1월 변경됨. 새 도구나 기존 도구 수정 시:

- 국세청 간이세액표 최신본 확인: `https://www.nts.go.kr`
- 4대보험 요율: 국민연금공단·건강보험공단 공식 발표
- 누진세율 구간: 소득세법 제55조

현재 `index.html`의 상수는 **2026년 기준** (2025년 세율 carry-over). 매년 1월 갱신 필요:
- 국민연금 상한액 (`RATES.pensionMaxBase`)
- 건강보험 요율 (`RATES.health`)
- 소득세 누진세율 구간

### SEO·콘텐츠 작업

블로그 포스팅 추가는 별도 디렉토리(`/blog/` 또는 별도 워드프레스)로 분리할지 결정 필요. 현재는 단일 도구 페이지의 FAQ·정보 섹션이 SEO 콘텐츠 역할.

타겟 키워드는 항상 **한국어 + 검색량 + 낮은 경쟁** 조합:
- ❌ "연봉 계산" (대형 사이트가 점령)
- ✅ "연봉 4500 실수령액", "신입 첫 월급 계산", "주휴수당 포함 시급" (롱테일)

### 광고·분석 코드 활성화

AdSense 승인되면:
1. `index.html` (및 모든 도구)의 `<!-- Google AdSense placeholder -->` 주석을 실제 스크립트로 교체
2. 광고 슬롯 div의 placeholder 콘텐츠를 `<ins class="adsbygoogle">` 태그로 교체
3. **광고는 항상 lazy load** (성능 점수 보호 → SEO 보호)

GA4 측정 ID 받으면 `G-XXXXXXXXXX` 자리 교체.

## 배포 워크플로우

운영자는 GitHub 저장소를 Vercel에 연결한 상태. **`main` 브랜치에 푸시되면 자동 배포**.

- Pull request 만들 필요 없음 (1인 운영)
- main에 직접 커밋 OK
- Vercel 빌드 시간 ~30초

로컬 미리보기:
```bash
cd mwage
python3 -m http.server 8000
# http://localhost:8000 에서 확인
```

또는 VSCode Live Server 확장.

## 절대 하지 말 것

- ❌ React/Vue/Next.js 등 프레임워크 도입 (운영자 역량 초과 + 빌드 단계 추가됨)
- ❌ npm 패키지 사용 (외부 의존성 = 깨질 위험)
- ❌ 서버사이드 코드 (Vercel 정적 호스팅만 사용)
- ❌ 사용자 입력값을 외부로 전송 (소득 정보는 민감 데이터, 클라이언트에서만 계산)
- ❌ 광고를 결과 숫자보다 위에 배치 (UX 저하 + AdSense 정책 위반 가능)
- ❌ 클릭베이트성 콘텐츠 (AdSense 정책 위반 → 계정 정지 위험)

## 참고 자료

- 운영자 컨텍스트: HTML/CSS 기초만 가능. JavaScript는 거의 못함. 모든 코드 변경은 Claude Code가 작성하고 운영자는 GitHub에서 검토·머지만.
- 처음 이 프로젝트는 Claude와의 대화에서 시작됨 — 1만명/일 트래픽 목표의 수익형 사이트 만들기.
- 기획 의도: 한국 시장에서 검색량 큰 + 에버그린 + 금융 니치(고 CPC) 교집합 공략.
