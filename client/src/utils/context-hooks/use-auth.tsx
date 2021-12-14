import * as React from 'react';
import { useState, useContext, createContext } from 'react';
import {Response, Request} from 'express';

import {useApi} from './use-api'

interface AuthContextInterface{
  login: Function;
  logout: Function;
  authenticate: Function;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

//* Method Hook
function useProvideAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const api = useApi();

  const login = (username: String, password: String, cb: Function) => {
    api
      .post('./auth/sessions', { username: username, password: password }) // TODO: "remember me"
      .then((response: any) => {
        api.defaults.headers.common['x-refresh'] = response.data.refreshToken;
        api.defaults.headers.common['Authorization'] = response.data.accessToken;
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