import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from "../styles/stylesNecesidades"
import { AuthContext } from "../../context/AuthContext";
import NetInfo from '@react-native-community/netinfo';
import {SlideInFromRight} from '../../Componets/SlideInFromRight'

const DesNecesidades = ({route}) => {
	const [data, setData] = useState([]);
	const [datosBibliografia, setDatosBibliografia] = useState([]);
	const navigation = useNavigation();
	const {Document} = route.params;
	const {Id} = route.params;
	const [mostrarInformacion, setMostrarInformacion] = useState(false);
	const [mostrarInformacionAfecciones, setMostrarInformacionAfecciones] = useState(false);
	const [mostrarInformacionCuidados, setMostrarInformacionCuidados] = useState(false);
	const [mostrarInformacionBiblio, setMostrarInformacionBiblio] = useState(false);
	const [resultAfecciones, setResultAfecciones] = useState("");
	const [resultadosCuidados, setResultCuidados] = useState("");
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
            const Necesidades = await AsyncStorage.getItem('AlmacenNecesidades'+Id);
			const userInfo = JSON.parse(Necesidades)
			const Bibliografia = await AsyncStorage.getItem('BibliografiasNece');
			const userInfo2 = JSON.parse(Bibliografia)
            if (Necesidades) {
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
			console.log(Document+Id);
			const response = await axios.post(`${BASE_URL}/DocNecesidadesInfo`, {
			Name:Document,
			Document:Id
			});
			const token = AsyncStorage.setItem('AlmacenNecesidades'+Id, JSON.stringify(response.data));
			setData(response.data);
			//console.log(response.data)
		} catch (error) {
			console.error('Error al obtener datos de la API:', error);
		}
	};
	const ObtenerBibliografia = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/BibliografiasList/Necesidades`);
			//console.log(`${BASE_URL}/BibliografiasList/Necesidades`)
			const token = AsyncStorage.setItem('BibliografiasNece', JSON.stringify(response.data));
			setDatosBibliografia(response.data);
			//console.log(response.data)
		} catch (error) {
			console.error('Error al obtener datos de la API:', error);
		}
	};
	const mostrarOcultarInformacion = () => {
	setMostrarInformacion(!mostrarInformacion);
	};
	const mostrarOcultarAfecciones = () => {
		let resultAfecciones = "";
		Object.entries(data[0]?.Afecciones).forEach(([afeccion, descripcion]) => {
			//console.log(`${afeccion}: ${descripcion}`);
			resultAfecciones = resultAfecciones+`${afeccion}: ${descripcion}`+"\n";
			});
		setResultAfecciones(resultAfecciones);
		setMostrarInformacionAfecciones(!mostrarInformacionAfecciones);
	};
	const mostrarOcultarCuidados = () => {
		resultrCuidados = "";
		Object.entries(data[0]?.Cuidados).forEach(([afeccion, descripcion]) => {
			//console.log(`${afeccion}: ${descripcion}`);
			resultrCuidados = resultrCuidados+`${afeccion}: ${descripcion}`+"\n";
			});
		setResultCuidados(resultrCuidados);
		setMostrarInformacionCuidados(!mostrarInformacionCuidados);
	};
	const mostrarOcultarBiblio = () => {
		let resultAfecciones = "";
		Object.entries(datosBibliografia.Bibliografias).forEach(([afeccion, descripcion]) => {
			//console.log(`${afeccion}: ${descripcion}`);
			resultAfecciones = resultAfecciones+`${afeccion}: ${descripcion}`+"\n";
			});
		setResultBiblio(resultAfecciones);
		setMostrarInformacionBiblio(!mostrarInformacionBiblio);
	};
  	return (
		<View style={styles.containerDev}>
			<ScrollView>
				<Text style={styles.textoBien} >Necesidades de Virginia Henderson</Text>
				<SlideInFromRight>
				<View style={{ flexDirection: 'row', justifyContent: 'center'}}>
					<Image
						source={require('../../img/Rectangulo.png')}
						style={styles.Image}
					/>
					<Image style={styles.anotherImageDev} source={{ uri: data[0]?.Img }}>
					</Image>
				</View>
				</SlideInFromRight>
				
				<Text style={styles.colorTxtLogo}>{Id}. {data[0]?.Titulo}</Text>
				<Text style={styles.txtArea} >{data[0]?.Definicion}</Text>
				<SlideInFromRight>
				<View style={styles.Contenedor}>
					<TouchableOpacity
						style={styles.colorBtn} onPress={mostrarOcultarInformacion}>
							<Text style={styles.colorTxtBtn}>Objetivo</Text>
							<View>
								{
									mostrarInformacion && (
										<>
										<Text style={styles.informacionBtn}>{data[0]?.Objetivo}</Text>
										</>
									)
								}
							</View>
						</TouchableOpacity>
					<TouchableOpacity
						style={styles.colorBtn} onPress={mostrarOcultarAfecciones}>
							<Text style={styles.colorTxtBtn}>Afecciones Derivadas</Text>
							<View>
								{
									mostrarInformacionAfecciones && (
										<>
										<Text style={styles.informacionBtn}>{resultAfecciones}</Text>
										</>
									)
								}
							</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.colorBtn} onPress={mostrarOcultarCuidados}>
							<Text style={styles.colorTxtBtn}>Cuidados A Aplicar</Text>
							<View>
								{
									mostrarInformacionCuidados && (
										<>
										<Text style={styles.informacionBtn}>{resultadosCuidados}</Text>
										</>
									)
								}
							</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={mostrarOcultarBiblio}
						style={styles.colorBtn} >
							<Text style={styles.colorTxtBtn}>Bibliografia Relacionada</Text>
							<View>
								{
									mostrarInformacionBiblio && (
										<>
										<Text style={styles.informacionBtn}>{resultadosBiblio}</Text>
										</>
									)
								}
							</View>
					</TouchableOpacity>
				</View>
				</SlideInFromRight>
				
			</ScrollView>
		</View>)
};


export default DesNecesidades;
