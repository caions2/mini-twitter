export default class UserModel {
  static saveUser(user) {
    localStorage.setItem('usuario', JSON.stringify(user));
  }

  static getUser() {
    return JSON.parse(localStorage.getItem('usuario'));
  }

  static validateLogin(email, senha) {
    const user = this.getUser();
    return user && user.email === email && user.senha === senha;
  }
}
