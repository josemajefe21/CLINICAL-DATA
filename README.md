# Bitácora High Stakes 🌱

Aplicación web profesional para seguimiento de cultivos, con sistema de usuarios y base de datos en la nube.

## 🚀 Características Principales

### 🔐 Sistema de Usuarios
- **Autenticación segura** con email y contraseña
- **Cada usuario tiene sus propias bitácoras**
- **Datos sincronizados en la nube** (Firebase)
- **Acceso desde cualquier dispositivo**
- **Migración automática** de datos locales

### 📊 Gestión de Cultivos
- **Múltiples bitácoras** personalizables por usuario
- **Seguimiento de etapas** (Vegetativo, Floración, General)
- **Características detalladas** de cada cultivo
- **Calendario emocional** y estadísticas
- **Sistema de respaldos** automático

### 🌱 Características de Cultivo
- **Cepas y cantidades**
- **Tipo de cultivo** (Interior/Exterior/Invernadero)
- **Equipamiento detallado** (luces, ventiladores, etc.)
- **Sistema de riego** y nutrientes
- **Seguimiento de parámetros** (pH, EC)

### 📱 Experiencia de Usuario
- **Diseño responsivo** para móviles y desktop
- **PWA (Progressive Web App)** - funciona offline
- **Interfaz intuitiva** con estilo Plantas vs Zombies
- **Sincronización en tiempo real**
- **Exportación de datos** en JSON

## 🛠️ Instalación y Configuración

### 1. Configuración Básica
```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd BITACORA-HIGH-STAKES

# Abrir en el navegador
start indexPVZ.html
```

### 2. Configurar Sistema de Usuarios (Opcional pero Recomendado)
1. Sigue las instrucciones en [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
2. Configura Firebase para autenticación y base de datos
3. Actualiza `firebase-config.js` con tu configuración

## 📋 Estructura del Proyecto

```
BITACORA HIGH STAKES/
├── indexPVZ.html          # Aplicación principal
├── firebase-config.js     # Configuración de Firebase
├── FIREBASE_SETUP.md      # Guía de configuración
├── manifest.json          # Configuración PWA
├── sw.js                  # Service Worker
├── icons/                 # Iconos de la aplicación
├── js/                    # Scripts adicionales
└── README.md             # Este archivo
```

## 🔧 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Base de Datos**: Firebase Firestore
- **Autenticación**: Firebase Auth
- **PWA**: Service Workers, Manifest
- **Hosting**: Firebase Hosting (opcional)

## 🎯 Funcionalidades por Usuario

### 👤 Gestión de Perfil
- Registro con email y contraseña
- Perfil personalizado con nombre
- Sesiones persistentes
- Logout seguro

### 📊 Gestión de Bitácoras
- Crear múltiples bitácoras
- Editar características de cultivo
- Compartir bitácoras públicas
- Exportar datos en JSON

### 📈 Seguimiento Diario
- Registrar estado emocional
- Anotar tareas realizadas
- Control de riego y nutrientes
- Notas y observaciones

### 📅 Visualización
- Calendario de emociones
- Resumen semanal
- Historial completo
- Estadísticas de cultivo

## 🛡️ Seguridad

- ✅ **Autenticación segura** con Firebase
- ✅ **Datos encriptados** en la nube
- ✅ **Reglas de seguridad** por usuario
- ✅ **HTTPS obligatorio**
- ✅ **Respaldo automático**

## 📱 Uso Offline

La aplicación funciona completamente offline:
- **Datos locales** se guardan en el navegador
- **Sincronización automática** cuando hay conexión
- **PWA instalable** en dispositivos móviles
- **Service Worker** para cache inteligente

## 🔄 Migración de Datos

### Para Usuarios Existentes:
1. Los datos locales se migran automáticamente al registrarse
2. No se pierde ninguna información
3. Acceso inmediato desde cualquier dispositivo

### Para Usuarios Nuevos:
1. Crear cuenta con email y contraseña
2. Comenzar a usar inmediatamente
3. Datos sincronizados automáticamente

## 🚀 Despliegue

### Opción 1: Firebase Hosting (Recomendado)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Opción 2: Hosting Tradicional
- Subir archivos a cualquier servidor web
- Configurar HTTPS para PWA
- Asegurar que Firebase esté configurado

## 📞 Soporte

### Problemas Comunes:
1. **Error de configuración Firebase**: Verifica `firebase-config.js`
2. **Datos no sincronizan**: Revisa conexión a internet
3. **PWA no funciona**: Verifica HTTPS y manifest.json

### Recursos:
- [Guía Firebase](FIREBASE_SETUP.md)
- [Documentación Firebase](https://firebase.google.com/docs)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

## 🤝 Contribuciones

Las contribuciones son bienvenidas:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Smart Honey Selections**

---

🌱 **¡Tu cultivo, tu historia, tu control total!** 🌱 