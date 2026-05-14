# ============================================================
# 월급플러스 - 실업급여 메뉴 일괄 추가 스크립트 v2
# ============================================================
# 변경 사항: 정규식 기반 매칭으로 한글 인코딩 이슈 우회
# ============================================================

$ErrorActionPreference = "Stop"

# 콘솔 UTF-8 출력 강제
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()

if (-not (Test-Path ".\index.html")) {
    Write-Host "[ERROR] web_service 폴더에서 실행해야 합니다." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== 실업급여 메뉴 일괄 추가 v2 시작 ===" -ForegroundColor Cyan
Write-Host ""

# 정규식 패턴: insurance.html 링크를 텍스트 무관하게 매칭
# (?:[^<]*)<\/a> 부분이 "4대보험" 같은 모든 텍스트를 흡수
$pattern = '(<a\s+href="/tools/insurance\.html"(?:\s+class="[^"]*")?>[^<]*</a>)'

# 교체 텍스트: 원본 보존 + 실업급여 링크 추가
$replacement = '$1' + "`r`n      " + '<a href="/tools/unemployment.html">실업급여</a>'

$htmlFiles = Get-ChildItem -Recurse -Filter "*.html" | Where-Object { 
    $_.FullName -notmatch '\\node_modules\\' -and 
    $_.FullName -notmatch '\\\.git\\' 
}

$modifiedCount = 0
$alreadyDoneCount = 0
$skippedCount = 0

foreach ($file in $htmlFiles) {
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
    
    # UTF-8로 읽기 (BOM 자동 처리)
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.UTF8Encoding]::new())
    
    # 이미 추가되어 있는지
    if ($content -match '/tools/unemployment\.html') {
        Write-Host "  [SKIP-DONE] $relativePath" -ForegroundColor DarkGray
        $alreadyDoneCount++
        continue
    }
    
    # insurance.html 링크 있는지 (네비 메뉴 항목만, tool-card 제외)
    # 네비 메뉴는 보통 <a href="..."> 뒤에 짧은 텍스트만 (<a class="tool-card">와 구분)
    if ($content -notmatch '<a\s+href="/tools/insurance\.html"(?:\s+class="active")?>') {
        Write-Host "  [SKIP-NOLINK] $relativePath" -ForegroundColor DarkGray
        $skippedCount++
        continue
    }
    
    # 정규식 교체 (네비 메뉴의 단순 링크만 매칭)
    $newContent = $content -replace $pattern, $replacement
    
    if ($newContent -ne $content) {
        # UTF-8 BOM 없이 저장 (Vercel·git 호환)
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.UTF8Encoding]::new($false))
        Write-Host "  [OK] $relativePath" -ForegroundColor Green
        $modifiedCount++
    } else {
        Write-Host "  [SKIP-NOMATCH] $relativePath" -ForegroundColor Yellow
        $skippedCount++
    }
}

Write-Host ""
Write-Host "=== 결과 요약 ===" -ForegroundColor Cyan
Write-Host "  수정됨: $modifiedCount 개" -ForegroundColor Green
Write-Host "  이미 추가됨: $alreadyDoneCount 개" -ForegroundColor DarkGray
Write-Host "  건너뜀: $skippedCount 개" -ForegroundColor DarkGray
Write-Host ""

if ($modifiedCount -gt 0) {
    Write-Host "다음 단계:" -ForegroundColor Yellow
    Write-Host "  1. index.html 도구 카드에 실업급여 카드 수동 추가"
    Write-Host "  2. sitemap.xml에 unemployment.html URL 추가"
    Write-Host "  3. git add . ; git commit -m 'Add unemployment calc' ; git push"
    Write-Host ""
}
