// Archivos cargados directamente en index.html - no necesitamos imports aquí
// Los objetos window.auth, window.db están disponibles globalmente

// Mostrar/ocultar elementos
function toggleElement(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = show ? 'block' : 'none';
    }
}

// Inicialización de la app
window.addEventListener('DOMContentLoaded', () => {
    // Usar onAuthStateChanged en lugar de getCurrentUser
    window.auth.onAuthStateChanged(user => {
        if (user) {
            mostrarApp();
        } else {
            mostrarLogin();
        }
    });
});

// Login handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.onsubmit = async (e) => {
            e.preventDefault();
            const userInput = document.getElementById('loginEmail');
            const passInput = document.getElementById('loginPassword');
            if (!userInput || !passInput) {
                // Salir silenciosamente si no encontramos los elementos
                return;
            }
            const username = userInput.value.trim();
            const password = passInput.value;
            const errorDiv = document.getElementById('loginError');
            if (errorDiv) errorDiv.style.display = 'none';
            try {
                await window.auth.login(username, password);
                mostrarApp();
            } catch (err) {
                if (errorDiv) {
                    errorDiv.textContent = err.message;
                    errorDiv.style.display = 'block';
                }
            }
        };
}

// Logout handler
window.logout = () => {
    window.auth.signOut().then(() => {
        mostrarLogin();
    }).catch((error) => {
        console.error('Error al cerrar sesión:', error);
    });
};

// Función para mostrar el formulario de registro
window.showRegister = () => {
    toggleElement('loginCard', false);
    toggleElement('registerCard', true);
};

// Función para mostrar el formulario de login
window.showLogin = () => {
    toggleElement('loginCard', true);
    toggleElement('registerCard', false);
};

function mostrarApp() {
    // Ocultar formularios de login/registro
    toggleElement('loginCard', false);
    toggleElement('registerCard', false);
    
    // Mostrar información del usuario y contenido principal
    toggleElement('authContainer', true);
    toggleElement('userInfo', true);
    toggleElement('fichaPaciente', false);
    const mainContent = document.getElementById('mainContent');
    if (mainContent) mainContent.style.display = 'block';
    
    // Actualizar información del usuario
    updateUserInfo();
    
    // Cargar pacientes si la función existe
    if (typeof cargarPacientes === 'function') {
        cargarPacientes();
    }
}

function updateUserInfo() {
    const user = window.auth.currentUser;
    if (user) {
        const userNameEl = document.getElementById('userName');
        const userEmailEl = document.getElementById('userEmail');
        
        if (userNameEl) userNameEl.textContent = user.displayName || 'Usuario';
        if (userEmailEl) userEmailEl.textContent = user.email || '';
    }
}

function mostrarLogin() {
    // Ocultar contenido de la aplicación y información del usuario
    toggleElement('authContainer', false);
    toggleElement('userInfo', false);
    const mainContent = document.getElementById('mainContent');
    if (mainContent) mainContent.style.display = 'none';
    toggleElement('fichaPaciente', false);
    
    // Mostrar formulario de login
    toggleElement('loginCard', true);
    toggleElement('registerCard', false);
}

// CRUD de pacientes (estructura básica, se completará en el siguiente paso)
window.mostrarFormularioPaciente = function() {
    const el = document.getElementById('formPaciente');
    if (el) { el.reset(); }
    document.getElementById('pacienteId').value = '';
    document.getElementById('tituloModalPaciente').textContent = 'Nuevo Paciente';
    document.getElementById('modalPaciente').style.display = 'block';
};

window.cerrarModalPaciente = function() {
    const el = document.getElementById('modalPaciente');
    if (el) { el.style.display = 'none'; }
};

