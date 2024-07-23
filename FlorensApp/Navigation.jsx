import react, { useContext } from "react";
import { Image, View, Text,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigate, navigationRef } from './RootNavigation';
import { AuthContext } from "./context/AuthContext";

//views
import LoginScreen from "./src/views/login";
import RegisScreen from "./src/views/registro";
import ContenidoScreen from "./src/views/contenido";
import NecesidadesScreen from "./src/views/necesidades";
import PatronesScreen from "./src/views/patrones";
import DominiosScreen from "./src/views/dominios";
import TutorScreen from "./src/views/tutor";
import DesNecesidadesScreen from "./src/views/desNecesidades";
import DesDominioScreen from "./src/views/desDominios";
import DesPatronesScreen from "./src/views/desPatrones";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>      
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'White',
          headerStyle: { backgroundColor: '#003F72' },
          headerTitle: () => <CustomHeader />
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Registro" component={RegisScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Contenido" component={ContenidoScreen} options={{headerShown:false}}/>

        <Stack.Screen name="Necesidades" component={TabNavigator} initialParams={{ screen: "Necesidades" }}/>
        <Stack.Screen name="Patrones" component={TabNavigator} initialParams={{ screen: "Patrones" }}/>
        <Stack.Screen name="Dominios" component={TabNavigator} initialParams={{ screen: "Dominios" }}/>
        <Stack.Screen name="Tutor" component={TabNavigator} initialParams={{ screen: "Tutor" }}/>
        
        <Stack.Screen name="DesNecesidades" component={DesNecesidadesScreen} />
        <Stack.Screen name="DesDominios" component={DesDominioScreen} />
        <Stack.Screen name="DesPatrones" component={DesPatronesScreen}/>
        
      </Stack.Navigator>
      
    </NavigationContainer>
    
  );
}
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: '#003F72', flex:0.1 },
      tabBarActiveTintColor: '#003F72' ,
      tabBarInactiveTintColor: "#FFFFFF",
      tabBarActiveBackgroundColor:'#EAAB00',
      headerTitle: () => <CustomHeader />
    }}>
      <Tab.Screen name="Necesidades" component={NecesidadesScreen} options={{headerShown:false, 
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={focused ? require('./img/nece_1.png') : require('./img/nece.png')}
            style={{ width: 50, height: 50 }}
          />
        ),}}/>
        <Tab.Screen name="Patrones" component={PatronesScreen} options={{headerShown:false,
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={focused ? require('./img/patrones_1.png') : require('./img/patrones.png')}
            style={{ width: 50, height: 50 }}
          />
        ),}}/>
        <Tab.Screen name="Dominios" component={DominiosScreen} options={{headerShown:false, 
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={focused ? require('./img/dominios_1.png') : require('./img/dominios.png')}
            style={{ width: 50, height: 50 }}
          />
        ),}}/>
        <Tab.Screen name="Tutor" component={TutorScreen} options={{headerShown:false, 
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={focused ? require('./img/tutor_logo_1.png') : require('./img/tutor_logo.png')}
            style={{ width: 40, height: 40 }}
          />
        ),}}/>
    </Tab.Navigator>
  );
}
const CustomHeader = () => {
  const { closeSession } = useContext(AuthContext);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('./img/UTPL1.png')}
        style={{ width: 90, height: 40, marginRight: 45 }}
      />
      <TouchableOpacity onPress={() => navigate('Contenido')}>
        <Image
          source={require('./img/florens.png')}
          style={{ width: 40, height: 40, marginRight: 55 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={closeSession}>
        <Image
          source={require('./img/out.png')}
          style={{ width: 35, height: 35, marginRight: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Navigation;
