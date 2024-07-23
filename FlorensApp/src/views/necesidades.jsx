import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from '../config';
import axios from 'axios';
import styles from '../styles/stylesNecesidades';
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo';
const Necesidades = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {checkUserAuthentication} = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    checkUserAuthentication();
    checkUserAuthentication();
		const intervalId = setInterval(() => {
			checkUserAuthentication();
		}, 2000); 
    const unsubscribe = NetInfo.addEventListener((state) =>{
      setIsConnected(state.isConnected);
			if (state.isConnected) {
				console.log(state.isConnected);
				fetchData();
			}else{
				console.log(state.isConnected);
				AlmacenInformacion();
			}
    });
    return () =>{
			clearInterval(intervalId);
			unsubscribe();
		};
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/NecesidadesLista`);
      const token = AsyncStorage.setItem('Necesidades', JSON.stringify(response.data));
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const AlmacenInformacion = async () =>{
		try {
      const Necesidades = await AsyncStorage.getItem('Necesidades');
			const userInfo = JSON.parse(Necesidades)
        if (Necesidades) {
            setData(userInfo)
        } else {
            fetchData();
        }
    } catch (error) {
        console.error('Error al verificar la autenticación:', error);
    }
	}
  const navigation = useNavigation();
 //<Text style={styles.title}>{item.nombre}</Text
 
  const renderItems = () => {
    return Object.keys(data).map(item => (
      <TouchableOpacity style={styles.item} key={item} onPress={() => navigation.navigate('DesNecesidades',{Document:data[item].Title, Id:data[item].Id})}>
        
        <Image style={styles.Image} source={require('../../img/n1.png')}>
        </Image>
        <Image style={styles.anotherImage} source={{ uri: data[item].Img }}>
        </Image>
        <Text style={styles.titleNumber}>{item}</Text>
        <Text style={styles.title}>{data[item].Title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          {renderItems().slice(0, 3)}
        </View>
        <View style={styles.row}>
          {renderItems().slice(3, 6)}
        </View>
        <View style={styles.row}>
          {renderItems().slice(6, 9)}
        </View>
        <View style={styles.row}>
          {renderItems().slice(9, 12)}
        </View>
        <View style={styles.row}>
          {renderItems().slice(12, 14)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Necesidades;