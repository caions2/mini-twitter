export default class LoginView {
  constructor(container, app) {
    this.container = container;
    this.app = app;
    this.render();
  }

 render() {
    this.container.innerHTML = `
      <div class="login-container">
        <div class="login-header">
        <img src="assets/images/twitter-logo.png" alt="Twitter Logo" class="login-logo">
          <h1>Twitter</h1>
        </div>
        <form id="login-form">
          <input type="email" id="email" placeholder="Email" required />
          <input type="password" id="senha" placeholder="Senha" required />
          <button type="submit">Entrar</button>
        </form>
        <p>Não tem conta? <a href="#" id="cadastro-link">Cadastre-se</a></p>
      </div>
    `;

    // Listener para envio do formulário
     document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      this.app.login(email, senha);
    });

    // Link para página de cadastro
    document.getElementById('cadastro-link').addEventListener('click', (e) => {
      e.preventDefault();
      this.app.showCadastro();  
    });
  }
}

//- A classe LoginView é responsável por renderizar a interface de login    