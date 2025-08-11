const { execSync } = require('child_process');

try {
  console.log('🚀 Iniciando deploy...');
  
  execSync('git add .', { stdio: 'inherit' });
  console.log('✅ Archivos agregados');
  
  execSync('git commit -m "fix: CRITICAL - Firebase fallback para crear pacientes SIEMPRE"', { stdio: 'inherit' });
  console.log('✅ Commit realizado');
  
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('✅ Deploy completado en Vercel');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
