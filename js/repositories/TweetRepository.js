export default class TweetRepository {
  constructor() {
    this.key = 'miniTwitter_tweets';
    this.userKey = 'miniTwitter_loggedUser';
  }

  // Recupera todos os tweets salvos no localStorage
  getAll() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  // Recupera o email do usuário logado
  getLoggedEmail() {
    return localStorage.getItem(this.userKey);
  }

  // Salva um novo tweet
  save(texto) {
    const tweets = this.getAll();
    const email = this.getLoggedEmail();

    if (!email) return;

    const novoTweet = {
      texto,
      email,
      data: new Date().toISOString()
    };

    tweets.push(novoTweet);
    localStorage.setItem(this.key, JSON.stringify(tweets));
  }

  // Retorna apenas os tweets do usuário logado, ordenados do mais recente para o mais antigo
  getAllForLoggedUser() {
    const email = this.getLoggedEmail();
    return this.getAll()
      .filter(tweet => tweet.email === email)
      .sort((a, b) => new Date(b.data) - new Date(a.data));
  }
}
