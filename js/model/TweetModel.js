export default class TweetModel {
  static getTweets() {
    return JSON.parse(localStorage.getItem('tweets') || '[]');
  }

  static addTweet(texto) {
    const tweets = this.getTweets();
    tweets.unshift(texto);
    localStorage.setItem('tweets', JSON.stringify(tweets));
  }
}
