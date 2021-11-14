import React from 'react';
import { useAuth } from '../contexts/auth';

import AuthRoutes from '../routes/auth.routes';
import AppRoutes from '../routes/app.routes';

import { Text } from 'react-native';


const Routes: React.FC = () => {

  const { signed, loading } = useAuth();

  if (loading) {
    return <Text>Carregando</Text>;
  }


  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;