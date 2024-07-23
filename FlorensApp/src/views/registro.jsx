import react,  {useContext, useState} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../styles/stylesRegistro';
const Registro = ({route}) => {
	const navigation = useNavigation();

	const [nombre, setNombres] = useState(null);
	const [pais, setPais] = useState(null);
	const [ciudad, setCiudad] = useState(null);
	const [email, setEmail] = useState(null);
	const [universidad, setuniversidad] = useState(null);
	const [password, setpassword] = useState(null);
	const {isLoading, register} = useContext(AuthContext);
  	return (
		<View style={styles.container}>
			<Spinner visible={isLoading}/>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <Image
                        source={require('../../img/UTPL.png')}
                        style={styles.imagenUtpl}
                    />
                    <Image
                        source={require('../../img/logo.png')}
                        style={styles.imagenLogo}
                    />
                </View>
                <Text style={styles.textoBien} >Crear Cuenta</Text>
                <Text style={styles.TextoIngr} >Por favor, llene todos los campos</Text>
                <View style={styles.txtInput}>
                    <View style={styles.IconText}>
                        <Text style={styles.TextoUsuario} >Nombre</Text>
                    </View>
                    <TextInput  
                        value={nombre}
                        placeholder="Ingrese su nombre"
                        onChangeText={text => setNombres(text)}
                        />
                </View>
				<View style={styles.txtInput}>
                    <View style={styles.IconText}>
                        <Text style={styles.TextoUsuario} >Pais</Text>
                    </View>
                    <TextInput  
                        value={pais}
                        placeholder="Ingrese su pais"
                        onChangeText={text => setPais(text)}
                        />
                </View>
				<View style={styles.txtInput}>
                    <View style={styles.IconText}>
                        <Text style={styles.TextoUsuario} >Ciudad</Text>
                    </View>
                    <TextInput  
                        value={ciudad}
                        placeholder="Ingrese su ciudad"
                        onChangeText={text => setCiudad(text)}
                        />
                </View>
				<View style={styles.txtInput}>
                    <View style={styles.IconText}>
                        <Text style={styles.TextoUsuario} >E-mail (Usuario)</Text>
                    </View>
                    <TextInput  
                        value={email}
                        placeholder="Ingrese su E-mail"
                        onChangeText={text => setEmail(text)}
                        />
                </View>
				<View style={styles.txtInput}>
                    <View style={styles.IconText}>
                        <Text style={styles.TextoUsuario} >Universidad</Text>
                    </View>
                    <TextInput  
                        value={universidad}
                        placeholder="Ingrese su universidad"
                        onChangeText={text => setuniversidad(text)}
                        />
                </View>
				<View style={styles.txtInput}>
                    <View style={styles.IconText}>
                        <Text style={styles.TextoUsuario} >Contraseña</Text>
                    </View>
                    <TextInput secureTextEntry={true} 
                        value={password}
                        placeholder="Ingrese su contraseña"
                        onChangeText={text => setpassword(text)}
                        />
                </View>
                <TouchableOpacity onPress={() =>{register(nombre, pais, ciudad, email, universidad, password)}}
                    style={styles.colorBtn}>
                <Text style={styles.colorTxtBtn}>Registro</Text>
                </TouchableOpacity>
                <Text> </Text>
                <View style={styles.IconText}>
                    <Text style={{right:-70}}>Ya tienes cuenta,</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.colorTxtBtnRegistro}>Ingresa</Text>
                    </TouchableOpacity>
                </View> 
            </View>
    	</View>
    )
}

export default Registro;
