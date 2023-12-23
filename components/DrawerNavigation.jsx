import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Contact from '../screens/contact/Contact';
import Profile from '../screens/profile/Profile';
import Orderlist from '../screens/orderlist/Orderlist';
import OrderDetails from '../screens/orderdetails/OrderDetails';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';

const Drawer = createDrawerNavigator();

const UserInfo = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  let base_url = 'https://horaservices.com:3000';

  useEffect(() => {
    fetchContactDetail();
  }, []);

  

  async function fetchContactDetail() {
    try {
      const response = await fetch(base_url + '/api/setting/details');
      const responseData = await response.json();
      const contactData = responseData.data;
      const phone = '+91' + ' ' + contactData.phone;
      setEmail(contactData.email);
      setMobileNumber(phone);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.profileimagesec}>
      <Image
        source={require('../assets/profile.png')}
        style={styles.profileimage}
      />
      <Text style={styles.profileText}>{'User - 91233333000'}</Text>
      <Text style={styles.profileText}>{email}</Text>
      <Text style={styles.profileText}>{mobileNumber}</Text>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <View style={styles.drawerContent}>
      <UserInfo />
      <DrawerContentScrollView {...props}>
        <DrawerItemList
          {...props}
          itemStyle={styles.drawerItem}
          labelStyle={styles.drawerLabel}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerPosition="right"
      drawerType="slide"
      headerMode = "none"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 230,
          paddingTop:10,
          paddingLeft:10,
          paddingRight:10
        },
        drawerActiveTintColor: '#fff',
        drawerActiveBackgroundColor: '#9252AA',
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '600',
        },
        drawerItemStyle: {
          marginLeft: 0,
          paddingLeft: 0,
          fontWeight: '900',
          color: 'red',
        },
        drawerLabelStyle: {
          color: '#000',
          fontSize: 16,
          fontWeight: '600',
          marginLeft: 0,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={
          {
            headerShown:false
          }
        }
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../assets/Profilemenu.png')}
              style={{ height: 24, width: 24 }}
            />
          ),
          headerShown:false
        }}
      />
      <Drawer.Screen
        name="My Order"
        component={Orderlist}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../assets/Document.png')}
              style={{ height: 20, width: 20 }}
            />
          ),
          headerShown:false
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../assets/Message.png')}
              style={{ height: 24, width: 24 }}
            />
          ),
          headerShown:false
        }
      }
      />
       
      <Drawer.Screen
        name="Order Details"
        component={OrderDetails}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../assets/Helps.png')}
              style={{ height: 24, width: 24 }}
            />
          ),
          headerShown:false
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  profileimagesec: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#9252AA',
  },
  profileimage: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  profileText: {
    color: '#9EA1B1',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  drawerItem: {
    marginLeft: 0,
    paddingLeft: 0,
    fontWeight: '900',
    color: 'red',
  },
  drawerLabel: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 0,
  },
});

export default DrawerNavigation;