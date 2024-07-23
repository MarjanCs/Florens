import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    Image:{
        width: 60, 
        height: 60,
        resizeMode: 'cover',
        marginRight: 10,
        padding:43,
    },
    anotherImage: {
        width: 40, 
        height: 40, 
        resizeMode: 'cover',
        position: 'absolute',
        top: '40%',  
        left: '47%', 
        transform: [{ translateX: -16.5 }, { translateY: -30.5 }],
        borderRadius: 10, 
    },
    row: {
        flexDirection: 'row',
        marginBottom: -5,
        justifyContent: 'left',
        left: 5,
        top: -15,
    },
    item: {
        backgroundColor: '#FFFFFFB3',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        borderColor: '#003F72',
        marginHorizontal:5,
        marginTop:10
        
    },
    title: {
        fontSize: 15,
        color: '#003F72',
        fontWeight: 'bold',
        top: -10,
    },
    titleNumber:{
        fontSize: 13,
        color:"#FFFFFF",
        transform: [{ translateX: -2 }, { translateY: -22.5 }],
        fontWeight: 'bold',
    },
    textoBien: {
        color: '#003F72',
        fontSize: 19,
        textAlign: 'center',
        fontWeight: 'bold',
        padding:10
    },
    
    //estilos descripcion de necesidades
    Contenedor:{
		
	},
    containerDev: {
		backgroundColor: "#FFFFFF",
		flex:1
	},
    anotherImageDev: {
        width: 50, 
        height: 50, 
        resizeMode: 'cover',
        position: 'absolute',
        top: '40%',  
        left: '53%', 
        transform: [{ translateX: -45.5 }, { translateY: -15.5 }],
        borderRadius: 10, 

    },
    txtArea: {
        flex:1,
        color: '#003F72',
        fontSize: 18,
        textAlign: 'justify',
        fontWeight: 'bold',
        marginHorizontal:15
    },
    colorTxtBtn: {
        color: '#003F72',
        fontSize: 20,
        textAlign: 'center',
        width: 200,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    colorBtn: {
        marginTop: 40,
        borderColor: '#EAAB00',
        backgroundColor: '#EAAB00',
        padding: 10,
        marginHorizontal: 30,
        borderRadius: 10,
    },
    colorTxtLogo: {
        color: '#003F72',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:"center",
        padding:10
    },
    //
    infoContainer:{
        borderColor: '#EAAB00',
        backgroundColor: '#EAAB00',
        padding:5,
        marginTop:15,
        marginHorizontal:40,
        borderRadius: 10,
        borderBottomStartRadius: 10,
        flex:1,
    },
    infoText:{
        flex:1,
        color: '#003F72',
        fontSize: 15,
        fontWeight: 'bold',
    },
    informacionBtn: {
        fontSize: 17, 
        marginTop: 15, 
        marginBottom: -25,
        color: '#003F72', 
        fontWeight: 'bold', 
        textAlign: "justify"
    }
});

export default styles;