import React, { useState, useRef, useEffect } from 'react';
import {
   
    Image,
    ScrollView,
    Dimensions,
    Alert,
    StyleSheet, Text, View, TextInput, TouchableOpacity , Platform

} from 'react-native';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import styles from './Styles';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

export default function Login() {

    const [expo, setExpoPushToken] = useState<any>('');
    const [notification, setNotification] = useState<any>(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
       
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
       
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

    const { signed, userInfo, signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const Caixa = require('../../../assets/caixa.png');
    const { navigate } = useNavigation();


    async function cadastro(){
        navigate('Cadastro');
    }

    async function submit() {

        try {

            if (email.trim().length === 0)
                throw new Error('Informe o e-mail corretamente');

            if (password.trim().length === 0)
                throw new Error('Informe a senha corretamente');
            

            setIsProcessing(true);

            await new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });

            signIn(email, password, expo)
                .then((response) => {

                  console.log('passou aqui');
                    console.log(response.data);
                    setIsProcessing(false);

                })
                .catch((error) => {
                    console.log(error)

                    let message = typeof
                        error.response.data.message !== "undefined" ?
                        error.response.data.message :
                        "Ocorreu um erro ao tentar processar a requisição";

                    Alert.alert("Erro", message);
                    setIsProcessing(false);


                });

        } catch (e) {

            Alert.alert("Erro");

        }

    }

    return (


        <View style={styles.container}>

            <Image style={styles.logo} source={Caixa} />
            <Text style={styles.logo2}>LOGIN</Text>

                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Email..." 
                        autoCorrect={false}
                        placeholderTextColor="#003f5c"
                        onChangeText={(value) => { setEmail(value) }}
                    />
                </View>

                <View style={styles.inputView} >
                    <TextInput  
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Senha..." 
                        autoCorrect={false}
                        placeholderTextColor="#003f5c"
                        onChangeText={(value) => { setPassword(value) }}
                    />
                </View>

               

                <TouchableOpacity style={styles.loginBtn} onPress={()=>submit()}>
                    <Text style={styles.loginText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={()=>cadastro()}>
                    <Text style={styles.loginText}>Cadastro</Text>
                </TouchableOpacity>

  
        </View>



    );
}
