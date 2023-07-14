import React, { useEffect } from 'react';
import { View, Text,Image, StyleSheet,Dimensions } from 'react-native';
import styles from './styles';

const Splash = ({ navigation }) => {
  useEffect(() => {
    // Wait for 5 seconds and then navigate to HomeScreen
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);

    return () => clearTimeout(timer); // Clear the timeout when the component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/splash.png')} style={styles.image} />
    </View>
  );
};

export default Splash;