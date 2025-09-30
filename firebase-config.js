// Configuración de Firebase para CLINICAL DATA - VERSIÓN CORREGIDA
console.log('🔥 Inicializando Firebase con configuración corregida...');

// Verificar que Firebase esté cargado
if (typeof firebase === 'undefined') {
  console.error('❌ Firebase no está cargado. Verifica que los scripts CDN estén incluidos.');
  throw new Error('Firebase no disponible');
}

// Configuración de Firebase COMPLETAMENTE CORREGIDA
var firebaseConfig = {
  apiKey: "AIzaSyDpwMc60IPAJiBwYU6PPc0QHrHSqhKjE8s",
  authDomain: "clinical-70644.firebaseapp.com",
  projectId: "clinical-70644",
  storageBucket: "clinical-70644.appspot.com", // CORREGIDO: .appspot.com en lugar de .firebasestorage.app
  messagingSenderId: "166670165939",
  appId: "1:166670165939:web:05e9352a1a96dbd2a58dc6",
  measurementId: "G-XJDZ9Z4KJJ"
};

console.log('🔧 Configuración Firebase:', firebaseConfig);

try {
  // Limpiar cualquier inicialización previa
  if (firebase.apps.length > 0) {
    console.log('🧹 Limpiando apps Firebase previas...');
    firebase.apps.forEach(app => {
      try {
        app.delete();
      } catch (e) {
        console.warn('Advertencia limpiando app:', e);
      }
    });
  }

  // Inicializar Firebase con configuración corregida
  console.log('🚀 Inicializando Firebase con configuración corregida...');
  const app = firebase.initializeApp(firebaseConfig);
  console.log('✅ Firebase inicializado exitosamente');

  // Servicios globales
  window.auth = firebase.auth();
  window.db = firebase.firestore();
  
  console.log('✅ Firebase Auth disponible:', !!window.auth);
  console.log('✅ Firebase Firestore disponible:', !!window.db);
  
  // Configuración mínima de Firestore (sin opciones experimentales)
  try {
    window.db.settings({
      ignoreUndefinedProperties: true
    });
    console.log('✅ Configuración básica de Firestore aplicada');
  } catch (e) {
    console.warn('⚠️ No se pudieron aplicar ajustes básicos:', e);
  }

  // NO habilitar persistencia para evitar conflictos
  console.log('ℹ️ Persistencia offline deshabilitada para evitar errores 400');
  
} catch (error) {
  console.error('❌ Error crítico al inicializar Firebase:', error);
  console.error('🔍 Detalles del error:', error.message);
  
  // Crear servicios mock básicos para que no se rompa la app
  window.auth = {
    currentUser: null,
    onAuthStateChanged: function(callback) {
      console.log('⚠️ Usando auth mock');
      setTimeout(() => callback(null), 100);
      return () => {};
    },
    signInWithEmailAndPassword: function() {
      return Promise.reject(new Error('Firebase Auth no disponible'));
    },
    createUserWithEmailAndPassword: function() {
      return Promise.reject(new Error('Firebase Auth no disponible'));
    },
    signOut: function() {
      return Promise.resolve();
    }
  };
  
  window.db = {
    collection: function() {
      return {
        doc: function() {
          return {
            set: function() { return Promise.reject(new Error('Firestore no disponible')); },
            get: function() { return Promise.reject(new Error('Firestore no disponible')); }
          };
        },
        get: function() { return Promise.reject(new Error('Firestore no disponible')); }
      };
    },
    settings: function() {},
    enablePersistence: function() { return Promise.resolve(); }
  };
} 