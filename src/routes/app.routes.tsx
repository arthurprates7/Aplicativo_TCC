import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from "../pages/DashBoard/DashBoard";

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator screenOptions={{ cardStyle: { backgroundColor: 'transparent' },animationEnabled:true,animationTypeForReplace:"pop",gestureDirection:'horizontal' }}>
       <AppStack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>

  </AppStack.Navigator>
);

export default AppRoutes;


