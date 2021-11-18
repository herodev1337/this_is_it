import React, { useContext, createContext } from 'react';

const ApiContext = createContext();

const axios = require('axios').default;
const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
  withCredentials: true,
});

//* Api Wrapper
export function ApiWrapper( { children } ) {
  return (<ApiContext.Provider value={api}>{children}</ApiContext.Provider>)
}

//* Api Hook
export const useApi = () => {
  return useContext(ApiContext);
}