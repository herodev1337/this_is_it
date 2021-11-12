const axios = require('axios').default;

class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.api = axios.create({
      baseURL: 'http://localhost:3000/auth/',
      timeout: 1000,
    });
  }

  login(username, password, cb) {
    this.api
    .post('./login', {username: username, password: password}) // TODO: "remember me"
    .then(response => {
      console.log(response.data.data.message);
      this.isAuthenticated = true;
      cb()
    })
    .catch(function(error) { // TODO: Error handling
      console.log(error.response);
    });
  }

  // TODO
  logout(username, cb) {
      this.isAuthenticated = false;
      cb()
  }

  isAuthenticated() {
      return this.isAuthenticated;
  }
}

export default new Auth();