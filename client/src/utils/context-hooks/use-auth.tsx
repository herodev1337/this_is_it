import * as React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import jwt_decode from 'jwt-decode';

import { useApi } from './use-api';

interface AuthContextInterface {
  session: SessionInterface;
  login: Function;
  logout: Function;
  checkLocalSession: Function;
}

interface SessionInterface {
  createdAt: Date | string;
  exp: number;
  iat: number;
  session: string;
  updatedAt: Date | string;
  username: string;
  __v: number;
  _id: string;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

//* Method Hook
function useProvideAuth() {
  const [session, setSession] = useState<SessionInterface>(
    JSON.parse(localStorage.getItem('sessionData')) || {
      createdAt: null,
      exp: null,
      iat: null,
      session: 'null',
      updatedAt: null,
      username: null,
      __v: null,
      _id: null,
    }
  );
  const api = useApi();

  useEffect(() => {
    function checkSessionData() {
      const item = localStorage.getItem('sessionData');
      if (item) {
        setSession(JSON.parse(item));
      } else {
        setSession({
          createdAt: null,
          exp: null,
          iat: null,
          session: 'null',
          updatedAt: null,
          username: null,
          __v: null,
          _id: null,
        });
      }
    }
    window.addEventListener('storage', checkSessionData);
    return () => {
      window.removeEventListener('storage', checkSessionData);
    };
  }, []);

  const login = (username: String, password: String, cb: Function) => {
    api
      .post('./auth/sessions', { username: username, password: password }) // TODO: "remember me"
      .then((response: any) => {
        api.defaults.headers.common['x-refresh'] = response.data.refreshToken;
        api.defaults.headers.common['Authorization'] =
          response.data.accessToken;
        const token: any = jwt_decode(response.data.refreshToken);
        localStorage.setItem('sessionData', JSON.stringify(token));
        cb();
      })
      .catch(function (error: any) {
        console.log(error.response);
      });
  };

  // TODO: API: Terminate Session
  const logout = (username: String, cb: Function) => {
    localStorage.removeItem('sessionData');
    cb();
  };

  const checkLocalSession = () => {
    return Boolean(session.session);
  };

  return {
    session,
    login,
    logout,
    checkLocalSession,
  };
}

//* Authentication Wrapper
export function AuthWrapper({ children }: { children: React.ReactElement }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

//* Api Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
