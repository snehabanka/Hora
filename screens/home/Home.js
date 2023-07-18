import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, BackHandler, Button } from 'react-native';
import Login from '../login/Login';
import styles from '../home/styles';
import CustomStatusBar from '../../components/CustomStatusBar';

const Home = ({navigation}) => {

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


  
  return (
    <View>
      <CustomStatusBar/>
    <Text>jnjdncjd</Text>  
     </View>
  )}

export default Home;
