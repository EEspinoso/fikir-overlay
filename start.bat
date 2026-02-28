@echo off
title Fikir Overlay Sistemi
color 0a

echo ==========================================
echo        Fikir Overlay Sistemi v2
echo ==========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [HATA] Node.js bulunamadi!
    echo.
    echo Node.js indirmek icin: https://nodejs.org
    echo Kurduktan sonra bu dosyayi tekrar calistirin.
    echo.
    pause
    exit /b
)

:: Auto-install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Ilk calistirma - paketler yukleniyor...
    echo.
    npm install
    echo.
    echo Paketler yuklendi!
    echo.
)

echo Sunucu baslatiliyor...
echo.
echo   Panel:     http://localhost:3000/panel.html
echo   Overlay:   http://localhost:3000/overlay.html
echo   Dashboard: http://localhost:3000/dashboard.html
echo.
echo (Durdurmak icin CTRL+C)
echo ==========================================
echo.

node server.js

echo.
echo Sunucu kapandi.
pause
