import LoginView from '../views/LoginView.js';
import CadastroView from '../views/CadastroView.js';
import TweetView from '../views/TweetView.js';
import PerfilView from '../views/PerfilView.js';
import UserRepository from '../repositories/UserRepository.js';
import TweetRepository from '../repositories/TweetRepository.js';

export default class AppController {
  constructor() {
    this.root = document.getElementById('app');
    this.userRepo = new UserRepository();
    this.tweetRepo = new TweetRepository();
  }

  init() {
    const user = this.userRepo.getLoggedUser();
    if (user) {
      this.showTwitter();
    } else {
      this.showLogin();
    }
  }

  showLogin() {
    new LoginView(this.root, this);
  }

  showCadastro() {
    new CadastroView(this.root, this);
  }

  showTwitter() {
    new TweetView(this.root, this);
  }

  showPerfil() {
    new PerfilView(this.root, this);
  }

  cadastrar(nome, email, senha) {
    if (!nome || !email || !senha) return alert('Preencha todos os campos.');
    if (this.userRepo.exists(email)) return alert('Email já cadastrado.');
    this.userRepo.save({ nome, email, senha });
    alert('Cadastro realizado!');
    this.showLogin();
  }

  login(email, senha) {
    if (this.userRepo.validate(email, senha)) {
      this.userRepo.setLoggedUser(email);
      this.showTwitter();
    } else {
      alert('Email ou senha inválidos');
    }
  }

  logout() {
    this.userRepo.logout();
    this.showLogin();
  }

  tweetar(texto) {
    if (!texto) return alert('Digite algo.');
    this.tweetRepo.save(texto);
    this.showTwitter();
  }

  getTweets() {
    return this.tweetRepo.getAllForLoggedUser();
  }

  getLoggedUser() {
    return this.userRepo.getLoggedUser();
  }

  updateProfile(nome, email) {
    this.userRepo.updateLoggedUser(nome, email);
    alert('Perfil atualizado!');
    this.showPerfil();
  }
}



