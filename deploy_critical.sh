#!/bin/bash
echo "🚨 DEPLOY CRÍTICO - Persistencia de datos"
git add .
git commit -m "fix: CRÍTICO - Persistencia permanente de pacientes en localStorage"
git push origin main
echo "✅ Deploy crítico completado"
