# 월급플러스 (MWAGE)

> 한국 직장인을 위한 금융 계산기 도구 사이트

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 🎯 프로젝트 목표

- **단기 (3개월)**: 일 100~500 방문자, AdSense 승인
- **중기 (6~12개월)**: 일 3,000~10,000 방문자, 월 광고수익 50~300만원
- **장기 (12~18개월)**: 한국 금융 계산기 도구 종합 허브

## 🚀 빠른 시작 (배포)

### 1. GitHub에 올리기
1. [github.com](https://github.com)에서 새 저장소 만들기
2. 이 폴더 전체를 업로드
3. `index.html`이 루트에 있는지 확인

### 2. Vercel 연결
1. [vercel.com](https://vercel.com) 가입 (GitHub 계정으로)
2. **Add New → Project → 저장소 선택 → Deploy**
3. 30초 후 `xxx.vercel.app` 주소로 라이브

### 3. 배포 후 할 일
- [ ] Google Search Console에 사이트 등록
- [ ] `sitemap.xml` 제출
- [ ] 도메인 구매 (선택, 1~2만원/년)
- [ ] 콘텐츠 20~30개 추가 후 AdSense 신청

## ✏️ 수정하는 법

**가장 쉬운 방법**: GitHub 웹에서 직접 편집
1. 저장소 → 수정할 파일 클릭
2. 연필 아이콘 클릭 → 수정 → Commit
3. Vercel이 1분 내 자동 재배포

**Claude Code로 수정**: 이 프로젝트는 `CLAUDE.md`에 컨텍스트가 잘 정리되어 있어 Claude Code에 폴더 통째로 넘기면 즉시 작업 가능합니다.

## 🛠️ 새 계산기 추가하기

```bash
# 1. 템플릿 복사
cp tools/_template.html tools/severance.html

# 2. 파일 안의 메타태그·로직·UI 수정

# 3. sitemap.xml에 URL 추가

# 4. index.html의 "함께 쓰면 좋은 도구" 카드 활성화
```

자세한 가이드는 [`tools/README.md`](./tools/README.md) 참고.

## 🎨 디자인 시스템

색상·폰트·스페이싱은 `index.html`의 `:root` CSS 변수에 정의되어 있습니다. 새 도구도 이 변수를 그대로 복사해서 사용하세요.

| 토큰 | 값 | 용도 |
|---|---|---|
| `--bg` | `#FAF7F2` | 메인 배경 |
| `--ink` | `#1A1815` | 본문 텍스트 |
| `--accent` | `#D94A1F` | 강조 색 (불꽃 오렌지) |
| `--bg-card` | `#FFFFFF` | 카드 배경 |
| 폰트 (본문) | Pretendard Variable | 한글 |
| 폰트 (헤딩) | Fraunces | 영문 디스플레이 |

## 📊 현재 구현 상태

- [x] 메인 연봉 실수령액 계산기 (`/`)
- [x] 4대보험 자동 계산
- [x] 누진세 + 인적공제 + 자녀세액공제 반영
- [x] 연봉별 비교표
- [x] 결과 공유 (Web Share API + 클립보드)
- [x] URL 파라미터로 결과 재현
- [x] OG 태그 + JSON-LD 구조화 데이터
- [ ] 퇴직금 계산기 (`/tools/severance.html`)
- [ ] 시급 계산기 (`/tools/hourly.html`)
- [ ] 연차수당 계산기 (`/tools/annual-leave.html`)
- [ ] 4대보험 단독 계산기 (`/tools/insurance.html`)
- [ ] AdSense 활성화
- [ ] GA4 연동
- [ ] OG 이미지 디자인

## 📁 폴더 구조

```
mwage/
├── index.html              # 메인 페이지
├── tools/                  # 추가 계산기들
│   ├── _template.html      # 새 도구 템플릿
│   └── README.md           # 도구 추가 가이드
├── assets/                 # 이미지·OG 이미지
├── docs/                   # 운영 문서
├── robots.txt
├── sitemap.xml
├── vercel.json
├── CLAUDE.md               # AI 어시스턴트용 컨텍스트
└── README.md               # 이 파일
```

## 🔧 로컬 개발

빌드 도구가 없으므로 별도 설치 없이 정적 서버만 띄우면 됩니다.

```bash
# Python 3
python3 -m http.server 8000

# 또는 Node.js
npx serve

# 브라우저에서 http://localhost:8000 열기
```

## 📈 SEO 체크리스트

새 페이지 추가 시:
- [ ] `<title>` (50~60자, 핵심 키워드 포함)
- [ ] `<meta name="description">` (150~160자)
- [ ] `<link rel="canonical">`
- [ ] Open Graph 메타태그 4종
- [ ] JSON-LD 구조화 데이터
- [ ] `sitemap.xml` 갱신
- [ ] 다른 도구로 가는 내부 링크 최소 2개
- [ ] H1 태그 1개만 (페이지 주제)
- [ ] 모바일 반응형 확인

## 📝 라이선스

운영자 개인 프로젝트. 코드 참고는 자유.

## 💡 도움 받기

- 코드 수정 막힐 때: Claude (claude.ai) 또는 Claude Code에 `CLAUDE.md`와 함께 질문
- 배포 문제: [Vercel Docs](https://vercel.com/docs)
- SEO 문제: [Google Search Central](https://developers.google.com/search)
- AdSense 정책: [AdSense Help](https://support.google.com/adsense)
