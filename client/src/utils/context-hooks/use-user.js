import React, { useState, useEffect, useContext, createContext } from 'react';
import { useApi } from './use-api';

const UserContext = createContext();

//* Method Hook
function useProvideUser() {
  const api = useApi()

  const [user, setUser] = useState({
    db_id: null,
    username: '',
    fullname: '',
    groups: [],
    iat: null
  });

  const getUser = () => { return user };

  const addGroup = (g) => {
    setUser({groups: [...user.groups, g], ...user})
  }

  const removeGroups = (groupList) => {
    setUser({groups: [user.groups.filter(group => !groupList.includes(group))], ...user})
    setGroups()
  }

  const validateJWT = (redirect) => {
    api
      .get('./validate')
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        redirect();
      });
  };

  return {
    getUser,
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