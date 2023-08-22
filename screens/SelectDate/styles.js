
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
    view2: { flexDirection: 'row',marginStart:16 ,marginTop:4},
    order: {height:24,width:24,marginLeft:16},
    time: {height:24,width:24,marginLeft:24},
    dish:{height:24,width:24,marginLeft:15},
    separator1:{height:1,width:70,marginTop:10,marginLeft:5},
    separator2:{height:1,width:70,marginTop:10,marginStart:-15},
    verticalSeparator:{
        height:1,
        width:295
      },
      text:{
        
      },
      activeTab: {
        fontWeight: '500',
        color: '#823D9D', 
        fontSize:13
      },
      inactiveTab: {
        color: '#969696', 
        fontSize:13,
        fontWeight:'500'
      },
      tabSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      gridContainer: {
        padding: 10,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop:13
      },
      showAllText: {
        color: '#9252AA',
      },
      burner:{
        width:40,
        height:40,
        marginTop:5,
        marginStart:6
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
      buttonText1: {
        color: 'white',
        fontWeight:'500',
        fontSize: 18,
      },

})
export default styles;