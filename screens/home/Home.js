import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Image, BackHandler, TouchableOpacity, ScrollView } from 'react-native';
import CarouselComponent from '../dialog/CarouselComponent';
import CustomHeader from '../../components/CustomeHeader';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import PhonePePaymentSDK from 'react-native-phonepe-pg'


const Home = ({ navigation }) => {
  const [decCat, setDecCat] = useState([
    { image: require('../../assets/Birthday_dec_cat.jpg'), name: 'Birthday' },
    { image: require('../../assets/first_night_cat_dec.jpg'), name: 'First Night' },
    { image: require('../../assets/aniversary_Cat_Dec.jpg'), name: 'Anniversary' },
    { image: require('../../assets/kids_birthday_decoration.jpg'), name: 'Kids Birthday' },
    { image: require('../../assets/baby-shower-dec-cat.jpg'), name: 'Baby Shower' },
    { image: require('../../assets/welcome_baby_dec.jpg'), name: 'Welcome Baby' },
  ]);

  const openCatItems = (category) => {
    // Replace spaces with dashes in the category name
    // const categoryNameWithDashes = category.name.replace(/\s+/g, '-');
    navigation.navigate('DecorationCatCollection', { category });

  };

  const [currentAddress, setCurrentAddress] = useState(null);

  const bookNowData = [
    { id: '1', image: require('../../assets/burner.png') },
    { id: '2', image: require('../../assets/burner.png') },
    { id: '3', image: require('../../assets/burner.png') }
  ];

  const popularDishes = [
    { id: '1', image: require('../../assets/burner.png') },
    { id: '2', image: require('../../assets/burner.png') },
    { id: '3', image: require('../../assets/burner.png') }
  ];

  const desertsData = [
    { id: '1', image: require('../../assets/burner.png') },
    { id: '2', image: require('../../assets/burner.png') },
    { id: '3', image: require('../../assets/burner.png') }
  ];

  const reviewData = [
    { id: '1', image: require('../../assets/burner.png') },
    { id: '2', image: require('../../assets/burner.png') },
    { id: '3', image: require('../../assets/burner.png') }
  ];

  const openCreateOrder = () =>{
        navigation.navigate('DecorationCatCollection', { category });
  }

  // const GOOGLE_MAP_KEY = "AIzaSyBmHupwMPDVmKEryBTT9LlIeQITS3olFeY"


  // useEffect(() => {
  //   const backAction = () => {
  //     BackHandler.exitApp();
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () => {
  //     backHandler.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   Geocoder.init(GOOGLE_MAP_KEY);
  //   initPaymentSdk()
  //   checkAndRequestLocationPermission();
  // }, []);

  // const checkAndRequestLocationPermission = async () => {
  //   try {
  //     const permissionResult = await check(
  //       Platform.OS === 'ios'
  //         ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  //         : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  //     );

  //     if (permissionResult === RESULTS.GRANTED) {
  //       getCurrentLocation();
  //     } else {
  //       requestLocationPermission();
  //     }
  //   } catch (error) {
  //     console.error('Error checking location permission:', error);
  //   }
  // };

  // const requestLocationPermission = async () => {
  //   try {
  //     const permissionResult = await request(
  //       Platform.OS === 'ios'
  //         ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  //         : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  //     );

  //     if (permissionResult === RESULTS.GRANTED) {
  //       getCurrentLocation();
  //     } else {
  //       console.warn('Location permission denied');
  //     }
  //   } catch (error) {
  //     console.error('Error requesting location permission:', error);
  //   }
  // };


  // const getCurrentLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       Geocoder.from(latitude, longitude)
  //         .then((response) => {
  //           const address = response.results[0].formatted_address;
  //           setCurrentAddress(address);
  //         })
  //         .catch((error) => console.warn('Error fetching location address:', error));
  //     },
  //     (error) => console.log('Error getting current location:', error),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );
  // };


  // const initPaymentSdk = () => {
  //   PhonePePaymentSDK.init(
  //     "PRODUCTION",
  //     "HORAONLINE",
  //     "appId",
  //     true
  //     ).then(result => {
  //       console.warn("Payment Sdk $result")
  //   })
  // }


  // const startPayment = () => {
  //   const request = {
  //     "merchantId": "PRODUCTION",
  //     "merchantTransactionId": "MT7850590068188104",
  //     "merchantUserId": "MUID123",
  //     "amount": 1,
  //     "callbackUrl": "https://webhook.site/1995bfbd-46d5-418b-a1ba-82bd39db1bdb",
  //     "mobileNumber": "9999999999",
  //     "paymentInstrument": {
  //       "type": "PAY_PAGE"
  //     }
  //   }
  //   const apiEndPoint = "/pg/v1/pay";
  //   const jsonString = JSON.stringify(jsonObject);
  //   const base64Request = Buffer.from(jsonString).toString('base64');
  //   const saltKey ="c2881f25-dc78-4aaa-a08d-d0f5c913b40d";
  //   const checksum = sha256(base64Request + apiEndPoint + saltKey) + "###" + 1;

  // }



  // PhonePePaymentSDK.startPGTransaction(
  //   requestBody,
  //   checksum,
  //   dropDownValue,
  //   headers,
  //   packageName,
  //   callbackURL
  // ).then( a => {
  //   console.log(a)
  // })

  return (
    <ScrollView style={styles.container}>
      <CustomHeader title={"Home"} navigation={navigation} />
      <CarouselComponent data={bookNowData} />

      <View style={styles.decContainer}>
        {decCat.map(({ image, name }, index) => (
          <Pressable key={index} onPress={() => openCatItems(name)} style={styles.decImageContainer}>
            <Image source={image} style={styles.decCatimage} />
          </Pressable>
        ))}
      </View>

      <View style={{ marginStart: 16, marginTop: 16 }}>
        <Text>
          <Text style={styles.normalText}>Most Popular </Text>
          <Text style={styles.dishesText}>Dishes</Text>
        </Text>
      </View>
      {/* popular dishes section */}
      <CarouselComponent data={popularDishes} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.customButton} activeOpacity={1} onPress={openCreateOrder}>
          <Text style={styles.buttonText}> Book Now</Text>
        </TouchableOpacity>

        {/*How does it works section */}
        <Image
          source={require('../../assets/burner.png')}
          style={{ height: 48, width: 54, marginTop: 10 }}
        />
        <Text style={{ marginTop: 9 }}>
          <Text style={styles.normalText}>{currentAddress} </Text>
          <Text style={styles.dishesText}>it Works?</Text>
        </Text>
      </View>
          {/* desiset section */}
      <CarouselComponent data={desertsData} />
      <View>
      </View>
          {/* celebrate section */}
      <Image
        source={require('../../assets/celebrate.png')}
        style={{ height: 496, width: Dimensions.get('window').width, marginTop: 10 }}
      />
      <CarouselComponent data={reviewData} />
      {/* why hora */}
      <Image
        source={require('../../assets/whyHora.png')}
        style={{ height: 534, width: Dimensions.get('window').width, marginTop: 10 }}
      />


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  normalText: { color: '#323643', fontSize: 14, fontWeight: '600' },
  dishesText: { color: '#9252AA', fontSize: 14, fontWeight: '600' },
  customButton: {
    height: 34,
    width: 138,
    marginTop: 10,
    backgroundColor: '#9252AA',
    marginHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  decContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  decImageContainer: {
    width: '30%', // Adjust as needed
    aspectRatio: 1, // Maintain the aspect ratio of the images
    marginBottom: 10,
  },
  decCatimage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default Home;

