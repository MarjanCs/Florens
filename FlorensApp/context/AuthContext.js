import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { Alert} from 'react-native';
import { BASE_URL } from '../src/config';
import { NavigationContainer, useNavigation } from "@react-navigation/native"; 

import { Navigation } from "../Navigation";
import * as RootNavigation from '../RootNavigation';



export const AuthContext = createContext();

function useCounter() {
    // Bien: nivel superior en un componente de función
  //  const navigation = useNavigation();
   //const [navigation] = useNavigation({});
   return console.log("mi token");
 }
 function createTwoButtonAlert (){
    Alert.alert(
      "Campos Inválidos",
      "Porfavor ingresar correctamente el correo electrónico o contraseña",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
  )};

  function createTwoButtonAlertRegistro (mensaje){
    Alert.alert(
      "Campos Inválidos",
      mensaje,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
  )};
  function createRegistro (mensaje){
    Alert.alert(
      "Cuenta Creada",
      mensaje,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
  )};

export const AuthProvider = ({children}) => {
    
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = props => (useNavigation());
    // Registro
    const register = (nombre, pais, ciudad, email, universidad, password) =>{
        setIsLoading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            createTwoButtonAlertRegistro("Correo electrónico inválido");
            setIsLoading(false);
            return;
        }
        if (password.length < 8) {
            createTwoButtonAlertRegistro("La contraseña debe tener al menos 8 caracteres");
            setIsLoading(false);
            return;
          }
        axios.post(`${BASE_URL}/Registro`,{
            nombre, pais, ciudad, email, universidad, password, rol:"usuario"
        }).then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            const usuario = AsyncStorage.setItem('userData', JSON.stringify(userInfo));
            setIsLoading(false);
            if (usuario!=null){
                console.log("mi usuario", usuario);
                createRegistro("Tu usuario se a registrado con éxito");
                RootNavigation.navigate('Login');
            }
        }).catch(e =>{
            createTwoButtonAlertRegistro("Los credenciales están vacíos o son incorrectos");
            console.log(`error en registro ${e}`);
            setIsLoading(false);
        })
    };

    // Login
    const login = async (email, password) =>{
        setIsLoading(true);
        axios.post(`${BASE_URL}/verificar_usuario`,{
            email,
            password
        }).then(res => {
            
            let userInfo = res.data;
            console.log(userInfo.status);
            setUserInfo(userInfo);
            const token = AsyncStorage.setItem('userData', JSON.stringify(userInfo))
            if (userInfo.status){
                console.log("mi token", token);
                //navigation.navigate('Cuenta creada');Cuenta creada
                
                RootNavigation.navigate('Contenido');
            }
            setIsLoading(false);

        }).catch(e => {
            
            createTwoButtonAlert();
            console.log(`login error ${e}`);
            setIsLoading(false);
        });
    }
    const checkUserAuthentication = async () =>{
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                //console.log('Usuario autenticado');
            } else {
                RootNavigation.navigate('Login');
                //console.log('Usuario no autenticado');
            }
        } catch (error) {
            console.error('Error al verificar la autenticación:', error);
        }
        
    }


    //Cerrar sesion
    const closeSession = async () =>{
        try {
            await AsyncStorage.removeItem('userData');
            //RootNavigation.navigate('Login');
            console.log('Cierre de sesión exitoso');
          } catch (error) {
            console.error('Error al cerrar sesión:', error);
          }
    }
    //
    return(
        <AuthContext.Provider 
            value={{
                isLoading,
                userInfo,
                login,
                register,
                closeSession,
                checkUserAuthentication
            }}>
            {children}
        </AuthContext.Provider>
        );
}