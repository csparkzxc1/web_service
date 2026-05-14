# ============================================================
# 월급플러스 - 실업급여 메뉴 일괄 추가 스크립트
# ============================================================
# 사용법: 이 파일을 web_service 폴더에 두고 PowerShell에서 실행
#   .\add-unemployment-menu.ps1
# 
# 기능:
#   - 모든 HTML 페이지의 상단 메뉴에 "실업급여" 링크 추가
#   - 메인 페이지의 도구 카드 영역에 실업급여 카드 추가 (수동)
#   - 변경된 파일 목록 표시
# ============================================================

$ErrorActionPreference = "Stop"

# 작업 폴더 확인
if (-not (Test-Path ".\index.html")) {
    Write-Host "❌ 오류: 이 스크립트는 web_service 폴더에서 실행해야 합니다." -ForegroundColor Red
    Write-Host "   현재 위치: $(Get-Location)" -ForegroundColor Yellow
    exit 1
}

Write-Host "🚀 실업급여 메뉴 일괄 추가 시작" -ForegroundColor Cyan
Write-Host ""

# 추가할 메뉴 항목
$insuranceLink = '<a href="/tools/insurance.html">4대보험</a>'
$unemploymentLink = '<a href="/tools/unemployment.html">실업급여</a>'

# 검색 패턴: 4대보험 링크 (active 클래스 유무 모두 처리)
$patterns = @(
    @{
        Find = '<a href="/tools/insurance.html">4대보험</a>'
        Replace = '<a href="/tools/insurance.html">4대보험</a>' + "`n      " + '<a href="/tools/unemployment.html">실업급여</a>'
    },
    @{
        Find = '<a href="/tools/insurance.html" class="active">4대보험</a>'
        Replace = '<a href="/tools/insurance.html" class="active">4대보험</a>' + "`n      " + '<a href="/tools/unemployment.html">실업급여</a>'
    }
)

# 처리할 HTML 파일 목록
$htmlFiles = Get-ChildItem -Recurse -Filter "*.html" | Where-Object { 
    $_.FullName -notmatch '\\node_modules\\' -and 
    $_.FullName -notmatch '\\\.git\\' 
}

$modifiedCount = 0
$alreadyDoneCount = 0
$skippedCount = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")

    # 이미 추가되어 있는지 확인
    if ($content -match '/tools/unemployment\.html') {
        Write-Host "  ⏭  이미 추가됨: $relativePath" -ForegroundColor DarkGray
        $alreadyDoneCount++
        continue
    }

    # 4대보험 링크가 있는지 확인
    if ($content -notmatch '/tools/insurance\.html') {
        Write-Host "  ⏭  4대보험 링크 없음: $relativePath" -ForegroundColor DarkGray
        $skippedCount++
        continue
    }

    # 패턴 매칭으로 교체
    $modified = $false
    foreach ($pattern in $patterns) {
        if ($content.Contains($pattern.Find)) {
            $content = $content.Replace($pattern.Find, $pattern.Replace)
            $modified = $true
        }
    }

    if ($modified) {
        # UTF-8 BOM 없이 저장
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "  ✅ 수정됨: $relativePath" -ForegroundColor Green
        $modifiedCount++
    }
}

Write-Host ""
Write-Host "===== 결과 요약 =====" -ForegroundColor Cyan
Write-Host "  ✅ 수정됨: $modifiedCount 개 파일" -ForegroundColor Green
Write-Host "  ⏭  이미 추가됨: $alreadyDoneCount 개 파일" -ForegroundColor DarkGray
Write-Host "  ⏭  건너뜀: $skippedCount 개 파일" -ForegroundColor DarkGray
Write-Host ""

if ($modifiedCount -gt 0) {
    Write-Host "💡 다음 단계:" -ForegroundColor Yellow
    Write-Host "  1. tools/unemployment.html 파일을 tools/ 폴더에 복사"
    Write-Host "  2. 메인 페이지(index.html)의 도구 카드 영역에 실업급여 카드 수동 추가"
    Write-Host "  3. sitemap.xml에 unemployment.html URL 추가"
    Write-Host "  4. git add . && git commit -m ""Add unemployment calculator + menu"" && git push"
    Write-Host ""
}
