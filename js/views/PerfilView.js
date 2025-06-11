export default class PerfilView {
  constructor(root, controller) {
    this.root = root;
    this.controller = controller;
    this.render();
  }

  render() {
    const user = JSON.parse(localStorage.getItem('loggedUser'));

    if (!user) {
      alert('Usuário não logado. Redirecionando para login...');
      this.controller.showLogin();
      return;
    }

    this.root.innerHTML = `
      <section class="perfil-view">
        <h2>Perfil do Usuário</h2>
        <form id="perfil-form">
          <label>
            Nome:
            <input type="text" id="perfil-nome" value="${user.nome}" required />
          </label>
          <label>
            Email:
            <input type="email" id="perfil-email" value="${user.email}" disabled />
          </label>
          <button type="submit">Salvar alterações</button>
        </form>

        <h3>Meus Tweets</h3>
        <ul id="meus-tweets"></ul>

        <button id="voltar-btn">Voltar</button>
      </section>
    `;

    this.renderMeusTweets(user.email);
    this.addEventListeners();
  }

  renderMeusTweets(email) {
    const meusTweetsList = document.getElementById('meus-tweets');
    meusTweetsList.innerHTML = '';

    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    const meusTweets = tweets.filter(tweet => tweet.email === email).reverse();

    meusTweets.forEach(tweet => {
      const li = document.createElement('li');
      li.className = 'tweet-card';
      li.innerHTML = `
        <div class="tweet-header">
          <strong>${tweet.email}</strong>
          <span class="tweet-date">${tweet.data}</span>
        </div>
        <p class="tweet-content">${tweet.conteudo}</p>
        <div class="tweet-footer">
          ❤️ ${tweet.curtidas || 0}
        </div>
      `;
      meusTweetsList.appendChild(li);
    });
  }

  addEventListeners() {
    document.getElementById('voltar-btn').addEventListener('click', () => {
      this.controller.showTwitter();
    });

    document.getElementById('perfil-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const novoNome = document.getElementById('perfil-nome').value.trim();
      const user = JSON.parse(localStorage.getItem('loggedUser'));

      if (!novoNome) return;

      // Atualiza no loggedUser
      user.nome = novoNome;
      localStorage.setItem('loggedUser', JSON.stringify(user));

      // Atualiza no array de usuários
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const index = users.findIndex(u => u.email === user.email);
      if (index !== -1) {
        users[index].nome = novoNome;
        localStorage.setItem('users', JSON.stringify(users));
      }

      alert('Perfil atualizado com sucesso!');
    });
  }
}
