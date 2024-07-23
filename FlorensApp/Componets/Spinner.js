import react,  {useState, useEffect} from "react";
import {View, Image, ActivityIndicator } from 'react-native';

 export const Spinner = ({ source, style }) => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Simula una carga de imagen con un tiempo de espera
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // Simula 2 segundos de carga
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
        <Image 
          source={source} 
          style={[style, { position: 'absolute' }]}
          onLoad={() => setLoading(false)}
        />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    );
  };
  