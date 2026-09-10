@echo off
title Starting Pratiksha Website...
cd /d "%~dp0"
echo Launching dev server on http://localhost:3000 ...
timeout /t 2 /nobreak >nul
start http://localhost:3000
npm run dev
