# 🚀 Deploy en Vercel - Bitácora High Stakes

## 📋 Pasos para Deploy

### 1. Preparar el Proyecto

Asegúrate de tener todos estos archivos en tu proyecto:

```
BITACORA HIGH STAKES/
├── indexPVZ.html          ✅ Aplicación principal
├── firebase-config.js     ✅ Configuración Firebase
├── vercel.json           ✅ Configuración Vercel
├── package.json          ✅ Metadatos del proyecto
├── manifest.json         ✅ Configuración PWA
├── sw.js                 ✅ Service Worker
├── icons/                ✅ Iconos PWA
├── FIREBASE_SETUP.md     ✅ Guía Firebase
└── README.md             ✅ Documentación
```

### 2. Configurar Firebase (IMPORTANTE)

**ANTES del deploy, debes configurar Firebase:**

1. Sigue las instrucciones en `FIREBASE_SETUP.md`
2. Actualiza `firebase-config.js` con tu configuración real
3. Configura los dominios autorizados en Firebase Console

### 3. Opción A: Deploy con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Navegar al directorio del proyecto
cd "BITACORA HIGH STAKES"

# Iniciar sesión en Vercel
vercel login

# Deploy
vercel

# Para producción
vercel --prod
```

### 4. Opción B: Deploy con GitHub (Recomendado)

1. **Subir a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Bitácora High Stakes"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/bitacora-high-stakes.git
   git push -u origin main
   ```

2. **Conectar con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con GitHub
   - Haz clic en "New Project"
   - Importa tu repositorio
   - Vercel detectará automáticamente la configuración

### 5. Opción C: Deploy Manual

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión
3. Haz clic en "New Project"
4. Arrastra y suelta tu carpeta del proyecto
5. Vercel hará el deploy automáticamente

## ⚙️ Configuración Post-Deploy

### 1. Configurar Dominio Personalizado (Opcional)

1. En Vercel Dashboard → Tu Proyecto → Settings
2. Ve a "Domains"
3. Agrega tu dominio personalizado
4. Configura los DNS según las instrucciones

### 2. Configurar Variables de Entorno (Si es necesario)

En Vercel Dashboard → Settings → Environment Variables:

```
FIREBASE_API_KEY=tu-api-key
FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu-proyecto-id
```

### 3. Verificar Firebase

1. Ve a Firebase Console → Authentication → Settings
2. En "Authorized domains", agrega tu dominio de Vercel
3. Ejemplo: `tu-proyecto.vercel.app`

## 🔧 Optimizaciones Incluidas

### ✅ Configuración Vercel (`vercel.json`)
- **Rutas optimizadas** para PWA
- **Headers de seguridad** configurados
- **Cache control** para Service Worker
- **Compresión automática** de archivos

### ✅ PWA Ready
- **HTTPS automático** (requerido para PWA)
- **Service Worker** funcionando
- **Manifest** configurado
- **Iconos** optimizados

### ✅ Performance
- **CDN global** de Vercel
- **Compresión automática**
- **Cache inteligente**
- **Edge functions** (si es necesario)

## 🚨 Problemas Comunes

### Error: "Firebase not initialized"
- Verifica que `firebase-config.js` tenga la configuración correcta
- Asegúrate de que Firebase esté configurado antes del deploy

### Error: "Service Worker not found"
- Verifica que `sw.js` esté en la raíz del proyecto
- Asegúrate de que `vercel.json` tenga la ruta correcta

### Error: "PWA not working"
- Verifica que el dominio tenga HTTPS (Vercel lo proporciona automáticamente)
- Revisa que `manifest.json` esté configurado correctamente

### Error: "Authentication not working"
- Verifica que el dominio esté en Firebase Console → Authorized domains
- Asegúrate de que las reglas de Firestore estén configuradas

## 📊 Monitoreo

### Vercel Analytics
- Ve a tu proyecto en Vercel Dashboard
- En "Analytics" puedes ver estadísticas de uso
- Monitorea performance y errores

### Firebase Analytics (Opcional)
- Puedes agregar Firebase Analytics para más métricas
- Configura en `firebase-config.js`

## 🔄 Actualizaciones

### Deploy Automático
- Si usas GitHub, cada push a `main` hará deploy automático
- Vercel creará previews para cada pull request

### Deploy Manual
```bash
vercel --prod
```

## 🎯 URLs de Deploy

Después del deploy, tendrás:
- **URL de producción**: `https://tu-proyecto.vercel.app`
- **URL de preview**: `https://tu-proyecto-git-main.vercel.app`

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard
2. Verifica la configuración de Firebase
3. Revisa la consola del navegador
4. Consulta la documentación de Vercel

¡Tu Bitácora High Stakes estará online y funcionando! 🌱✨ 