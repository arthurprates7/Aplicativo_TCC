import React, { useState, useRef } from 'react';
import {
   
    Image,
    ScrollView,
    Dimensions,
    Alert,
    StyleSheet, Text, View, TextInput, TouchableOpacity 

} from 'react-native';

import styles from './Styles';


import { useAuth } from '../../contexts/auth';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function Cadastro() {

    const { signed, userInfo, signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
   

    const inputSenha = useRef(null);
    const btnSubmit = useRef(null);

    const Caixa = require('../../../assets/caixa.png');

    const { navigate } = useNavigation();


    async function login(){
        navigate('Login');
    }

    async function submit() {

        try {

            api.post('user/cadastro',{
                name,
                email,
                password
            })

            .then((response) => {
                console.log(response)
                Alert.alert("Usuário Cadastrado! Favor fazer o login.");
                navigate('Login');

            })
            .catch((error) => {
                console.log(error);

                Alert.alert("Erro! Tente Novamente!");
            });

           

        } catch (e) {

            Alert.alert("Erro");

        }

    }

    return (


        <View style={styles.container}>

           
            <Image style={styles.logo} source={Caixa} />
            <Text style={styles.logo2}>CADASTRO</Text>

                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Nome..." 
                        autoCorrect={false}
                        placeholderTextColor="#003f5c"
                        onChangeText={(value) => { setName(value) }}
                    />
                </View>

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
                    <Text style={styles.loginText}>Concluir</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>login()}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

  
        </View>



    );
}
