import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const CustomHeader = ({ title }) => {

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={handleBackPress}>
      <Image source={require('../assets/backArrow.png')}  style={styles.image}/>
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor:'#6730B2',
    flexDirection:'row',
    height: 114,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    marginLeft:12,
    marginVertical:44

  },
  image:{
    height:20,
    width:13,
    marginLeft:15,
    marginVertical:46
  }
});

export default CustomHeader;
