@echo off
setlocal

set APP_DIR=%~dp0
subst X: /D >nul 2>nul
subst X: "%APP_DIR%"

set TEMP=X:\.tmp
set TMP=X:\.tmp
set USERPROFILE=X:\.home
if not exist "%TEMP%" mkdir "%TEMP%"
if not exist "%USERPROFILE%" mkdir "%USERPROFILE%"

cd /d X:\
set PORT=3001
set HOST=127.0.0.1
set BROWSER=none

"C:\Program Files\nodejs\node.exe" "X:\node_modules\@craco\craco\dist\bin\craco.js" start
subst X: /D >nul 2>nul
