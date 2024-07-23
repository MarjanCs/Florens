import react,  {useRef, useEffect} from "react";
import {Animated, Easing } from 'react-native';


export const SlideUp = (props) => {
	const slideAnim = useRef(new Animated.Value(-300)).current; // Valor inicial fuera de la pantalla a la derecha
  
	useEffect(() => {
	  Animated.timing(
		slideAnim,
		{
		  toValue: 0, // Valor final (posición original)
		  duration: 1000, // Duración de la animación en milisegundos
		  easing: Easing.inOut(Easing.ease), // Efecto de animación
		  useNativeDriver: true // Usa el controlador nativo para mejorar el rendimiento
		}
	  ).start();
	}, [slideAnim]);
  
	return (
	  <Animated.View
		style={{
		  ...props.style,
		  transform: [{ translateY: slideAnim }], // Aplica la animación de desplazamiento horizontal
		}}
	  >
		{props.children}
	  </Animated.View>
	);
  }