import React, { createContext, useState, useEffect, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

import { User } from "../model/User";

import { AxiosResponse } from "axios";
interface AuthContextData {

  signed: boolean;
  userInfo: User | null;
  loading: boolean;
  signIn(
    email: string,
    password: string,
    expo: string
  ): Promise<AxiosResponse<User>>;
  signOut(): void;

};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadStoragedData() {

      const storagedUserInfo = await AsyncStorage.getItem('@Caixa:user:info');

      await new Promise((resolve) => {

        setTimeout(resolve, 3000);

      });

      if (storagedUserInfo) {

        setUserInfo(JSON.parse(storagedUserInfo));

        if (userInfo && userInfo.token !== null)
          api.defaults.headers.Authorization = `Bearer ${userInfo.token}`;

      }

      setLoading(false);

    }

    loadStoragedData();

  }, []);

  async function signIn(user: string, password: string, expo: string) {

    const response = await api.post<User>("user/login", {

      email: user,
      password,
      expo

    });

    console.log(response);
    if (response.data) {

      setUserInfo(response.data); //obj

      await AsyncStorage.setItem('@Caixa:user:info', JSON.stringify(response.data)); //string
      api.defaults.headers.Authorization = `Bearer ${response.data.token}` //obj

    }

    return response;
  }

  function signOut() {

    AsyncStorage.clear()
      .then(() => {

        setUserInfo(null);

      });

  }


  return (

    <AuthContext.Provider value={{ signed: !!userInfo, userInfo, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>

  );
};

export function useAuth() {

  const context = useContext(AuthContext);
  return context;

}

