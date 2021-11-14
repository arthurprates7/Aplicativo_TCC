import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator
    initialRouteName='Login'
  >
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />

  <AuthStack.Screen
      name="Cadastro"
      component={Cadastro}
      options={{ headerShown: false }}
    />

  </AuthStack.Navigator>
);

export default AuthRoutes;
