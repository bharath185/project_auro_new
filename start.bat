@echo off
echo.
echo  ╔═══════════════════════════════════════╗
echo  ║       PROJECT AURO — STARTING...      ║
echo  ╚═══════════════════════════════════════╝
echo.

:: Load environment variables from .env
for /f "tokens=1,2 delims==" %%A in (.env) do (
    if not "%%A"=="" (
        if not "%%A:~0,1%"=="#" (
            set %%A=%%B
        )
    )
)

set GEMINI_CLI_TRUST_WORKSPACE=true

echo  Starting Project Auro on http://127.0.0.1:3100 ...
echo  Press Ctrl+C to stop.
echo.

pnpm paperclipai run
