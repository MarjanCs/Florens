import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagenLogo:{
        width: 50, height: 60
    },
    imagenUtpl:{
        width: 120, height: 50
    },
    textoBien: {
        color: '#003F72',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    TextoIngr: {
        color: '#003F72',
        textAlign: 'center',
    },
    IconText:{
        flexDirection: 'row', textAlign: 'center',
    },
    TextoUsuario:{
        color: '#EAAB00',
        fontSize: 15,
        fontWeight: 'bold'
    },
    txtInput: {
        color: '#002233',
        fontSize: 16,
        marginTop: 15,
        paddingLeft: 20,
        borderColor: '#002233',
        paddingRight: 18,
        borderRadius: 10,
        backgroundColor: '#F9F9F9',
        height: 60,
        borderWidth: 1,
    }, 
    colorBtn: {
        marginTop: 15,
        borderColor: '#003F72',
        backgroundColor: '#003F72',
        padding: 20,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
    },
    colorTxtBtn: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
      },
    colorTxtBtnRegistro: {
        color: '#FF9116',
        fontSize: 14,
        textAlign: 'center',
        width: 200,
        right:8,
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginBottom: 20,
        marginLeft: 20
    },
});

export default styles;