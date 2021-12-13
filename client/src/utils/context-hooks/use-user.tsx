import * as React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { useApi } from './use-api';

interface UserContextInterface{
  getUser: Function;
  addGroup: Function;
  removeGroups: Function;
  validateJWT: Function;
}

const UserContext = createContext<UserContextInterface | null>(null);

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

  const addGroup = (g: String) => {
    setUser({groups: [...user.groups, g], ...user})
  }

  const removeGroups = (groupList: [String]) => {
    setUser({groups: [user.groups.filter(group => !groupList.includes(group))], ...user})
  }

  const validateJWT = (redirect: any) => {
    api
      .get('./validate')
      .then(function (response: any) {
        setUser(response.data);
      })
      .catch(function (error: any) {
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
export function UserWrapper({ children }: {children: React.ReactElement}) {
  const user = useProvideUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

//* Api Hook
export const useUser = () => {
  return useContext(UserContext);
};