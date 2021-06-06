import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import CateAPI from './api/CateAPI';
import ProdAPI from './api/ProdAPI';
import UserAPI from './api/UserAPI';

export const GlobalState = createContext();
export const useGlobalContext = () => {
  return useContext(GlobalState);
}

export function DataProvider({ children }) {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem('first_login');
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token');
        setToken(res.data.accessToken);
        setTimeout(() => {
          refreshToken();
        }, 120000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    prodAPI: ProdAPI(),
    userAPI: UserAPI(token),
    cateAPI: CateAPI()
  }

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};
