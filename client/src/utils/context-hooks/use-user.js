import React, { useState, useContext, createContext } from 'react';

const UserContext = createContext();

const axios = require('axios').default;
const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
  withCredentials: true,
});

//* Method Hook
function useProvideUser() {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [groups, setGroups] = useState([]);
  const [iat, setIat] = useState(null);

  const getUser = () => {
    return { username: username, fullname: fullname, groups: groups, iat: iat };
  };

  const updateUser = (user) => {
    setUsername(user.username);
    setFullname(user.fullname);
    setGroups(user.groups);
    setIat(user.iat);
    return getUser();
  };

  const addGroup = (g) => {
    setGroups([...groups, g])
  }

  const removeGroups = (groupList) => {
    setGroups(groups.filter(group => !groupList.includes(group)))
  }

  const validateJWT = (redirect) => {
    api
      .get('./validate')
      .then(function (response) {
        updateUser(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        redirect();
      });
  };

  return {
    getUser,
    updateUser,
    addGroup,
    removeGroups,
    validateJWT
  };
}

//* User Context Provider
export function UserWrapper({ children }) {
  const user = useProvideUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

//* Api Hook
export const useUser = () => {
  return useContext(UserContext);
};