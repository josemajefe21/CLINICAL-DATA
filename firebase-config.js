// Configuración de Firebase para CLINICAL DATA
console.log('🔥 Cargando firebase-config.js...');

// Verificar que Firebase esté cargado
if (typeof firebase === 'undefined') {
  console.error('❌ Firebase no está cargado. Verifica que los scripts CDN estén incluidos.');
  throw new Error('Firebase no disponible');
}

// Tu configuración de Firebase - CORREGIDA PARA ERRORES 400
var firebaseConfig = {
  apiKey: "AIzaSyDpwMc60IPAJiBwYU6PPc0QHrHSqhKjE8s",
  authDomain: "clinical-70644.firebaseapp.com",
  projectId: "clinical-70644",
  storageBucket: "clinical-70644.firebasestorage.app", 
  messagingSenderId: "166670165939",
  appId: "1:166670165939:web:05e9352a1a96dbd2a58dc6", // CORREGIDO: era 166670165639, ahora 166670165939
  measurementId: "G-XJDZ9Z4KJJ"
};

try {
  // Inicializar Firebase solo si no está inicializado
  if (!firebase.apps.length) {
    console.log('🚀 Inicializando Firebase...');
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase inicializado correctamente');
  } else {
    console.log('✅ Firebase ya estaba inicializado');
  }

  // Servicios globales con verificación
  if (firebase.auth && firebase.firestore) {
    window.auth = firebase.auth();
    window.db = firebase.firestore();
    
    console.log('✅ Firebase Auth disponible:', !!window.auth);
    console.log('✅ Firebase Firestore disponible:', !!window.db);
    
    // Configuración robusta de Firestore para evitar errores 400
    try {
      window.db.settings({
        experimentalAutoDetectLongPolling: true,
        experimentalForceLongPolling: false,
        merge: true
      });
      console.log('✅ Configuración de Firestore aplicada');
    } catch (e) {
      console.warn('⚠️ No se pudieron aplicar ajustes de Firestore:', e);
    }

    // Deshabilitar persistencia temporalmente para evitar errores
    console.log('⚠️ Persistencia offline deshabilitada temporalmente para debug');
      
  } else {
    console.error('❌ Firebase Auth o Firestore no disponibles');
  }
  
} catch (error) {
  console.error('❌ Error al inicializar Firebase:', error);
} 