@echo off
cd /d "%~dp0"
start chrome http://localhost:5173
npm run dev:all
