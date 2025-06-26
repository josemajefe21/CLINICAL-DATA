// Script para configurar Firebase automáticamente
const admin = require('firebase-admin');

// Configuración del proyecto
const projectId = 'bitacora-high-stakes';

// Inicializar Firebase Admin (esto requiere una clave de servicio)
// Por ahora, vamos a crear un script que configure las reglas de Firestore

console.log('Configurando Firebase para el proyecto:', projectId);
console.log('Por favor, sigue estos pasos manuales:');
console.log('');
console.log('1. Ve a https://console.firebase.google.com/project/bitacora-high-stakes/overview');
console.log('2. Ve a "Authentication" → "Sign-in method"');
console.log('3. Habilita "Email/Password"');
console.log('4. Ve a "Firestore Database"');
console.log('5. Haz clic en "Create database"');
console.log('6. Selecciona "Start in test mode"');
console.log('7. Elige ubicación "us-central1"');
console.log('8. En "Rules", reemplaza con las reglas de seguridad');
console.log('9. En "Authentication" → "Settings" → "Authorized domains"');
console.log('10. Agrega: bitacora-high-stakes.web.app');
console.log('');
console.log('¡Listo! Tu aplicación estará completamente funcional.'); 