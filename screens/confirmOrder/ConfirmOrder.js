import React from 'react';
import { Dimensions,View, Text, TouchableOpacity, StatusBar,Image, StyleSheet,TouchableHighlight } from 'react-native';

const ConfirmOrder = ({navigation}) => {

  const handleOpenBottomSheet = () => {
    navigation.navigate('AddAddress')
  }
    
  const trackorder =() => {
    navigation.navigate('ConfirmLocation',{'data':null})
  }
  
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Image source={require('../../assets/confirmorder_image.png')} style={styles.image} />
      <Text style={styles.firstText}>Your order is confirmed!</Text>
      <Text style={styles.multilineText}>
      Your chef will contact 5 hours before the schedules time. Have a great fest!
      </Text>

      <TouchableOpacity onPress={() => trackorder()} style={styles.clickableText}>
        <Text style={styles.clickableText}>Track Order</Text>
      </TouchableOpacity>

      <Text style={styles.normalText}>Need help? Call us.</Text>
     <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',}}>
      <TouchableHighlight onPress={() => handleOpenBottomSheet()} style={styles.customButton} underlayColor="transparent" activeOpacity={1}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: Dimensions.get('window').width - 32, // Adjust margin
  height: 390, // Adjust height based on aspect ratio
  marginHorizontal: 16,
  marginTop: 25,

  },
  firstText: {
    fontSize: 24,
    color:'#3E4462',
    fontWeight: '500',
    marginTop:25,
    maxWidth: Dimensions.get('window').width - 40,
  },
  multilineText: {
    textAlign: 'center',
    fontSize:12,
    fontWeight:'400',
    color:'#7E7E7E',
    marginTop: 11,
    maxWidth: Dimensions.get('window').width - 90,
  },
  clickableText: {
    textDecorationLine: 'underline',
    color: '#9252AA',
    marginTop:11,
    fontSize:16,
    fontWeight:"700"
  },
  normalText: {
    fontSize: 16,
    fontWeight:'700',
    color:"#000000",
    marginTop:20,
  },
  customButton: {
    height:57,
    width:Dimensions.get('window').width * 0.8,
    backgroundColor: '#9252AA',
    marginHorizontal:32,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight:'500',
    fontSize: 18,
  },
});

export default ConfirmOrder;
