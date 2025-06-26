// Configuración de Firebase para CLINICAL DATA
// Reemplaza estos valores por los de tu propio proyecto en https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener servicios
const auth = firebase.auth();
const db = firebase.firestore();

// Configuración de Firestore
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

// Habilitar persistencia offline
db.enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Persistencia falló - múltiples pestañas abiertas');
    } else if (err.code == 'unimplemented') {
      console.log('Persistencia no soportada por el navegador');
    }
  }); 