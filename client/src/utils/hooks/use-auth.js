import React, { useState, useEffect, useContext, createContext } from 'react';

const authContext = createContext();

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
        setIsAuthenticated(true); // TODO: doesnt currently work
        cb();
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
  const auth = useAuth();
  return (<authContext.Provider value={auth}>{children}</authContext.Provider>)
}

export const useAuth = () => {
  return useContext(authContext);
}