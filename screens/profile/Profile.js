import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

const Profile= () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile data on component mount
  }, []);

  const fetchUserProfile = async () => {
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

  const handleEditProfile = async () => {
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
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder="Mobile Number"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <Button title="Edit Profile" onPress={ navigation.navigate('Home')} />
    </View>
  );
};

export default Profile;
