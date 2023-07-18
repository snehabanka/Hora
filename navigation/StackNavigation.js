import React from 'react';
import { useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomHeader from '../components/CustomeHeader';
import Splash from '../screens/splash/splash'
import Home from '../screens/home/Home';
import Login from '../screens/login/Login'
import MyAccount from '../screens/myaccount/MyAccount'
// import Refer from '../screens/refer/Refer';

const Stack = createNativeStackNavigator();


const StackNavigation = () => {
  return (
  <Stack.Navigator
    screenOptions={{
      header: ({ route }) => {
        return <CustomHeader title={route.name} />;
      },
    }}
    initialRouteName='Splash'
  >
    <Stack.Screen name="MyAccount" component={MyAccount} options={{headerShown:true}}/>
      <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown:true}} />
      {/* <Stack.Screen name="Refer" component={Refer} options={{headerShown:true}} /> */}


    {/* Add other screens here */}
  </Stack.Navigator>
);
};
export default StackNavigation;
  