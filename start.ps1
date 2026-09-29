# Project Auro — PowerShell Startup Script
Write-Host ""
Write-Host "  ╔═══════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║       PROJECT AURO — STARTING...      ║" -ForegroundColor Cyan
Write-Host "  ╚═══════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Load .env file
if (Test-Path ".env") {
    Get-Content ".env" | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#")) {
            $parts = $line -split "=", 2
            if ($parts.Count -eq 2) {
                [System.Environment]::SetEnvironmentVariable($parts[0].Trim(), $parts[1].Trim(), "Process")
                $env:($parts[0].Trim()) = $parts[1].Trim()
            }
        }
    }
    Write-Host "  ✅ Loaded .env" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  No .env file found. Using system environment variables." -ForegroundColor Yellow
}

# Force trust workspace
$env:GEMINI_CLI_TRUST_WORKSPACE = "true"

Write-Host ""
Write-Host "  🚀 Starting Project Auro on http://127.0.0.1:3100" -ForegroundColor White
Write-Host "  📋 Open browser to: http://127.0.0.1:3100" -ForegroundColor Gray
Write-Host "  🛑 Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host ""

pnpm paperclipai run
