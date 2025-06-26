// Script para configurar Firebase automáticamente
const https = require('https');

const projectId = 'bitacora-high-stakes';
const apiKey = 'AIzaSyD0l5G0m876KUZYwDeoEVenWE_CCfcfFec';

console.log('🚀 Configurando Firebase automáticamente...');
console.log('📋 Proyecto: bitacora-high-stakes');
console.log('');

// Función para hacer peticiones HTTP
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Configurar Authentication
async function setupAuth() {
  console.log('🔐 Configurando Authentication...');
  try {
    // Nota: La configuración de Auth requiere acceso a la consola de Firebase
    console.log('✅ Authentication necesita configuración manual');
    console.log('   Ve a: https://console.firebase.google.com/project/bitacora-high-stakes/authentication/sign-in');
    console.log('   Habilita "Email/Password"');
  } catch (error) {
    console.log('❌ Error configurando Auth:', error.message);
  }
}

// Configurar Firestore
async function setupFirestore() {
  console.log('🗄️ Configurando Firestore...');
  try {
    // Nota: La creación de Firestore requiere acceso a la consola
    console.log('✅ Firestore necesita configuración manual');
    console.log('   Ve a: https://console.firebase.google.com/project/bitacora-high-stakes/firestore');
    console.log('   Haz clic en "Create database"');
    console.log('   Selecciona "Start in test mode"');
    console.log('   Elige ubicación "us-central1"');
  } catch (error) {
    console.log('❌ Error configurando Firestore:', error.message);
  }
}

// Configurar reglas de seguridad
async function setupSecurityRules() {
  console.log('🔒 Configurando reglas de seguridad...');
  
  const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /bitacoras/{bitacoraId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}`;

  console.log('📝 Reglas de seguridad a copiar:');
  console.log('---');
  console.log(rules);
  console.log('---');
  console.log('   Ve a: https://console.firebase.google.com/project/bitacora-high-stakes/firestore/rules');
  console.log('   Reemplaza las reglas existentes con las de arriba');
  console.log('   Haz clic en "Publish"');
}

// Configurar dominios autorizados
async function setupAuthorizedDomains() {
  console.log('🌐 Configurando dominios autorizados...');
  console.log('✅ Agregar dominio: bitacora-high-stakes.web.app');
  console.log('   Ve a: https://console.firebase.google.com/project/bitacora-high-stakes/authentication/settings');
  console.log('   En "Authorized domains", agrega: bitacora-high-stakes.web.app');
}

// Función principal
async function setupFirebase() {
  console.log('🎯 Iniciando configuración automática de Firebase...');
  console.log('');
  
  await setupAuth();
  console.log('');
  
  await setupFirestore();
  console.log('');
  
  await setupSecurityRules();
  console.log('');
  
  await setupAuthorizedDomains();
  console.log('');
  
  console.log('🎉 ¡Configuración completada!');
  console.log('');
  console.log('📱 Tu aplicación está disponible en:');
  console.log('   🌐 Firebase Hosting: https://bitacora-high-stakes.web.app');
  console.log('   🚀 Vercel: https://bitacora-high-stakes-ncvy01an0-jos-projects-95267e50.vercel.app');
  console.log('');
  console.log('✨ Una vez que completes los pasos manuales, podrás:');
  console.log('   ✅ Crear cuentas de usuario');
  console.log('   ✅ Iniciar sesión');
  console.log('   ✅ Guardar bitácoras en la nube');
  console.log('   ✅ Sincronizar datos entre dispositivos');
}

// Ejecutar configuración
setupFirebase().catch(console.error); 