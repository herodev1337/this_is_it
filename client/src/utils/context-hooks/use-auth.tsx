import * as React from 'react';
import { useState, useContext, createContext } from 'react';
import jwt_decode from "jwt-decode";

import {useApi} from './use-api'

interface AuthContextInterface{
  login: Function;
  logout: Function;
  authenticate: Function;
}

interface UserInterface{
  username: string,
  userId: string,
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextInterface | null>(null);

//* Method Hook
function useProvideAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [user, setUser] = useState<UserInterface>({
    username: '',
    userId: '',
    isAuthenticated: false
  })
  const api = useApi();

  const login = (username: String, password: String, cb: Function) => {
    api
      .post('./auth/sessions', { username: username, password: password }) // TODO: "remember me"
      .then((response: any) => {
        api.defaults.headers.common['x-refresh'] = response.data.refreshToken;
        api.defaults.headers.common['Authorization'] = response.data.accessToken;
        const token: any = jwt_decode(response.data.refreshToken)
        console.log("🚀 ~ file: use-auth.tsx ~ line 38 ~ .then ~ token", token)
        setUser({
          username: token.username,
          userId: token._id,
          isAuthenticated: true
        });
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
    user,
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