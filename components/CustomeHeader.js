import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';


const CustomHeader = ({ title }) => {

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <LinearGradient
      colors={['#6730B2', '#EE7464']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerContainer}
    >
      <Pressable onPress={handleBackPress}>
      <Image source={require('../assets/back_arrow.png')}  style={styles.image}/>
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:36,
    height:64
  },
  headerTitle: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
    marginLeft:-5
    

  },
  image:{
    height:60,
    width:60,
    marginLeft:8,
    marginTop:15
  }
});

export default CustomHeader;
