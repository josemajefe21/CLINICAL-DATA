class Auth {
  constructor() {
    this.currentUser = null;
    // Usuario médico fijo
    this.medico = {
      username: 'medico',
      password: '1234', // Puedes cambiar la contraseña aquí
      nombre: 'Médico',
      email: 'medico@clinicadata.com'
    };
  }

  async login(username, password) {
    if (username !== this.medico.username || password !== this.medico.password) {
      throw new Error('Usuario o contraseña incorrectos');
    }
    this.currentUser = this.medico;
    localStorage.setItem('currentUser', JSON.stringify(this.medico));
    return this.medico;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    return this.currentUser;
  }
}

export const auth = new Auth(); 