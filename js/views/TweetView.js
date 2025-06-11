export default class TweetView {
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
      <section class="tweet-view">
        <header class="tweet-header">
          <div class="top-bar">
            <img src="assets/images/twitter-logo.png" alt="Twitter Logo">
          </div>
          <h1>Bem-vindo, ${user.nome}!</h1>
          <div>
            <button id="perfil-btn">Perfil</button>
            <button id="logout-btn">Sair</button>
          </div>
        </header>
        <form id="tweet-form">
          <textarea id="tweet-content" maxlength="280" placeholder="O que está acontecendo?" required></textarea>
          <button type="submit">Tweetar</button>
        </form>
        <ul id="tweet-list"></ul>
      </section>
    `;

    this.renderTweets();
    this.addEventListeners();
  }

  renderTweets() {
    const tweetList = document.getElementById('tweet-list');
    tweetList.innerHTML = '';

    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const allTweets = JSON.parse(localStorage.getItem('tweets')) || [];
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    const reversedTweets = [...allTweets].reverse();

    reversedTweets.forEach((tweet, index) => {
      const userInfo = allUsers.find(u => u.email === tweet.email);
      const nome = userInfo && userInfo.nome ? userInfo.nome : tweet.email;

      tweet.curtidas = tweet.curtidas || 0;
      tweet.curtidoPor = tweet.curtidoPor || [];

      const tweetIndex = allTweets.indexOf(tweet);
      const jaCurtiu = tweet.curtidoPor.includes(user.email);

      const li = document.createElement('li');
      li.className = 'tweet-card';
      li.innerHTML = `
        <div class="tweet-header">
          <strong>${nome}</strong>
          <span class="tweet-date">${tweet.data}</span>
        </div>
        <p class="tweet-content">${tweet.conteudo}</p>
        <div class="tweet-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
          <div>
            <button class="like-btn" data-index="${tweetIndex}">
              ❤️ ${tweet.curtidas}
            </button>
          </div>
          ${tweet.email === user.email ? `
            <button class="delete-btn" data-index="${tweetIndex}" style="background: none; border: none; font-size: 16px; cursor: pointer;">🗑️</button>
          ` : ''}
        </div>
      `;

      tweetList.appendChild(li);
    });

    // Curtir / Descurtir
    document.querySelectorAll('.like-btn').forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.dataset.index);
        const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        const tweet = tweets[index];
        const user = JSON.parse(localStorage.getItem('loggedUser'));

        tweet.curtidoPor = tweet.curtidoPor || [];

        const userIndex = tweet.curtidoPor.indexOf(user.email);
        if (userIndex === -1) {
          tweet.curtidoPor.push(user.email);
          tweet.curtidas++;
        } else {
          tweet.curtidoPor.splice(userIndex, 1);
          tweet.curtidas = Math.max(0, tweet.curtidas - 1);
        }

        localStorage.setItem('tweets', JSON.stringify(tweets));
        this.renderTweets();
      });
    });

    // Excluir tweet
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        tweets.splice(index, 1);
        localStorage.setItem('tweets', JSON.stringify(tweets));
        this.renderTweets();
      });
    });
  }

  addEventListeners() {
    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('loggedUser');
      this.controller.showLogin();
    });

    document.getElementById('perfil-btn').addEventListener('click', () => {
      this.controller.showPerfil();
    });

    document.getElementById('tweet-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const user = JSON.parse(localStorage.getItem('loggedUser'));
      const conteudo = document.getElementById('tweet-content').value.trim();

      if (!conteudo) return;

      const novoTweet = {
        email: user.email,
        conteudo,
        data: new Date().toLocaleString('pt-BR'),
        curtidas: 0,
        curtidoPor: []
      };

      const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
      tweets.push(novoTweet);
      localStorage.setItem('tweets', JSON.stringify(tweets));

      document.getElementById('tweet-content').value = '';
      this.renderTweets();
    });
  }
}
