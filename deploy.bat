@echo off
echo Haciendo commit y deploy...
git commit -m "feat: Vercel config - DEPLOY SIEMPRE EN VERCEL"
git push origin main
echo Deploy completado!
pause
