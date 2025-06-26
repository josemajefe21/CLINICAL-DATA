import { auth } from './js/auth.js';
import { storage } from './js/storage.js';
import { showNotification } from './notifications.js';

// Mostrar/ocultar elementos
function toggleElement(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = show ? 'block' : 'none';
    }
}

// Inicialización de la app
window.addEventListener('DOMContentLoaded', () => {
    const user = auth.getCurrentUser();
    if (user) {
        mostrarApp();
    } else {
        mostrarLogin();
    }

    // Login handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = async (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUser').value.trim();
            const password = document.getElementById('loginPassword').value;
            const errorDiv = document.getElementById('loginError');
            errorDiv.style.display = 'none';
            try {
                await auth.login(username, password);
                mostrarApp();
            } catch (err) {
                errorDiv.textContent = err.message;
                errorDiv.style.display = 'block';
            }
        };
    }

    // Logout handler
    window.logout = () => {
        auth.logout();
        mostrarLogin();
    };
});

function mostrarApp() {
    toggleElement('authContainer', false);
    toggleElement('userInfo', true);
    toggleElement('fichaPaciente', false);
    document.querySelector('.pacientes-section').style.display = 'block';
    cargarPacientes();
}

function mostrarLogin() {
    toggleElement('authContainer', true);
    toggleElement('userInfo', false);
    document.querySelector('.pacientes-section').style.display = 'none';
    toggleElement('fichaPaciente', false);
}

// CRUD de pacientes (estructura básica, se completará en el siguiente paso)
window.mostrarFormularioPaciente = function() {
    document.getElementById('formPaciente').reset();
    document.getElementById('pacienteId').value = '';
    document.getElementById('tituloModalPaciente').textContent = 'Nuevo Paciente';
    document.getElementById('modalPaciente').style.display = 'block';
};

window.cerrarModalPaciente = function() {
    document.getElementById('modalPaciente').style.display = 'none';
};

window.volverAListaPacientes = function() {
    document.getElementById('fichaPaciente').style.display = 'none';
    document.querySelector('.pacientes-section').style.display = 'block';
};

// Manejo de eventos de autenticación
window.handleLogin = async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email')?.value;
    const password = document.getElementById('login-password')?.value;

    if (!email || !password) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }

    try {
        await auth.login(email, password);
        showNotification('Inicio de sesión exitoso', 'success');
        toggleElement('auth-container', false);
        toggleElement('main-content', true);
        toggleElement('sidebar', true);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        showNotification('Error al iniciar sesión', 'error');
    }
};

window.handleRegister = async (event) => {
    event.preventDefault();
    const email = document.getElementById('register-email')?.value;
    const password = document.getElementById('register-password')?.value;

    if (!email || !password) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }

    try {
        await auth.register(email, password);
        showNotification('Registro exitoso', 'success');
        toggleElement('auth-container', false);
        toggleElement('main-content', true);
        toggleElement('sidebar', true);
    } catch (error) {
        console.error('Error al registrar:', error);
        showNotification('Error al registrar', 'error');
    }
};

window.handleLogout = async () => {
    try {
        await auth.logout();
        showNotification('Sesión cerrada exitosamente', 'success');
        toggleElement('auth-container', true);
        toggleElement('main-content', false);
        toggleElement('sidebar', false);
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        showNotification('Error al cerrar sesión', 'error');
    }
};

// --- PACIENTES ---

function getPacientes() {
    return JSON.parse(localStorage.getItem('pacientes') || '[]');
}

function setPacientes(pacientes) {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
}

function cargarPacientes(filtro = '') {
    const lista = document.getElementById('listaPacientes');
    let pacientes = getPacientes();
    if (filtro) {
        const f = filtro.toLowerCase();
        pacientes = pacientes.filter(p =>
            p.nombre.toLowerCase().includes(f) ||
            p.dni.includes(f) ||
            (p.patologia && p.patologia.toLowerCase().includes(f))
        );
    }
    lista.innerHTML = pacientes.length === 0 ? '<div class="no-info">No hay pacientes registrados.</div>' :
        pacientes.map(p => `
            <div class="bitacora-card" onclick="verFichaPaciente('${p.id}')">
                <b>${p.nombre}</b><br>DNI: ${p.dni}<br><span style='font-size:0.95em;'>${p.patologia || ''}</span>
                <div class="bitacora-actions">
                    <button class="action-btn edit-btn" onclick="editarPaciente(event, '${p.id}')">✏️</button>
                    <button class="action-btn delete-btn" onclick="eliminarPaciente(event, '${p.id}')">🗑️</button>
                </div>
            </div>
        `).join('');
}

window.filtrarPacientes = function() {
    const val = document.getElementById('busquedaPaciente').value;
    cargarPacientes(val);
};

