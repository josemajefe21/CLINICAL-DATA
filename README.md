# CLINICAL DATA - Sistema de Gestión de Pacientes

## 🚀 Deploy Automático en Vercel

Este proyecto está configurado para deploy automático en Vercel.

### Configuración de Deploy:

1. **Conectar con GitHub:**
   ```bash
   vercel --prod
   ```

2. **Deploy automático:**
   - Cada push a `main` despliega automáticamente
   - URL de producción: Se generará automáticamente

### Comandos importantes:

```bash
# Deploy manual
vercel --prod

# Deploy de preview
vercel

# Ver logs
vercel logs

# Ver dominios
vercel domains
```

### Configuración:
- ✅ `vercel.json` configurado para SPA
- ✅ Rutas configuradas para Firebase
- ✅ Deploy automático activado

## 📋 Funcionalidades:

- ✅ Gestión de pacientes
- ✅ Consultas médicas
- ✅ Historial clínico
- ✅ Autenticación con Firebase
- ✅ Almacenamiento en Firestore
- ✅ Interfaz responsive

## 🔧 Tecnologías:

- HTML5, CSS3, JavaScript
- Firebase Auth & Firestore
- Chart.js para gráficos
- PWA Ready
