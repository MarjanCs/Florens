import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image,ScrollView } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/stylesNecesidades"
import { AuthContext } from "../../context/AuthContext";
import NetInfo from '@react-native-community/netinfo';


const DesDominios = ({route}) => {
	const [data, setData] = useState([]);
	const [clases, setClases] = useState([]);
	const [visibleItems, setVisibleItems] = useState({});
	const {Document} = route.params;
	const {Id} = route.params;
	const navigation = useNavigation();
	const {checkUserAuthentication} = useContext(AuthContext);
	const [datosBibliografia, setDatosBibliografia] = useState([]);
	const [isConnected, setIsConnected] = useState(true);
	const [resultadosBiblio, setResultBiblio] = useState("");
	const [resultadosDiagnostico, setResultDiagnostico] = useState("");
	const [mostrarInformacionBiblio, setMostrarInformacionBiblio] = useState(false);
	const [mostrarInformacion, setMostrarInformacion] = useState(false);
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
            const Dominios = await AsyncStorage.getItem('AlmacenDominios'+Id);
			const userInfo = JSON.parse(Dominios)
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
	const ObtenerBibliografia = async () => {
		try {
		  const response = await axios.get(`${BASE_URL}/BibliografiasList/Dominios`);
		  setDatosBibliografia(response.data);
		  //console.log(response.data)
		} catch (error) {
		  console.error('Error al obtener datos de la API:', error);
		} finally {
		}
	};
	const fetchData = async () => {
		try {
			console.log(Document+Id);
			const response = await axios.post(`${BASE_URL}/DocDominiosInfo`, {
			Name:Document,
			Document:Id
			});
			const token = AsyncStorage.setItem('AlmacenDominios'+Id, JSON.stringify(response.data));
			setData(response.data);
			setClases(response.data[0].Clases);
			//console.log(response.data[0].Clases)
		} catch (error) {
			console.error('Error al obtener datos de la API:', error);
		}
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
	const mostrar = (Diagnosticos) => {
		let resultAfecciones = "";
		Object.entries(Diagnosticos).forEach(([afeccion, descripcion]) => {
			resultAfecciones = resultAfecciones+`${descripcion}`+"\n";
		});
		setResultDiagnostico(resultAfecciones);
	};
	const mostrarOcultar = () => {
		setMostrarInformacion(!mostrarInformacion);
	};
	const toggleVisibility = (index) => {
        setVisibleItems(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };
	const InfoClases=()=>{
        return(
            <View >
				{
					clases.map((item,index)=>(
						<View key={index}>
							<TouchableOpacity 
								style={styles.colorBtn}
								onPress={() => {toggleVisibility(index);mostrar(item.Diagnosticos)}}>
								<Text style={[styles.colorTxtBtn,{marginBottom:5}]}>{item.Clase}</Text>
								
								{visibleItems[index] && (
									<View >
										<Text style={styles.infoText}>{item.Descripcion}</Text>
										<Text style={[styles.infoText,{fontSize:20, marginBottom:5, marginTop:20}]}>Diagnosticos:</Text>
										<Text style={styles.infoText}>{resultadosDiagnostico}</Text>
									</View>
								)}
							</TouchableOpacity>
						</View>
					))
				}                
            </View>
        );
    }
	return (
	  <View style={styles.containerDev}>
		  <ScrollView>
			<Text style={styles.textoBien} >Dominios de NANDA</Text>
			<View style={{ flexDirection: 'row', justifyContent: 'center'}}>
				<Image
					source={require('../../img/Rectangulo.png')}
					style={styles.Image}
				/>
				<Image
					source={{ uri: data[0]?.Img }}
					style={styles.anotherImageDev}
				/>
					
				</View>
				<Text style={styles.colorTxtLogo}>{Id}.{data[0]?.Titulo}</Text>
				<Text style={styles.txtArea} >{data[0]?.Definicion}</Text>
				<View style={styles.Contenedor}>
				<TouchableOpacity onPress={mostrarOcultar}
					style={styles.colorBtn}>
					<Text style={styles.colorTxtBtn}>Clases del dominio</Text>
				</TouchableOpacity>
				{
					mostrarInformacion && (
						<InfoClases/>
					)
				}
				<TouchableOpacity onPress={mostrarOcultarBiblio}
					style={styles.colorBtn}>
					<Text style={styles.colorTxtBtn}>Bibliografías Relacionadas</Text>
					<View>
						{
							mostrarInformacionBiblio && (
								<Text style={{ fontSize: 17, marginVertical: 15,color: '#003F72',fontWeight: 'bold',textAlign:"justify",}}>{resultadosBiblio}</Text>
							)
						}
					</View>
				</TouchableOpacity>
			</View>
		  </ScrollView>
	  </View>
	);
};

export default DesDominios;