// Guardar paciente (nuevo o edición)
document.getElementById('formPaciente').onsubmit = function(e) {
    e.preventDefault();
    const id = document.getElementById('pacienteId').value || Date.now().toString();
    const nombre = document.getElementById('pacienteNombre').value.trim();
    const dni = document.getElementById('pacienteDNI').value.trim();
    const direccion = document.getElementById('pacienteDireccion').value.trim();
    const telefono = document.getElementById('pacienteTelefono').value.trim();
    const obraSocial = document.getElementById('pacienteObraSocial').value.trim();
    const patologia = document.getElementById('pacientePatologia').value.trim();
    let pacientes = getPacientes();
    // Validar DNI único
    if (pacientes.some(p => p.dni === dni && p.id !== id)) {
        alert('Ya existe un paciente con ese DNI.');
        return;
    }
    const paciente = { id, nombre, dni, direccion, telefono, obraSocial, patologia, visitas: [], estudios: [] };
    const idx = pacientes.findIndex(p => p.id === id);
    if (idx >= 0) {
        pacientes[idx] = { ...pacientes[idx], ...paciente };
    } else {
        pacientes.push(paciente);
    }
    setPacientes(pacientes);
    cerrarModalPaciente();
    cargarPacientes();
};

window.editarPaciente = function(e, id) {
    e.stopPropagation();
    const pacientes = getPacientes();
    const p = pacientes.find(p => p.id === id);
    if (!p) return;
    document.getElementById('pacienteId').value = p.id;
    document.getElementById('pacienteNombre').value = p.nombre;
    document.getElementById('pacienteDNI').value = p.dni;
    document.getElementById('pacienteDireccion').value = p.direccion;
    document.getElementById('pacienteTelefono').value = p.telefono;
    document.getElementById('pacienteObraSocial').value = p.obraSocial;
    document.getElementById('pacientePatologia').value = p.patologia;
    document.getElementById('tituloModalPaciente').textContent = 'Editar Paciente';
    document.getElementById('modalPaciente').style.display = 'block';
};

window.eliminarPaciente = function(e, id) {
    e.stopPropagation();
    if (!confirm('¿Seguro que deseas eliminar este paciente?')) return;
    let pacientes = getPacientes();
    pacientes = pacientes.filter(p => p.id !== id);
    setPacientes(pacientes);
    cargarPacientes();
};

window.verFichaPaciente = function(id) {
    const pacientes = getPacientes();
    const p = pacientes.find(p => p.id === id);
    if (!p) return;
    document.querySelector('.pacientes-section').style.display = 'none';
    document.getElementById('fichaPaciente').style.display = 'block';
    document.getElementById('nombreFichaPaciente').textContent = p.nombre;
    document.getElementById('datosPaciente').innerHTML = `
        <b>DNI:</b> ${p.dni}<br>
        <b>Dirección:</b> ${p.direccion}<br>
        <b>Teléfono:</b> ${p.telefono}<br>
        <b>Obra social:</b> ${p.obraSocial}<br>
        <b>Patología:</b> ${p.patologia}
    `;
    mostrarEstudios(p);
    mostrarVisitas(p);
};

// --- ESTUDIOS ---
function mostrarEstudios(paciente) {
    const lista = document.getElementById('listaEstudios');
    if (!paciente.estudios) paciente.estudios = [];
    lista.innerHTML = paciente.estudios.length === 0 ? '<div class="no-info">Sin estudios cargados.</div>' :
        paciente.estudios.map((e, i) => `
            <div style='margin-bottom:8px;'>
                <b>${e.nombre}</b> <a href="${e.url}" target="_blank">Descargar/Ver</a>
                <button onclick="eliminarEstudio('${paciente.id}',${i})">🗑️</button>
            </div>
        `).join('');
    // Handler de subida
    document.getElementById('formEstudio').onsubmit = function(ev) {
        ev.preventDefault();
        const nombre = document.getElementById('nombreEstudio').value.trim();
        const archivo = document.getElementById('archivoEstudio').files[0];
        if (!nombre || !archivo) return alert('Completa nombre y archivo');
        const reader = new FileReader();
        reader.onload = function(e) {
            const url = e.target.result;
            paciente.estudios.push({ nombre, url });
            guardarPaciente(paciente);
            mostrarEstudios(paciente);
            document.getElementById('formEstudio').reset();
        };
        reader.readAsDataURL(archivo);
    };
}

window.eliminarEstudio = function(pacienteId, idx) {
    const pacientes = getPacientes();
    const p = pacientes.find(p => p.id === pacienteId);
    if (!p) return;
    p.estudios.splice(idx, 1);
    setPacientes(pacientes);
    mostrarEstudios(p);
};

function guardarPaciente(paciente) {
    let pacientes = getPacientes();
    const idx = pacientes.findIndex(p => p.id === paciente.id);
    if (idx >= 0) {
        pacientes[idx] = paciente;
    } else {
        pacientes.push(paciente);
    }
    setPacientes(pacientes);
}

