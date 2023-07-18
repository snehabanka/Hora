import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    image: {
        alignSelf: 'stretch',
        height: Dimensions.get('window').width * (19 / 16),
        width: Dimensions.get('window').width,
        marginBottom: 40
    },
    container: {
        flex: 1
    },
    text1: {
        fontSize: 18,
        color: '#000',
        marginLeft: 36,
        marginBottom: 31,
        fontWeight: '700'
    },
    text2: {
        fontSize: 14,
        color: '#414141',
        marginLeft: 36,
        fontWeight: '500'
    },
    text3: {
        fontSize: 14,
        color: '#414141',
        marginLeft: 36,
        marginTop:2,
        fontWeight: '400',
        opacity: 0.6000000238418579

    },
    text4: {
        fontSize: 14,
        color: '#414141',
        marginLeft:8,
        marginTop:2,
        fontWeight: '600',
        opacity: 0.6000000238418579
    },
    

    input: {
        fontSize:14,
        fontWeight:'500',
        justifyContent: 'center'

    },
    prefix: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#414141',
        paddingLeft:10
    
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginLeft: 34,
        marginRight:26,
        paddingHorizontal: 2,
        marginTop:-10,
        marginBottom: 95},

        borderWithOpacity: {
            flex: 1,
            flexDirection:'row',
            borderColor: 'rgba(84, 84, 84, 0.35)', // Set the border color with the desired opacity
            borderWidth: 1,
            borderRadius: 8
          
    },
    button: {
        height: 50,
        borderRadius: 6,
        backgroundColor: '#E56352',
        marginLeft: 36,
        marginRight:26,
        justifyContent: 'center',
        alignItems:'center',
    },

    buttonText: {
        alignItems:'center',
        justifyContent:'center',
        color: '#FFF',
        fontSize: 13,
        fontWeight: '600',
    },
    buttonText1: {
        justifyContent:'center',
        color: '#8A8A8A',
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 261,
        
    },
    
      otpContainer: {
        flexDirection: 'row',
        marginLeft:32,
        marginTop:20,
        marginBottom:10
     
    },
      otpInput: {
        width: 60,
        height: 42,
        borderColor: '#545454',
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 7,
        fontSize: 19,
        textAlign: 'center',
        opacity: 0.800000011920929,
        color:'#292929',
        fontWeight:'500'
      },
      invalidOtpText:{
        fontSize:14,
        color:'#C61B1B',
        marginLeft:38,
        marginTop:-20,
        fontWeight:'800',
        opacity: 0.6000000238418579
      },
      timerText:{
        fontSize:13,
        fontWeight:'400',
        color:'#8A8A8A',
        marginLeft:210,
        justifyContent: 'flex-end',

      }
    },
    
    );
    

export default styles;