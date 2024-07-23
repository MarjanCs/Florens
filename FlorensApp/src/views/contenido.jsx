import react,  {useRef, useEffect, useState, useCallback} from "react";
import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import styles from '../styles/stylesContenido';
import {SlideInFromRight} from '../../Componets/SlideInFromRight'


const Contenido = ({ route }) => {
	const navigation = useNavigation();
  	const [slideAnim] = useState(new Animated.Value(100));

	  useFocusEffect(
		useCallback(() => {
		  // Start the animation when the screen is focused
		  Animated.timing(slideAnim, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true,
		  }).start();
	
		  return () => {
			// Reset the animation value when the screen loses focus
			slideAnim.setValue(100);
		  };
		}, [slideAnim])
	  );
		
	return (
	  <View style={styles.container}>
		
  
		<View style={styles.VistaImagenText}>
		  <Image style={styles.Image}
			source={require('../../img/UTPL.png')}
		  />
		  <Image
			source={require('../../img/logo.png')}
			 style={{ width: 60, height: 70, top: 20, left: -30 }}
		  />
		  <Text style={styles.colorTxtLogo}>Bienvenido a {"\n"} Florens</Text>
		</View>
		<Text style={styles.textoBien} >Contenido</Text>
		<View style={styles.Contenedor}>
		  <View style={styles.BotonesContenedor}>
			<View>
			  <TouchableOpacity onPress={() => navigation.navigate('Necesidades', { screen: 'Necesidades' })}
				style={styles.colorBtn}>
				<Text style={styles.colorTxtBtn}>Necesidades Básicas</Text>
			  </TouchableOpacity>
			</View>
			<SlideInFromRight style={{ width: 65, height: 60, left: 30 }}>
			  <Image
				source={require('../../img/Henderson.png')}
				style={{ width: 65, height: 60 }}
			  />
			</SlideInFromRight>
		  </View>
		  <View style={styles.BotonesContenedor}>
			<View>
			  <TouchableOpacity onPress={() => navigation.navigate('Patrones', { screen: 'Patrones' })}
				style={styles.colorBtn}>
				<Text style={styles.colorTxtBtn}>Patrones Funcionales</Text>
			  </TouchableOpacity>
			</View>
			<SlideInFromRight style={{ width: 50, height: 60, left: 20, top: 15 }}>
			  <Image
				source={require('../../img/Gordon.png')}
				style={{ width: 50, height: 60 }}
			  />
			</SlideInFromRight>
		  </View>
		  <View style={styles.BotonesContenedor}>
			<View>
			  <TouchableOpacity onPress={() => navigation.navigate('Dominios', { screen: 'Dominios' })}
				style={styles.colorBtn}>
				<Text style={styles.colorTxtBtn}>Dominios de NANDA</Text>
			  </TouchableOpacity>
			</View>
			<SlideInFromRight style={{ width: 50, height: 60, left: 20, top: 20 }}>
			  <Image
				source={require('../../img/Nanda.png')}
				style={{ width: 50, height: 60 }}
			  />
			</SlideInFromRight>
		  </View>
		  <View style={styles.BotonesContenedor}>
			<View>
			  <TouchableOpacity onPress={() => navigation.navigate('Tutor', { screen: 'Tutor' })}
				style={styles.colorBtn}>
				<Text style={styles.colorTxtBtn}>Tutor Automatizado</Text>
			  </TouchableOpacity>
			</View>
			<SlideInFromRight style={{ width: 40, height: 60, left: 12, top: 20 }}>
			  <Image
				source={require('../../img/tutor.png')}
				style={{ width: 40, height: 60 }}
			  />
			</SlideInFromRight>
		  </View>
		</View>
	  </View>
	);
  };
  
  export default Contenido;
