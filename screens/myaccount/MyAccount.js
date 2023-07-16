import React from 'react';
import { useState, useEffect } from 'react';
import {ScrollView, View, Text, Image, TextInput, TouchableHighlight, Button, ImageBackground, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import styles from './styles'
import CustomStatusBar from '../../components/CustomStatusBar';

const MyAccount = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // fetchUserAccount(); // Fetch user profile data on component mount
  }, []);

  const fetchUserAccount = async () => {
    try {
      const response = await axios.get('API_ENDPOINT'); // Replace with your API endpoint
      const userData = response.data;

      setName(userData.name);
      setMobileNumber(userData.mobileNumber);
      setEmail(userData.email);
    } catch (error) {
      console.log('Error fetching user profile:', error);
    }
  };

  const handleEditAccount = async () => {
    try {
      const response = await axios.post('API_ENDPOINT', {
        name,
        mobileNumber,
        email,
      }); // Replace with your API endpoint for updating user profile

      // Handle success response
      console.log('Profile updated successfully');
    } catch (error) {
      // Handle error response
      console.log('Error updating profile:', error);
    }
  };

  return (
    <View>
       <CustomStatusBar/>
      <View style={styles.contentContainer} >
        <ImageBackground source={require('../../assets/Rectangle.png')} style={{ ...styles.backgroundImage, marginTop: 54 }}>
          <View style={styles.contentContainer1} >
            <Text style={styles.text}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              // placeholderTextColor="transparent"
              style={styles.textInput} />
          </View>
        </ImageBackground>
        <Image source={require('../../assets/name.png')} style={{ ...styles.iconImage, marginTop: 57 }} />

      </View>


      <View style={styles.contentContainer} >
        <ImageBackground source={require('../../assets/Rectangle.png')} style={{ ...styles.backgroundImage, marginTop: 25 }}>
          <View style={styles.contentContainer1} >
            <Text style={styles.text}>Contact Number</Text>
            <TextInput
              value={mobileNumber}
              onChangeText={setMobileNumber}
              placeholder="Enter your number"
              // placeholderTextColor="transparent"
              style={styles.textInput} />
          </View>
        </ImageBackground>
        <Image source={require('../../assets/name.png')} style={{ ...styles.iconImage, marginTop: 28 }} />

      </View>
      <View style={styles.contentContainer} >
        <ImageBackground source={require('../../assets/Rectangle.png')} style={{ ...styles.backgroundImage, marginTop: 25 }}>
          <View style={styles.contentContainer1} >
            <Text style={styles.text}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              // placeholderTextColor="transparent"
              style={styles.textInput} />
          </View>
        </ImageBackground>
        <Image source={require('../../assets/name.png')} style={{ ...styles.iconImage, marginTop: 28 }} />
      </View>

      <TouchableHighlight style={styles.button} onPress={handleEditAccount} underlayColor="#E56352">
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableHighlight>
      </View>
  );
};

export default MyAccount;
