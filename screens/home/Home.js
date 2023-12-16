import React from 'react';
import { useEffect,useState } from 'react';
import { View, Text, StyleSheet, Image, BackHandler, Button,TouchableOpacity } from 'react-native';
import Login from '../login/Login';
import styles from '../home/styles';
import CustomStatusBar from '../../components/CustomStatusBar';
import { Dimensions } from 'react-native';
// import CardSlider from '../dialog/CardSlider';

const Home = ({ navigation }) => {

  const [showTrackOrder, setShowTrackOrder] = useState(true);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // Close the app
      return true; // Prevent default back button behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
    };
  }, []);

  const cardData = [
    require('../../assets/minus.png'),
    require('../../assets/minus.png'),
    require('../../assets/minus.png'),
  ];

  const toggleTrackOrderVisibility = () => {
    setShowTrackOrder(!showTrackOrder);
};


  return (

    <View style={{ flex: 1, flexDirection: 'column' }}>

      <View style={{ alignContent: 'center', justifyContent: 'center' }}>

        <Text style={{ paddingTop: 4, color: 'black', fontWeight: '800', fontSize: 16 }}>
          <Text style={{ color: '#9252AA' }}>personal chef</Text> is in different color and rest is in different color
        </Text>

        <Text style={{ fontSize: 12, fontWeight: '400', color: '#8C8C8C' }}>
          HORA makes your parties easier and effortless as we provide magical cooks
        </Text>
      </View>
      <Image source={require('../../assets/cook.png')} style={{ marginTop: 12,justifyContent:'center', height: 66, width:66 }} />

      <Text style={{ paddingTop: 4, color: 'black', fontWeight: '800', fontSize: 16 }}>
          <Text style={{ color: '#9252AA' }}>Most Served</Text> Dishes?
        </Text>

        <View style={{justifyContent:'center',width:138,alignItems:'center'}}>

        <TouchableOpacity style={{backgroundColor:'#9252AA',borderRadius:8,paddingHorizontal:18,paddingVertical:9}}>

          <Text style={{fontSize:16,fontWeight:'400',color:'white'}}>See All Dishes</Text>

        </TouchableOpacity>

        </View>
{/* 
        <CardSlider data={cardData} /> */}
        {showTrackOrder && 

        <View style={{ borderColor: "#F39200", borderWidth: 0.5, borderRadius: 5, backgroundColor: "#FFE3B9", marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Image source={require('../../assets/orderIcon.png')} style={{ height: 28, width: 30, marginStart: 5, marginTop: 5, marginBottom: 7 }} />
                        <Text style={{ marginStart: 9, color: '#606060', fontSize: 13, fontWeight: '400' }} >Expected cooking time of your food</Text>

                        <View style={{ marginStart: 5, backgroundColor: "#FFD1B7", borderRadius: 7, justifyContent: 'center', padding: 6 }}>
                            <Text style={{ color: '#5F5C59', fontWeight: '700', fontSize: 13 }}>
                               Hrs
                            </Text>
                        </View>

                        <TouchableOpacity style={{ marginStart: 3 }} onPress={toggleTrackOrderVisibility} activeOpacity={1}>
                            <Image source={require('../../assets/icCross.png')} style={{ height: 12, width: 12 }} />
                        </TouchableOpacity>
                    </View>
}

    </View>


    // <View style={{flex:1,flexDirection:'column',borderColor:"rgba(228, 231, 255, 0.10)",borderRadius:5,height:363,width:Dimensions.get("window").width*0.9}}>

    //   <View style={{backgroundColor:'#9252AA',width:20,flexDirection:'row'}}>
    //     <Text>mkmk</Text>

    //   </View>



    //     <View style={{flexDirection:'row'}}>

    //       <Text style={{fontSize:9,fontWeight:'300',color:'black'}}>Items to procure</Text>
    //       <TouchableOpacity style={{backgroundColor:'#9252AA'}}>

    //         <Text style={{color:'white'}}>See List</Text>

    //       </TouchableOpacity>

    //     </View>

    // </View>



  )
}

export default Home;
