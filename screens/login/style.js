import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    image: {
        flex: 0.5,
        alignSelf: 'stretch',
        width: Dimensions.get('window').width,
        marginBottom: 20
    },
    container: {
        flex: 1
    },
    text1: {
        font: 18,
        color: '#414141',
        marginLeft: 36,
        marginBottom: 25,
        fontWeight: '700'
    },
    text2: {
        font: 14,
        color: '#414141',
        marginLeft: 36,
        marginBottom:11,
        fontWeight: '500'
    },
    input: {
        height: 40,
        justifyContent: 'center'

    },
    prefix: {
        fontSize: 14,
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
        marginHorizontal:36,
        marginBottom:10
     
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
      invalidOtpText:{
        fontSize:14,
        color:'#C61B1B',
        marginLeft:36
      },
      timerText:{
        fontSize:13,
        color:'#8A8A8A',
        marginEnd:36,
        justifyContent: 'flex-end',

      }
    },
    
    );
    

export default styles;