// --- VISITAS ---
function mostrarVisitas(paciente) {
    const div = document.getElementById('historialVisitas');
    if (!paciente.visitas) paciente.visitas = [];
    div.innerHTML = paciente.visitas.length === 0 ? '<div class="no-info">Sin visitas registradas.</div>' :
        paciente.visitas.map((v, i) => `
            <div class='entry' style='margin-bottom:10px;'>
                <b>${v.fecha}</b> - <b>${v.tipo}</b> - <span>${v.estado}</span><br>
                <b>Observaciones:</b> ${v.observaciones}<br>
                <b>Problemas:</b> ${v.problemas}<br>
                <b>Tratamiento:</b> ${v.tratamiento}<br>
                <button onclick="editarVisita('${paciente.id}',${i})">✏️</button>
                <button onclick="eliminarVisita('${paciente.id}',${i})">🗑️</button>
            </div>
        `).join('');
    mostrarEstadisticasVisitas(paciente);
    // Handler de nueva visita
    document.getElementById('formVisita').onsubmit = function(ev) {
        ev.preventDefault();
        const idVisita = document.getElementById('visitaId').value;
        const fecha = document.getElementById('visitaFecha').value;
        const tipo = document.getElementById('visitaTipo').value;
        const estado = document.getElementById('visitaEstado').value;
        const observaciones = document.getElementById('visitaObservaciones').value;
        const problemas = document.getElementById('visitaProblemas').value;
        const tratamiento = document.getElementById('visitaTratamiento').value;
        if (!fecha) return alert('La fecha es obligatoria');
        if (!tipo) return alert('Selecciona el tipo de visita');
        if (!estado) return alert('Selecciona el estado clínico');
        if (idVisita) {
            paciente.visitas[idVisita] = { fecha, tipo, estado, observaciones, problemas, tratamiento };
        } else {
            paciente.visitas.push({ fecha, tipo, estado, observaciones, problemas, tratamiento });
        }
        guardarPaciente(paciente);
        cerrarModalVisita();
        mostrarVisitas(paciente);
    };
}

window.mostrarFormularioVisita = function() {
    document.getElementById('formVisita').reset();
    document.getElementById('visitaId').value = '';
    document.getElementById('tituloModalVisita').textContent = 'Nueva Visita';
    document.getElementById('modalVisita').style.display = 'block';
};

window.cerrarModalVisita = function() {
    document.getElementById('modalVisita').style.display = 'none';
};

window.editarVisita = function(pacienteId, idx) {
    const pacientes = getPacientes();
    const p = pacientes.find(p => p.id === pacienteId);
    if (!p) return;
    const v = p.visitas[idx];
    document.getElementById('visitaId').value = idx;
    document.getElementById('visitaFecha').value = v.fecha;
    document.getElementById('visitaTipo').value = v.tipo;
    document.getElementById('visitaEstado').value = v.estado;
    document.getElementById('visitaObservaciones').value = v.observaciones;
    document.getElementById('visitaProblemas').value = v.problemas;
    document.getElementById('visitaTratamiento').value = v.tratamiento;
    document.getElementById('tituloModalVisita').textContent = 'Editar Visita';
    document.getElementById('modalVisita').style.display = 'block';
};

window.eliminarVisita = function(pacienteId, idx) {
    const pacientes = getPacientes();
    const p = pacientes.find(p => p.id === pacienteId);
    if (!p) return;
    if (!confirm('¿Seguro que deseas eliminar esta visita?')) return;
    p.visitas.splice(idx, 1);
    setPacientes(pacientes);
    mostrarVisitas(p);
};

// --- ESTADÍSTICAS DE VISITAS ---
function mostrarEstadisticasVisitas(paciente) {
    const div = document.getElementById('estadisticasVisitas');
    if (!paciente.visitas || paciente.visitas.length === 0) {
        div.innerHTML = '';
        return;
    }
    const visitas = paciente.visitas.slice().sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    const total = visitas.length;
    let promedio = '-';
    if (total > 1) {
        let sum = 0;
        for (let i = 1; i < visitas.length; i++) {
            const d1 = new Date(visitas[i - 1].fecha);
            const d2 = new Date(visitas[i].fecha);
            sum += (d2 - d1) / (1000 * 60 * 60 * 24);
        }
        promedio = (sum / (total - 1)).toFixed(1) + ' días';
    }
    const ultima = visitas[visitas.length - 1];
    const diasUltima = Math.floor((new Date() - new Date(ultima.fecha)) / (1000 * 60 * 60 * 24));
    div.innerHTML = `
        <b>Total de visitas:</b> ${total}<br>
        <b>Promedio entre visitas:</b> ${promedio}<br>
        <b>Última visita:</b> ${ultima.fecha} (${diasUltima} días atrás)
    `;
}

// --- EXPORTACIÓN ---
window.exportarHistoriaClinica = function(tipo) {
    const nombre = document.getElementById('nombreFichaPaciente').textContent;
    const pacientes = getPacientes();
    const p = pacientes.find(p => p.nombre === nombre);
    if (!p) return;
    if (tipo === 'json') {
        const data = JSON.stringify(p, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `historia_${p.nombre.replace(/\s+/g, '_')}.json`;
        a.click();
        URL.revokeObjectURL(url);
    } else if (tipo === 'pdf') {
        // Exportación simple a PDF usando window.print()
        const win = window.open('', '', 'width=800,height=600');
        win.document.write(`<h2>Historia Clínica de ${p.nombre}</h2>`);
        win.document.write(`<pre>${JSON.stringify(p, null, 2)}</pre>`);
        win.print();
        win.close();
    }
}; 