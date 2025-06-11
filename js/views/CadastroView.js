export default class CadastroView {
  constructor(container, app) {
    this.container = container;
    this.app = app;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <section class="cadastro-container">
        <h2>Cadastre-se no Mini Twitter</h2>
        <form id="cadastroForm">
          <input type="text" id="nome" placeholder="Nome de usuário" required>
          <input type="email" id="email" placeholder="Email" required>
          <input type="password" id="senha" placeholder="Senha" required>
          <button type="submit">Cadastrar</button>
        </form>
        <p>Já tem conta? <a href="#" id="goToLogin">Entrar</a></p>
      </section>
    `;

    // Listener para envio do formulário de cadastro
    document.getElementById('cadastroForm').addEventListener('submit', e => {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      this.app.cadastrar(nome, email, senha);
    });

    // Link para retornar ao login
    document.getElementById('goToLogin').addEventListener('click', e => {
      e.preventDefault();
      this.app.showLogin();
    });
  }
}

/* Comentários importantes:
- A classe CadastroView monta a interface de cadastro com campos obrigatórios.
- Os dados do formulário são enviados ao AppController para validação e criação do usuário.
- O padrão MVC é respeitado, com separação da lógica e da visualização.
*/
