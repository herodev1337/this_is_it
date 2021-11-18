import React, { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

const axios = require('axios').default;
const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
  withCredentials: true,
});

//* Method Hook
function useProvideAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const login = (username, password, cb) => {
    api
      .post('./login', { username: username, password: password }) // TODO: "remember me"
      .then((response) => {
        console.log(response.data.data.message);
        setIsAuthenticated(true);
        cb()
      })
      .catch(function (error) {
        // TODO: Error handling
        console.log(error.response);
      });
  };

  // TODO
  const logout = (username, cb) => {
    setIsAuthenticated(false);
    cb();
  };

  const authenticate = () => {
    return isAuthenticated;
  };

  return {
    login,
    logout,
    authenticate
  }
}

//* Authentication Wrapper
export function AuthWrapper( { children } ) {
  const auth = useProvideAuth();
  return (<AuthContext.Provider value={auth}>{children}</AuthContext.Provider>)
}

//* Api Hook
export const useAuth = () => {
  return useContext(AuthContext);
}