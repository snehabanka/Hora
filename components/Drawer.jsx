import React  , { useState , useEffect } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Contact from '../screens/contact/Contact';
import Profile from '../screens/profile/Profile';
import Orderlist from '../screens/orderlist/Orderlist';
import OrderDetails from '../screens/orderdetails/OrderDetails';
import { NavigationContainer } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
  console.log("inside drawer")
const UserInfo = () => {

  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  let base_url = 'https://horaservices.com:3000'
  useEffect(() => {
    fetchContactDetail();
  }, [])

  async function fetchContactDetail() {
    try {
      const response = await fetch(base_url + '/api/setting/details');
      const responseData = await response.json();
      const contactData = responseData.data
      const phone = "+91" + " " + contactData.phone
      setEmail(contactData.email)
      setMobileNumber(phone)
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.profileimagesec}>
    {  console.log("inside drawer return1")}
      <Image source={require('../assets/profile.png')} style={styles.profileimage} />
      <Text
        style={{
          color: "#9252AA",
          fontSize: 20,
          fontWeight: "700",
          paddingTop: 5,
          paddingBottom: 0
        }}>{'User - 91233333000'}</Text>
      <Text style={{ color: "#9EA1B1", fontSize: 14, fontWeight: "500" }}>{email}</Text>
      <Text style={{ color: "#9EA1B1", fontSize: 14, fontWeight: "500" }}>{mobileNumber}</Text>
    </View>
  )
}

const CustomDrawerContent = (props) => {
  return (
    <View>
       {  console.log("inside drawer return1")}
      <UserInfo />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}
          itemStyle={styles.drawerItem}
          labelStyle={styles.drawerLabel}
        />
      </DrawerContentScrollView>
    </View>
  )
}


const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
    drawerPosition="left"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 200,
          paddingTop: 30,
          // overlayColor: 'transparent',
          position: "fixed",
          paddingLeft: 18
        },
        drawerActiveTintColor: "#fff",
        drawerActiveColor: "#fff",
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "600"
        },
        drawerItemStyle: {
          marginLeft: 0,
          paddingLeft: 0,
          fontWeight: "900",
          color: "#fff"
        },
        drawerLabelStyle: {
          color: "#000",
          // backgroundColor: "red",
          fontSize: 16,
          fontWeight: "600",
          marginLeft: 0
        }
      }}

      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
       {  console.log("inside drawer return2")}
      
      <Drawer.Screen 
      name="Profile" component={Profile}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../assets/Profilemenu.png')}
              style={{ height: 24, width: 24 }}
            />
          )
        }}
      />
      {/* <Drawer.Screen name="My Order" component={Orderlist}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../assets/Document.png')}
              style={{ height: 20, width: 20 }}
            />
          )
        }} />
      <Drawer.Screen name="Contact" component={Contact}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../assets/Message.png')}
              style={{ height: 24, width: 24 }}
            />
          )
        }}
      />
      <Drawer.Screen name="Order Details" component={OrderDetails}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../assets/Helps.png')}
              style={{ height: 24, width: 24 }}
            />
          )
        }}
      /> */}
    </Drawer.Navigator>
    
  );
};

const styles = StyleSheet.create({
  profileimagesec: {
    paddingLeft: 0,
    paddingBottom: 12
  },
  profileimage: {
    width: 100,
    height: 100,
    marginTop: 0,
    marginBottom: 15,
    // border: "3px solid #9252AA",
    // borderRadius: "50%"
  }
})

export default DrawerNavigation;
