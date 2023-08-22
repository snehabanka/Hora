import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    view1: { flexDirection: 'row', backgroundColor: '#EFF0F3',elevation:2,width:Dimensions.get('window').width},
    text1: { color: '#676767', fontSize: 12, fontWeight: '400', paddingVertical:5 ,marginStart:8},
    image1: { width: 16, height: 16, marginLeft: 16, marginTop: 5,marginBottom:5},
    view2: { flexDirection: 'row',marginEnd:21,marginStart:16 ,marginTop:15},
    image2: { height: 36, width: 47},
    image3: { height: 2, width: 80, marginLeft: 20, marginTop:15 },
    image4: {},
    image5: {},
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
        marginTop:15,
      },
      button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 24,
        borderWidth:1,
        borderColor:'#A0A5B'
      },
      selectedButton: {
        backgroundColor: '#9252AA', // Change to the desired highlight color
      },
      buttonText: {
        fontSize: 16,
      },
      selectedButtonText: {
        color: 'white', // Change to the desired highlight text color
      },
      button1: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      selectedButton1: {
        backgroundColor: 'green', // Change to the desired highlight color
      },
      buttonText1: {
        fontSize: 16,
      },
      selectedButtonText1: {
        color: 'white', // Change to the desired highlight text color
      },
      container1: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
      },
      bottomSheetContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 12,
        paddingTop:52
  
      },
      bottomSheetWrapper: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      draggableIcon: {
        backgroundColor: '#000',
      },
      buttonText1: {
        color: 'white',
        fontWeight:'500',
        fontSize: 18,
      },
      customButton: {
        height:57,
        width:Dimensions.get('window').width * 0.9,
        backgroundColor: '#9252AA',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 20,
      },
      textContainer: {
        width: '33%',
        paddingVertical:5,
        paddingHorizontal:4,
        borderRadius:3,
        backgroundColor: 'rgba(146, 82, 170, 0.37)',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:5
      },
      text: {
        fontSize: 12,
        fontWeight: '400',
        color: '#4B4B4B',
      },
      container: {
        padding: 4, // Adds spacing between rows
      },
      columnWrapper: {
        justifyContent: 'space-between', // Adds spacing between columns
        padding:2
      },
      verticalSeparator:{
        marginStart:39,
        height:1,
        width:Dimensions.get('window').width*.8,
        marginTop:9
      },
      cuisineContainer: {
        padding: 2,
        marginTop:10
      },
      cuisineColumnWrapper: {
        justifyContent: 'space-between', // Adds spacing between columns
        marginBottom:10,
      },
      dishContainer: {
      },
      dishColumnWrapper: {
        justifyContent: 'space-between',
      },
      bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        alignItems: 'center',
    },
    continueButton: {
      width:Dimensions.get('window').width * 0.9,
      backgroundColor: '#9252AA',
      justifyContent:'center',
      paddingLeft:5,
      paddingVertical:17,
      borderRadius: 20,
      marginBottom:15
    },
    order: {height:24,width:24,marginLeft:16},
    time: {height:24,width:24,marginLeft:24},
    dish:{height:24,width:24,marginLeft:15},
    separator1:{height:1,width:70,marginTop:10,marginLeft:5},
    separator2:{height:1,width:70,marginTop:10,marginStart:-15},






})

export default styles;