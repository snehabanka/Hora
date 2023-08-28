import React from 'react';
import { useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomHeader from '../components/CustomeHeader';
import Splash from '../screens/splash/splash'
import Home from '../screens/home/Home';
import Login from '../screens/login/Login'
import MyAccount from '../screens/myaccount/MyAccount'
import OrderHistory from '../screens/orderhistory/OrderHistory';
import CreateOrder from '../screens/createorder/CreateOrder';
import ConfirmOrder from '../screens/confirmOrder/ConfirmOrder';
import ConfirmLocation from '../screens/confirmlocation/ConfirmLocation';
import SelectDate from '../screens/SelectDate/SelectDate';
import ConfirmDishOrder from '../screens/confirmdishorder/ConfirmDishOrder';
import Onboarding from '../screens/Onboarding/Onboarding';

const Stack = createNativeStackNavigator();


const StackNavigation = () => {
  return (
  <Stack.Navigator
    screenOptions={{
      header: ({ route }) => {
        return <CustomHeader title={route.name} />;
      },
    }}
    initialRouteName='Login'
  >
    <Stack.Screen name="MyAccount" component={MyAccount} options={{headerShown:true}}/>
      <Stack.Screen name="Splash" component={Splash} options={{headerShown:true}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown:true}} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} options={{headerShown:true}} />
      <Stack.Screen name="CreateOrder" component={CreateOrder} options={{headerShown:true}} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} options={{headerShown:true}} />
      <Stack.Screen name="ConfirmLocation" component={ConfirmLocation} options={{headerShown:true}} />
      <Stack.Screen name="SelectDate" component={SelectDate} options={{headerShown:true}} />
      <Stack.Screen name="ConfirmDishOrder" component={ConfirmDishOrder} options={{headerShown:true}} />
      <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown:true}} />
      <Stack.Screen name="Contact" component={Onboarding} options={{headerShown:true}} />

      {/* <Stack.Screen name="Refer" component={Refer} options={{headerShown:true}} /> */}


    {/* Add other screens here */}
  </Stack.Navigator>
);
};
export default StackNavigation;
  