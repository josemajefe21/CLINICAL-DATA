# 🔥 Configuración de Firebase para Bitácora High Stakes

## 📋 Pasos para Configurar el Sistema de Usuarios

### 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Dale un nombre como "Bitacora High Stakes"
4. Puedes desactivar Google Analytics si no lo necesitas
5. Haz clic en "Crear proyecto"

### 2. Habilitar Autenticación

1. En el panel izquierdo, ve a "Authentication"
2. Haz clic en "Get started"
3. Ve a la pestaña "Sign-in method"
4. Habilita "Email/Password" haciendo clic en el botón
5. Marca "Email/Password" como habilitado
6. Haz clic en "Save"

### 3. Crear Base de Datos Firestore

1. En el panel izquierdo, ve a "Firestore Database"
2. Haz clic en "Create database"
3. Selecciona "Start in test mode" (para desarrollo)
4. Elige una ubicación cercana a ti (ej: us-central1)
5. Haz clic en "Done"

### 4. Configurar Reglas de Seguridad

1. En Firestore Database, ve a la pestaña "Rules"
2. Reemplaza las reglas existentes con estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Los usuarios solo pueden acceder a sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Los usuarios pueden acceder a sus bitácoras
      match /bitacoras/{bitacoraId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

3. Haz clic en "Publish"

### 5. Obtener Configuración

1. En el panel izquierdo, haz clic en el ícono de engranaje ⚙️ junto a "Project Overview"
2. Selecciona "Project settings"
3. Baja hasta "Your apps" y haz clic en el ícono de web (</>)
4. Dale un nombre a tu app (ej: "Bitacora Web")
5. Puedes marcar "Also set up Firebase Hosting" si quieres
6. Haz clic en "Register app"
7. Copia la configuración que aparece

### 6. Actualizar Archivo de Configuración

Reemplaza los valores en `firebase-config.js` con tu configuración real:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key-real-aqui",
  authDomain: "tu-proyecto-real.firebaseapp.com",
  projectId: "tu-proyecto-real-id",
  storageBucket: "tu-proyecto-real.appspot.com",
  messagingSenderId: "tu-messaging-sender-id-real",
  appId: "tu-app-id-real"
};
```

## 🚀 Características del Sistema

### ✅ Autenticación Segura
- Login/Registro con email y contraseña
- Recuperación de contraseñas
- Sesiones persistentes
- Logout seguro

### ✅ Base de Datos en la Nube
- Datos sincronizados en tiempo real
- Respaldo automático
- Acceso desde cualquier dispositivo
- Funciona offline con sincronización

### ✅ Gestión de Usuarios
- Cada usuario ve solo sus bitácoras
- Perfiles de usuario
- Migración automática de datos locales
- Seguridad por usuario

### ✅ Funcionalidades Avanzadas
- Persistencia offline
- Sincronización automática
- Manejo de errores robusto
- Interfaz responsiva

## 🔧 Configuración Adicional

### Habilitar Dominios Autorizados
1. En Authentication > Settings > Authorized domains
2. Agrega tu dominio de Vercel (ej: `tu-app.vercel.app`)

### Configurar Hosting (Opcional)
1. Instala Firebase CLI: `npm install -g firebase-tools`
2. Inicia sesión: `firebase login`
3. Inicializa: `firebase init hosting`
4. Despliega: `firebase deploy`

## 📱 Uso del Sistema

### Para Usuarios Nuevos:
1. Abrir la aplicación
2. Hacer clic en "Crear Cuenta"
3. Completar formulario de registro
4. Los datos locales se migran automáticamente

### Para Usuarios Existentes:
1. Abrir la aplicación
2. Hacer clic en "Iniciar Sesión"
3. Ingresar email y contraseña
4. Acceder a todas las bitácoras

## 🛡️ Seguridad

- ✅ Contraseñas encriptadas por Firebase
- ✅ Autenticación por token
- ✅ Reglas de seguridad en Firestore
- ✅ Datos separados por usuario
- ✅ HTTPS obligatorio

## 📞 Soporte

Si tienes problemas:
1. Verifica la configuración de Firebase
2. Revisa la consola del navegador
3. Asegúrate de que las reglas de Firestore estén correctas
4. Verifica que la autenticación esté habilitada

¡Tu sistema de usuarios estará listo y funcionando! 🌱 

## Solución de problemas

### Error "api-key-not-valid"
- Asegúrate de haber reemplazado todos los valores de placeholder en `firebase-config.js`
- Verifica que la API key sea correcta

### Error 401 en manifest.json
- Este es un error menor relacionado con el PWA
- No afecta la funcionalidad principal

### Error de persistencia
- Es normal en desarrollo
- No afecta la funcionalidad

## Notas importantes

- **Seguridad**: Las reglas de Firestore están configuradas para que cada usuario solo vea sus propios datos
- **Desarrollo**: Usa "test mode" para desarrollo, pero cambia a reglas más estrictas para producción
- **Backup**: Los datos se sincronizan automáticamente entre dispositivos
- **Offline**: La app funciona offline y sincroniza cuando hay conexión 