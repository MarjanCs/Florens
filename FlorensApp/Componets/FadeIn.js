import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const FadeIn = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial de opacidad 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1, // Valor final de opacidad 1
        duration: 1500, // Duración de la animación en milisegundos
        useNativeDriver: true // Usa el controlador nativo para mejorar el rendimiento
      }
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim, // Aplica la animación de desvanecimiento
      }}
    >
      {props.children}
    </Animated.View>
  );
};
