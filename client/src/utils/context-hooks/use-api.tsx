import * as React from 'react';
import { useContext, createContext } from 'react';

const axios = require('axios').default;
const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
  withCredentials: true,
});

const ApiContext = createContext<typeof api | null>(null);

//* Api Wrapper
export function ApiWrapper( { children }: {children: React.ReactElement} ) {
  return (<ApiContext.Provider value={api}>{children}</ApiContext.Provider>)
}

//* Api Hook
export const useApi = () => {
  return useContext(ApiContext);
}