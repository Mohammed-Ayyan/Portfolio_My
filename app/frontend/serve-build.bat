@echo off
setlocal

set APP_DIR=%~dp0
subst X: /D >nul 2>nul
subst X: "%APP_DIR%"

cd /d X:\
set PORT=3002

"C:\Program Files\nodejs\node.exe" "X:\serve-build.js"
subst X: /D >nul 2>nul
