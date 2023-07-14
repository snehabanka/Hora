import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    image: {
        flex: 0.4,
        alignSelf: 'stretch',
        width: Dimensions.get('window').width,
        marginBottom: 20
    },
    container: {
        flex: 1
    },
    text1: {
        font: 16,
        color: '#414141',
        marginLeft: 36,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    text2: {
        font: 14,
        color: '#414141',
        marginLeft: 36,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    input: {
        height: 40,

        justifyContent: 'center'

    },
    prefix: {
        font: 14,
        fontWeight: 'bold',
        color: '#414141'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 42,
        marginHorizontal: 36,
        borderColor: '#545454',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 10
    },
    button: {
        height: 42,
        borderRadius: 6,
        backgroundColor: '#E56352',
        marginHorizontal: 36,
        justifyContent: 'center'


    },
    buttonText: {
        textAlign: 'center', // Center the text horizontally
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',



    },
    
      otpContainer: {
        flexDirection: 'row',
        marginHorizontal:36
     
    },
      otpInput: {
        width: 70,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 7,
        fontSize: 24,
        textAlign: 'center'
      },
    },
    
    );
    

export default styles;