// Configuración de Firebase para CLINICAL DATA
// Este archivo debe cargarse DESPUÉS de los scripts de Firebase CDN y ANTES de cualquier script que use 'auth' o 'db'.

// Tu configuración de Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDpwMc60IPAJiBwYU6PPc0QHrHSqhKjE8s",
  authDomain: "clinical-70644.firebaseapp.com",
  projectId: "clinical-70644",
  storageBucket: "clinical-70644.firebasestorage.app",
  messagingSenderId: "166670165939",
  appId: "1:166670165939:web:05e9352a1a96dbd2a58dc6",
  measurementId: "G-XJDZ9Z4KJJ"
};

// Inicializar Firebase solo si no está inicializado
if (!firebase.apps.length) {
  console.log('Inicializando Firebase...');
  firebase.initializeApp(firebaseConfig);
  console.log('Firebase inicializado correctamente');
} else {
  console.log('Firebase ya estaba inicializado');
}

// Servicios globales
window.auth = firebase.auth();
window.db = firebase.firestore();

console.log('Firebase Auth disponible:', !!window.auth);
console.log('Firebase Firestore disponible:', !!window.db);

// Ajustes mejorados de Firestore para mejor conectividad
try {
  window.db.settings({
    experimentalAutoDetectLongPolling: true,
    merge: true,
    ignoreUndefinedProperties: true
  });
  console.log('✅ Configuración de Firestore aplicada correctamente');
} catch (e) {
  console.warn('⚠️ No se pudieron aplicar ajustes de Firestore:', e);
}

// Habilitar persistencia offline (sincronizada entre pestañas)
window.db.enablePersistence({ synchronizeTabs: true })
  .then(() => {
    console.log('✅ Persistencia offline habilitada');
  })
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('⚠️ Persistencia falló - múltiples pestañas abiertas');
      // Intentar sin sincronización de pestañas
      return window.db.enablePersistence({ synchronizeTabs: false });
    } else if (err.code == 'unimplemented') {
      console.log('⚠️ Persistencia no soportada por el navegador');
    } else {
      console.warn('⚠️ Error al habilitar persistencia:', err);
    }
  })
  .then(() => {
    console.log('✅ Persistencia habilitada (modo fallback)');
  })
  .catch((err) => {
    console.warn('❌ No se pudo habilitar persistencia:', err);
  }); 