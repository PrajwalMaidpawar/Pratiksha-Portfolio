# PowerShell script to start website dev server and open browser
Set-Location -Path $PSScriptRoot
Write-Host "Starting Pratiksha Website server..." -ForegroundColor Cyan
Start-Process "http://localhost:3000"
npm run dev
