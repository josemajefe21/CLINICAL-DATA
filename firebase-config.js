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

// Función de login personalizada
window.auth.login = async function(email, password) {
  return await window.auth.signInWithEmailAndPassword(email, password);
};

console.log('Firebase Auth disponible:', !!window.auth);
console.log('Firebase Firestore disponible:', !!window.db);

// Ajustes de Firestore para redes/restricciones (mitiga errores 400 y proxies)
try {
  window.db.settings({
    experimentalAutoDetectLongPolling: true
  });
} catch (e) {
  console.warn('No se pudieron aplicar ajustes de Firestore:', e);
}

// Habilitar persistencia offline (sincronizada entre pestañas)
window.db.enablePersistence({ synchronizeTabs: true })
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Persistencia falló - múltiples pestañas abiertas sin sincronización');
    } else if (err.code == 'unimplemented') {
      console.log('Persistencia no soportada por el navegador');
    } else {
      console.warn('Error al habilitar persistencia:', err);
    }
  }); 