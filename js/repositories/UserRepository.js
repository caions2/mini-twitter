export default class UserRepository {
  constructor() {
    this.key = 'miniTwitter_users';
    this.loggedKey = 'loggedUser';
  }

  // Salva novo usuário
  save(user) {
    const users = this.getAll();
    users.push(user);
    localStorage.setItem(this.key, JSON.stringify(users));
  }

  // Verifica se email já está cadastrado
  exists(email) {
    return this.getAll().some(user => user.email === email);
  }

  // Retorna todos os usuários
  getAll() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  // Valida login
  validate(email, senha) {
    return this.getAll().some(user => user.email === email && user.senha === senha);
  }

  // Define o usuário logado
  setLoggedUser(email) {
    const user = this.getAll().find(u => u.email === email);
    if (user) {
      localStorage.setItem(this.loggedKey, JSON.stringify(user));
    }
  }

  // Retorna o usuário logado (completo)
  getLoggedUser() {
    const userJson = localStorage.getItem(this.loggedKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Remove o usuário logado
  logout() {
    localStorage.removeItem(this.loggedKey);
  }

  // Atualiza dados do usuário logado
  updateLoggedUser(nome, email) {
    const users = this.getAll();
    const current = this.getLoggedUser();
    const index = users.findIndex(u => u.email === current.email);
    if (index !== -1) {
      users[index] = { ...users[index], nome, email };
      localStorage.setItem(this.key, JSON.stringify(users));
      localStorage.setItem(this.loggedKey, JSON.stringify(users[index]));
    }
  }
}