window.volverAListaPacientes = function() {
    const el = document.getElementById('fichaPaciente');
    if (el) { el.style.display = 'none'; }
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
        await window.auth.login(email, password);
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
        await window.auth.register(email, password);
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
        await window.auth.logout();
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

// Función para guardar paciente (se llama desde createNewPaciente en index.html)
function savePacienteForm(e) {
    if (e) e.preventDefault();
    const id = document.getElementById('pacienteId')?.value || Date.now().toString();
    const nombre = document.getElementById('pacienteNombre')?.value?.trim();
    const dni = document.getElementById('pacienteDNI')?.value?.trim();
    const direccion = document.getElementById('pacienteDireccion')?.value?.trim();
    const telefono = document.getElementById('pacienteTelefono')?.value?.trim();
    const obraSocial = document.getElementById('pacienteObraSocial')?.value?.trim();
    const patologia = document.getElementById('pacientePatologia')?.value?.trim();
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
    const el = document.getElementById('pacienteId');
    if (el) { el.value = p.id; }
    const elNombre = document.getElementById('pacienteNombre');
    if (elNombre) { elNombre.value = p.nombre; }
    const elDNI = document.getElementById('pacienteDNI');
    if (elDNI) { elDNI.value = p.dni; }
    const elDireccion = document.getElementById('pacienteDireccion');
    if (elDireccion) { elDireccion.value = p.direccion; }
    const elTelefono = document.getElementById('pacienteTelefono');
    if (elTelefono) { elTelefono.value = p.telefono; }
    const elObraSocial = document.getElementById('pacienteObraSocial');
    if (elObraSocial) { elObraSocial.value = p.obraSocial; }
    const elPatologia = document.getElementById('pacientePatologia');
    if (elPatologia) { elPatologia.value = p.patologia; }
    const elTitulo = document.getElementById('tituloModalPaciente');
    if (elTitulo) { elTitulo.textContent = 'Editar Paciente'; }
    const elModal = document.getElementById('modalPaciente');
    if (elModal) { elModal.style.display = 'block'; }
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
    const el = document.getElementById('fichaPaciente');
    if (el) { el.style.display = 'block'; }
    const elNombre = document.getElementById('nombreFichaPaciente');
    if (elNombre) { elNombre.textContent = p.nombre; elNombre.dataset.id = p.id; }
    const elDatos = document.getElementById('datosPaciente');
    if (elDatos) {
        elDatos.innerHTML = `
            <b>DNI:</b> ${p.dni}<br>
            <b>Dirección:</b> ${p.direccion}<br>
            <b>Teléfono:</b> ${p.telefono}<br>
            <b>Obra social:</b> ${p.obraSocial}<br>
            <b>Patología:</b> ${p.patologia}
        `;
    }
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
    const el = document.getElementById('formEstudio');
    if (el) {
        el.onsubmit = function(ev) {
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
                const elReset = document.getElementById('formEstudio');
                if (elReset) { elReset.reset(); }
            };
            reader.readAsDataURL(archivo);
        };
    }
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
    const el = document.getElementById('formVisita');
    if (el) {
        el.onsubmit = function(ev) {
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
}

window.mostrarFormularioVisita = function() {
    const el = document.getElementById('formVisita');
    if (el) { el.reset(); }
    document.getElementById('visitaId').value = '';
    const elTitulo = document.getElementById('tituloModalVisita');
    if (elTitulo) { elTitulo.textContent = 'Nueva Visita'; }
    const elModal = document.getElementById('modalVisita');
    if (elModal) { elModal.style.display = 'block'; }
};

window.cerrarModalVisita = function() {
    const el = document.getElementById('modalVisita');
    if (el) { el.style.display = 'none'; }
};

window.editarVisita = function(pacienteId, idx) {
    const pacientes = getPacientes();
    const p = pacientes.find(p => p.id === pacienteId);
    if (!p) return;
    const v = p.visitas[idx];
    const el = document.getElementById('visitaId');
    if (el) { el.value = idx; }
    const elFecha = document.getElementById('visitaFecha');
    if (elFecha) { elFecha.value = v.fecha; }
    const elTipo = document.getElementById('visitaTipo');
    if (elTipo) { elTipo.value = v.tipo; }
    const elEstado = document.getElementById('visitaEstado');
    if (elEstado) { elEstado.value = v.estado; }
    const elObservaciones = document.getElementById('visitaObservaciones');
    if (elObservaciones) { elObservaciones.value = v.observaciones; }
    const elProblemas = document.getElementById('visitaProblemas');
    if (elProblemas) { elProblemas.value = v.problemas; }
    const elTratamiento = document.getElementById('visitaTratamiento');
    if (elTratamiento) { elTratamiento.value = v.tratamiento; }
    const elTitulo = document.getElementById('tituloModalVisita');
    if (elTitulo) { elTitulo.textContent = 'Editar Visita'; }
    const elModal = document.getElementById('modalVisita');
    if (elModal) { elModal.style.display = 'block'; }
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
    const el = document.getElementById('estadisticasVisitas');
    if (el) {
        el.innerHTML = `
            <b>Total de visitas:</b> ${total}<br>
            <b>Promedio entre visitas:</b> ${promedio}<br>
            <b>Última visita:</b> ${ultima.fecha} (${diasUltima} días atrás)
        `;
    }
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

// --- AUTENTICACIÓN Y REGISTRO CON FIREBASE ---
function showRegister() {
    const el = document.getElementById('loginCard');
    if (el) { el.style.display = 'none'; }
    const elRegister = document.getElementById('registerCard');
    if (elRegister) { elRegister.style.display = 'block'; }
}

function showLogin() {
    const el = document.getElementById('registerCard');
    if (el) { el.style.display = 'none'; }
    const elLogin = document.getElementById('loginCard');
    if (elLogin) { elLogin.style.display = 'block'; }
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.onsubmit = async function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const errorDiv = document.getElementById('registerError');
    errorDiv.style.display = 'none';
    try {
        await window.auth.createUserWithEmailAndPassword(email, password);
        await window.auth.currentUser.updateProfile({ displayName: name });
        showLogin();
    } catch (err) {
        errorDiv.textContent = err.message;
        errorDiv.style.display = 'block';
    }
    };
}

// Manejador de login movido al inicio del archivo para evitar conflictos

window.auth.onAuthStateChanged(user => {
    if (user) {
        document.querySelector('.container').style.display = 'none';
        // Aquí puedes mostrar la app principal y cargar pacientes del usuario
        cargarPacientesFirestore();
    } else {
        document.querySelector('.container').style.display = 'block';
    }
});

// --- PACIENTES Y VISITAS EN FIRESTORE ---
async function cargarPacientesFirestore() {
    const user = window.auth.currentUser;
    if (!user) return;
    const pacientesRef = db.collection('usuarios').doc(user.uid).collection('pacientes');
    const snapshot = await pacientesRef.get();
    const lista = document.getElementById('listaPacientes');
    if (!lista) return;
    lista.innerHTML = '';
    snapshot.forEach(doc => {
        const p = doc.data();
        const div = document.createElement('div');
        div.className = 'paciente-card';
        div.innerHTML = `<b>${p.nombre}</b><br>DNI: ${p.dni}<br><span style='font-size:0.95em;'>${p.patologia || ''}</span>`;
        div.onclick = () => verFichaPacienteFirestore(doc.id);
        lista.appendChild(div);
    });
}

window.verFichaPacienteFirestore = async function(id) {
    const user = window.auth.currentUser;
    if (!user) return;
    const doc = await db.collection('usuarios').doc(user.uid).collection('pacientes').doc(id).get();
    if (!doc.exists) return;
    const p = doc.data();
    document.querySelector('.pacientes-section').style.display = 'none';
    document.getElementById('fichaPaciente').style.display = 'block';
    const nombreEl = document.getElementById('nombreFichaPaciente');
    if (nombreEl) {
        nombreEl.textContent = p.nombre;
        nombreEl.dataset.id = p.id;
    }
    document.getElementById('datosPaciente').innerHTML = `
        <b>DNI:</b> ${p.dni}<br>
        <b>Dirección:</b> ${p.direccion}<br>
        <b>Teléfono:</b> ${p.telefono}<br>
        <b>Obra social:</b> ${p.obraSocial}<br>
        <b>Patología:</b> ${p.patologia}
    `;
    mostrarVisitasFirestore(p.id);
};

async function mostrarVisitasFirestore(pacienteId) {
    const user = window.auth.currentUser;
    if (!user) return;
    const visitasRef = db.collection('usuarios').doc(user.uid).collection('pacientes').doc(pacienteId).collection('visitas');
    const snapshot = await visitasRef.orderBy('fecha').get();
    const div = document.getElementById('historialVisitas');
    const nombreEl = document.getElementById('nombreFichaPaciente');
    if (nombreEl) nombreEl.dataset.id = pacienteId;
    div.innerHTML = '';
    if (snapshot.empty) {
        div.innerHTML = '<div class="no-info">Sin visitas registradas.</div>';
        return;
    }
    snapshot.forEach((doc) => {
        const v = doc.data();
        const entry = document.createElement('div');
        entry.className = 'entry';
        entry.innerHTML = `<b>${v.fecha}</b> - <b>${v.tipo}</b> - <span>${v.estado}</span><br>
            <b>Observaciones:</b> ${v.observaciones}<br>
            <b>Problemas:</b> ${v.problemas}<br>
            <b>Tratamiento:</b> ${v.tratamiento}<br>
            <button onclick=\"editarVisitaFirestore('${pacienteId}','${doc.id}')\">✏️</button>
            <button onclick=\"eliminarVisitaFirestore('${pacienteId}','${doc.id}')\">🗑️</button>`;
        div.appendChild(entry);
    });
}

document.getElementById('formVisita').onsubmit = async function(e) {
    e.preventDefault();
    const user = window.auth.currentUser;
    if (!user) return;
    const pacienteId = document.getElementById('nombreFichaPaciente').dataset.id;
    if (!pacienteId) {
        alert('No se pudo identificar el paciente. Vuelve a abrir la ficha e inténtalo de nuevo.');
        return;
    }
    const idVisita = document.getElementById('visitaId').value;
    const fecha = document.getElementById('visitaFecha').value;
    const tipo = document.getElementById('visitaTipo').value;
    const estado = document.getElementById('visitaEstado').value;
    const observaciones = document.getElementById('visitaObservaciones').value;
    const problemas = document.getElementById('visitaProblemas').value;
    const tratamiento = document.getElementById('visitaTratamiento').value;
    const visitasRef = db.collection('usuarios').doc(user.uid).collection('pacientes').doc(pacienteId).collection('visitas');
    if (idVisita) {
        await visitasRef.doc(idVisita).set({ fecha, tipo, estado, observaciones, problemas, tratamiento });
    } else {
        const newDoc = await visitasRef.add({ fecha, tipo, estado, observaciones, problemas, tratamiento });
        document.getElementById('visitaId').value = newDoc.id;
    }
    cerrarModalVisita();
    await mostrarVisitasFirestore(pacienteId);
};

window.editarVisitaFirestore = async function(pacienteId, visitaId) {
    const user = window.auth.currentUser;
    if (!user) return;
    const doc = await db.collection('usuarios').doc(user.uid).collection('pacientes').doc(pacienteId).collection('visitas').doc(visitaId).get();
    if (!doc.exists) return;
    const v = doc.data();
    document.getElementById('visitaId').value = visitaId;
    document.getElementById('visitaFecha').value = v.fecha;
    document.getElementById('visitaTipo').value = v.tipo;
    document.getElementById('visitaEstado').value = v.estado;
    document.getElementById('visitaObservaciones').value = v.observaciones;
    document.getElementById('visitaProblemas').value = v.problemas;
    document.getElementById('visitaTratamiento').value = v.tratamiento;
    document.getElementById('tituloModalVisita').textContent = 'Editar Visita';
    document.getElementById('modalVisita').style.display = 'block';
};

window.eliminarVisitaFirestore = async function(pacienteId, visitaId) {
    const user = window.auth.currentUser;
    if (!user) return;
    await db.collection('usuarios').doc(user.uid).collection('pacientes').doc(pacienteId).collection('visitas').doc(visitaId).delete();
    mostrarVisitasFirestore(pacienteId);
}; 