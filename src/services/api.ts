import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({

  baseURL: "https://794a-160-238-133-77.ngrok.io/src/",
  timeout: 30000

});

import { User } from "../model/User";


api.interceptors.request.use(async function (config) {

  config.headers = {

    ...config.headers,
    'User-Agent': 'Caixa.v1'

  };

  if (config.url !== 'user/login') {

    if (
      typeof config.headers.Authorization !== "string" ||
      typeof config.headers.Authorization === "undefined"
    ) {

      let data = await AsyncStorage.getItem('@Caixa:user:info');
    

      if(data){

        
        let userInfo = JSON.parse(data) as User;

        if(userInfo && userInfo.token){

          if (userInfo.token !== null)
            config.headers.Authorization = `Bearer ${userInfo.token}`;

        }

      }

    }

  }

  return config;

}, function (err) {

  return Promise.reject(err);

});

export default api;
