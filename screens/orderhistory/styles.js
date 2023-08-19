import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        backgroundColor: '#000000'
    },
    imageBackground: {
        height: 145,
        width: 'auto',
        marginHorizontal: 24,
        marginTop: 21
    },
    container: {
        flexDirection: 'column',
    },
    button: {
        height: 13,
        width: 59,
        borderRadius: 10,
        backgroundColor: '#56AA54',
        marginTop: 15,
        marginLeft: 20,
        alignItems: 'center'
    },
    text1: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '400',
        marginBottom: '5'
    },
    text2: {
        color: '#000',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 20,
        marginBottom: '5'

    },
    text3: {
        color: '#414141',
        fontSize: 13, fontWeight: '500', marginLeft: 20,
        marginBottom: '5'
    },
    line1: { marginLeft: 81, marginBottom: 56 },
    icon: { height: 9, width: 9, marginLeft: 8 },
    textContainer: { flexDirection: 'row' },
    textView1: { flexDirection: 'column' },
    textView2: { flexDirection: 'column' },
    texticon: { flexDirection: 'row' },
    line2:{},
    buttonContainer: { flexDirection: 'row' },
    button1:{
       width:58,
       height:26,
       borderRadius:6,
       borderWidth:1,
       borderColor:'#F46C5B',
       backgroundColor:'transparent'
    },
    buttonText1:{color:'#F46C5B',fontSize:12,fontWeight:'500'},

})

export default styles;