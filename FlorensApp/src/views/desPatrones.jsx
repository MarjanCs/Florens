import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { BASE_URL } from '../config';
import styles from "../styles/stylesPatrones";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo';
import {SlideUp} from '../../Componets/SlideUp'


const DesPatrones = ({route}) => {
	const [data, setData] = useState([]);
	const [datosBibliografia, setDatosBibliografia] = useState([]);
	const navigation = useNavigation();
	const {Document} = route.params;
	const {Id} = route.params;
	const [mostrarInformacionResultados, setMostrarInformacionResultados] = useState(false);
	const [mostrarInformacionValorar, setMostrarInformacionValorar] = useState(false);
	const [mostrarInformacionPatron, setMostrarInformacionPatron] = useState(false);
	const [mostrarInformacionBiblio, setMostrarInformacionBiblio] = useState(false);
	const [resultValorar, setResultValorar] = useState("");
	const [resultResultados, setResultResultados] = useState("");
	const [resultPatron, setResultPatron] = useState("");
	const [resultadosBiblio, setResultBiblio] = useState("");
	const {checkUserAuthentication} = useContext(AuthContext);
	const [isConnected, setIsConnected] = useState(true);
	useEffect(() => {
		checkUserAuthentication();
		const intervalId = setInterval(() => {
			checkUserAuthentication();
		}, 2000); 
		const unsubscribe = NetInfo.addEventListener((state) =>{
			setIsConnected(state.isConnected);
			if (state.isConnected) {
				console.log(state.isConnected);
				fetchData();
				ObtenerBibliografia();
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
	
	const AlmacenInformacion = async () =>{
		try {
            const Patrones = await AsyncStorage.getItem('AlmacenPatrones'+Id);
			const userInfo = JSON.parse(Patrones)
			const Bibliografia = await AsyncStorage.getItem('BibliografiasPatro');
			const userInfo2 = JSON.parse(Bibliografia)
            if (Patrones) {
                setData(userInfo)
				setDatosBibliografia(userInfo2);
            } else {
                fetchData();
				ObtenerBibliografia();
            }
        } catch (error) {
            console.error('Error al verificar la autenticación:', error);
        }
	}

	const fetchData = async () => {
		try {
			console.log(Document);
		  const response = await axios.post(`${BASE_URL}/DocPatronesInfo`, {
			Name:Document,
			Document:Id
		  });
		  const token = AsyncStorage.setItem('AlmacenPatrones'+Id, JSON.stringify(response.data));
		  setData(response.data);
		  console.log(response.data)
		} catch (error) {
		  console.error('Error al obtener datos de la API:', error);
		}
	};
	const ObtenerBibliografia = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/BibliografiasList/Patrones`);
			const token = AsyncStorage.setItem('BibliografiasPatro', JSON.stringify(response.data));
			setDatosBibliografia(response.data);
			console.log(response.data)
		} catch (error) {
			console.error('Error al obtener datos de la API:', error);
		}
	};
	const mostrarOcultarValorar = () => {
		let resultValorar = "";
		Object.entries(data[0]?.["Valoraciones"]).forEach(([afeccion, descripcion]) => {
            resultValorar = resultValorar+`${afeccion}: ${descripcion}`+"\n";
          });
		setResultValorar(resultValorar);
		setMostrarInformacionValorar(!mostrarInformacionValorar);
	};
	const mostrarOcultarResultados = () => {
		let resultValorar = "";
		Object.entries(data[0]?.["Resultados"]).forEach(([afeccion, descripcion]) => {
            resultValorar = resultValorar+`${afeccion}: ${descripcion}`+"\n";
          });
		setResultResultados(resultValorar);
		setMostrarInformacionResultados(!mostrarInformacionResultados);
	};
	const mostrarOcultarPatrones = () => {
		let resultValorar = "";
		Object.entries(data[0]?.["Alteraciones"]).forEach(([afeccion, descripcion]) => {
            resultValorar = resultValorar+`${afeccion}: ${descripcion}`+"\n";
          });
		setResultPatron(resultValorar);
		setMostrarInformacionPatron(!mostrarInformacionPatron);
	};
	const mostrarOcultarBiblio = () => {
		let resultAfecciones = "";
		Object.entries(datosBibliografia.Bibliografias).forEach(([afeccion, descripcion]) => {
            console.log(`${afeccion}: ${descripcion}`);
            resultAfecciones = resultAfecciones+`${afeccion}: ${descripcion}`+"\n";
          });
		setResultBiblio(resultAfecciones);
		setMostrarInformacionBiblio(!mostrarInformacionBiblio);
	  };
	return (
	  	<View style={styles.containerDev}>
			<ScrollView>
				<Text style={styles.textoBien} >Patrones de Marjory Gordon</Text>
				<SlideUp>	
				<View style={{ flexDirection: 'row', justifyContent: 'center'}}>
				<Image
						source={require('../../img/Rectangulo.png')}
						style={styles.Image}
					/>
					<Image style={styles.anotherImageDev} source={{ uri: data[0]?.Img }}>
					</Image>
				</View>
				</SlideUp>
				
				<Text style={styles.colorTxtLogo}>{Id}. {data[0]?.Titulo}</Text>
				<Text style={styles.txtArea}>{data[0]?.Definicion}</Text>

				<SlideUp>
				<View style={styles.Contenedor}>
					<TouchableOpacity
						style={styles.colorBtn} onPress={mostrarOcultarValorar}>
							<Text style={styles.colorTxtBtn}>¿Que valora?</Text>
							<View>
								{
									mostrarInformacionValorar && (
										<Text style={styles.informacionBtn}>{resultValorar}</Text>
									)
								}
							</View>
						</TouchableOpacity>
					<TouchableOpacity
						style={styles.colorBtn} onPress={mostrarOcultarPatrones}>
							<Text style={styles.colorTxtBtn}>Alteraciones del Patrón</Text>
							<View>
								{
									mostrarInformacionPatron && (
										<Text style={styles.informacionBtn}>{resultPatron}</Text>
									)
								}
							</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.colorBtn} onPress={mostrarOcultarResultados}>
							<Text style={styles.colorTxtBtn}>Resultados</Text>
							<View>
								{
									mostrarInformacionResultados && (
										<Text style={styles.informacionBtn}>{resultResultados}</Text>
									)
								}
							</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={mostrarOcultarBiblio}
						style={styles.colorBtn}>
							<Text style={styles.colorTxtBtn}>Bibliografia Relacionada</Text>
							<View>
								{
									mostrarInformacionBiblio && (
										<Text style={styles.informacionBtn}>{resultadosBiblio}</Text>
									)
								}
							</View>
					</TouchableOpacity>
				</View>

				</SlideUp>
				
			</ScrollView>
	  </View>
	);
};

        				
export default DesPatrones;
        				