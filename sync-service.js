// Servicio de sincronización alternativo sin Firebase
class SyncService {
  constructor() {
    this.baseUrl = 'https://api.jsonbin.io/v3/b';
    this.apiKey = '$2a$10$8K9wZ2fX3vY1qR5tN7mO8eH6pL4jS9dF2gA5cB8xE1wQ3rT6yU9iK'; // API key pública para testing
    this.userBins = new Map(); // Cache de bins por usuario
  }

  // Generar ID único para el usuario
  generateUserBinId(userEmail) {
    return btoa(userEmail).replace(/[^a-zA-Z0-9]/g, '').substring(0, 24);
  }

  // Guardar datos del usuario
  async saveUserData(userEmail, data) {
    try {
      console.log('🌐 Guardando datos en servicio de sincronización...');
      console.log('👤 Usuario:', userEmail);
      console.log('📊 Datos:', { pacientes: data.pacientes?.length || 0 });

      const binId = this.generateUserBinId(userEmail);
      const url = `${this.baseUrl}/${binId}`;

      const payload = {
        user: userEmail,
        timestamp: new Date().toISOString(),
        data: data,
        version: '2.0'
      };

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': this.apiKey,
          'X-Bin-Name': `clinical-data-${userEmail.split('@')[0]}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('✅ Datos guardados en servicio de sincronización');
        return true;
      } else {
        console.error('❌ Error guardando en servicio:', response.status);
        return false;
      }

    } catch (error) {
      console.error('❌ Error en servicio de sincronización:', error);
      return false;
    }
  }

  // Cargar datos del usuario
  async loadUserData(userEmail) {
    try {
      console.log('📥 Cargando datos desde servicio de sincronización...');
      console.log('👤 Usuario:', userEmail);

      const binId = this.generateUserBinId(userEmail);
      const url = `${this.baseUrl}/${binId}/latest`;

      const response = await fetch(url, {
        headers: {
          'X-Master-Key': this.apiKey
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Datos cargados desde servicio de sincronización');
        console.log('📊 Datos:', { pacientes: result.record?.data?.pacientes?.length || 0 });
        return result.record?.data || null;
      } else if (response.status === 404) {
        console.log('ℹ️ No hay datos en servicio de sincronización para este usuario');
        return null;
      } else {
        console.error('❌ Error cargando desde servicio:', response.status);
        return null;
      }

    } catch (error) {
      console.error('❌ Error en carga desde servicio:', error);
      return null;
    }
  }
}

// Instancia global del servicio
window.syncService = new SyncService();
