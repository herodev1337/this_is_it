import * as React from 'react';
import { useState, useContext, createContext } from 'react';
import {Response, Request} from 'express';

interface AuthContextInterface{
  login: Function;
  logout: Function;
  authenticate: Function;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

const axios = require('axios').default;
const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
  withCredentials: true,
});

//* Method Hook
function useProvideAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const login = (username: String, password: String, cb: Function) => {
    api
      .post('./login', { username: username, password: password }) // TODO: "remember me"
      .then((response: any) => {
        console.log(response.data.data.message);
        setIsAuthenticated(true);
        cb()
      })
      .catch(function (error: any) {
        // TODO: Error handling
        console.log(error.response);
      });
  };

  // TODO
  const logout = (username: String, cb: Function) => {
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
export function AuthWrapper( { children }: {children: React.ReactElement} ) {
  const auth = useProvideAuth();
  return (<AuthContext.Provider value={auth}>{children}</AuthContext.Provider>)
}

//* Api Hook
export const useAuth = () => {
  return useContext(AuthContext);
}