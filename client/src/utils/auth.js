class Auth {
    constructor() {
        this.loggedIn = false;
    }

    async login() {
        this.loggedIn = true;
    }

    logout() {

    }

    isAuthenticated(){
        return this.loggedIn;
    }
}

export default new Auth()