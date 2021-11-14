import React, { useState, useRef, useEffect } from 'react';
import {

  Image,
  ScrollView,
  Dimensions,
  Alert,
  RefreshControl,
  SafeAreaView,
  StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList

} from 'react-native';

import styles from './Styles';


import { useAuth } from '../../contexts/auth';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashBoard() {

  const { signed, userInfo, signIn, signOut } = useAuth();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [infos, setInfos] = useState<any>('');
  const [refreshing, setRefreshing] = useState(false);

  const inputSenha = useRef(null);
  const btnSubmit = useRef(null);

  const Caixa = require('../../../assets/caixa.png');
  const Caixa80 = require('../../../assets/caixa80.png');
  const Caixa50 = require('../../../assets/caixa50.png');
  const Caixa20 = require('../../../assets/caixa20.png');
  const Caixa0 = require('../../../assets/caixa0.png');

  const alert = require('../../../assets/alert.png');
  const ok = require('../../../assets/ok.png');

  const { navigate } = useNavigation();


  async function login() {
    AsyncStorage.clear();
  }

  async function getDashboard() {
    //AsyncStorage.clear();

    setRefreshing(true);

    api.get('all/dashboard')

      .then((response) => {

        console.log('aqui');
        console.log(response.data.dashboard);
        setInfos(response.data.dashboard)
        setRefreshing(false);


      })
      .catch((error) => {
        console.log(error);

        if (error.response.status === 500) {

          Alert.alert("Atenção", "Os nossos servidores estão fora do ar, tente novamente mais tarde!");

        }

        if (error.response.status === 401) {

          Alert.alert("Atenção", "Você ficou muito tempo sem usar o nosso App! Por favor faça novamente o login");
          //signOut();

        }




      });

  }


  useEffect(() => {

    getDashboard();



  }, []);

  const Item = ({ item }: any) => (

    <View >
      <Text style={{ color: 'white', textAlign: 'center' }}>{item}</Text>
    </View>
  );



  const renderItem = ({ item }: any) => (

    <View>
      <Item item={item.id} />

      {
        item.id === 'Interrupção do abastecimento externo'
          ?
          <Image style={{
            width: "3%",
            backgroundColor: "#465881",
            borderRadius: 25,
            height: 25,
            marginTop: -20,
            marginLeft: 10,
            justifyContent: "center",
            padding: 10
          }} source={alert} />
          :
          <>
          </>
      }

      {
        item.id === 'O abastecimento externo está normal!'
          ?

          <Image style={{
            width: "3%",
            backgroundColor: "#465881",
            borderRadius: 25,
            height: 25,
            marginTop: -20,
            justifyContent: "center",
            padding: 10
          }} source={ok} />


          :
          <>
          </>
      }





      {
        item.caixa === '100.00'
          ?
          <Image style={styles.logo} source={Caixa} />
          :
          <>
          </>

      }

      {
        item.caixa <= '99.00' && item.caixa >= '70.00'
          ?
          <Image style={styles.logo} source={Caixa80} />

          :
          <>
          </>
      }


      {
        item.caixa <= '69.00' && item.caixa >= '50.00'
          ?
          <Image style={styles.logo} source={Caixa50} />

          :
          <>
          </>
      }

      {
        item.caixa <= '49.00' && item.caixa >= '19.00'
          ?
          <Image style={styles.logo} source={Caixa20} />

          :
          <>
          </>
      }


      {
        item.caixa === '0.00' || item.caixa <= '18.00' && item.caixa != '100.00'
          ?

          <Image style={styles.logo} source={Caixa0} />

          :
          <>
          </>
      }

    </View>


  );

  const onRefresh = React.useCallback(() => {
    getDashboard();

    setTimeout(function () { onRefresh() }, 3000);
  }, []);

  return (




    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >

        <View style={{ marginTop: 60 }}>
          <Text style={styles.logo2}>Central de Monitoramento{'\n'} Interno de Água</Text>
          <Text style={styles.logo3}></Text>
        </View>



        <FlatList
          data={infos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

      </ScrollView>






      <TouchableOpacity style={styles.loginBtn} onPress={() => signOut()}>
        <Text style={styles.loginText}>Sair</Text>
      </TouchableOpacity>
    </View>



  );
}
