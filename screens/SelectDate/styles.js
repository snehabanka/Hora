
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        marginHorizontal:16,
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
    verticalSeparator:{
        marginStart:20,
        height:1,
        width:Dimensions.get('window').width*.8,
        marginTop:9,
        marginEnd:11
      },
      text:{
        
      },
      activeTab: {
        fontWeight: 'bold',
        color: 'blue', 
      },
      inactiveTab: {
        color: 'gray', 
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
        marginTop: 16,
        marginBottom: 8,
      },
      showAllText: {
        color: 'blue', // Customize the color
      },

})
export default styles;