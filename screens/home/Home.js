import React from 'react';
import { useEffect,useState } from 'react';
import { ScrollView,View, Text, StyleSheet, Image, BackHandler, Button,TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import CustomHeader from '../../components/CustomeHeader';
import CarouselComponent from '../dialog/CarouselComponent';
import Geocoder from 'react-native-geocoding';
import { RESULTS,request,PERMISSIONS ,check} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { BASE_URL, API_SUCCESS_CODE, LATEST_ORDER_DETAILS } from '../../utils/ApiConstants';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';

const Home = ({ navigation }) => {

  const [currentAddress, setCurrentAddress] = useState(null);
  const title = currentAddress ? currentAddress : 'Home';
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrderData();
    Geocoder.init(GOOGLE_MAP_KEY);
    checkAndRequestLocationPermission();
  }, []);

  const fetchOrderData = async () => {
    try {
        const url = BASE_URL + LATEST_ORDER_DETAILS;
        const response = await axios.post(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status == API_SUCCESS_CODE) {
          setApiData(response.data.data.order);
          console.log('length:',response.data.data.order.length);
          console.log('data:',response.data.data.order);
         setIsLoading(false);
        }
    } catch (error) {
      setIsLoading(false);
      console.log('Error Fetching Data:', error.message);
    }
}

  const bookNowData = [
    { id: '1', image: require('../../assets/bookNow.png') },
    { id: '2', image: require('../../assets/bookNow.png') },
    { id: '3', image: require('../../assets/bookNow.png') }
  ];

  const popularDishes = [
    { id: '1', image: require('../../assets/bookNow.png') },
    { id: '2', image: require('../../assets/bookNow.png') },
    { id: '3', image: require('../../assets/bookNow.png') }
  ];

  const desertsData = [
    { id: '1', image: require('../../assets/bookNow.png') },
    { id: '2', image: require('../../assets/bookNow.png') },
    { id: '3', image: require('../../assets/bookNow.png') }
  ];

  const reviewData = [
    { id: '1', image: require('../../assets/bookNow.png') },
    { id: '2', image: require('../../assets/bookNow.png') },
    { id: '3', image: require('../../assets/bookNow.png') }
  ];

  const GOOGLE_MAP_KEY = "AIzaSyBmHupwMPDVmKEryBTT9LlIeQITS3olFeY"


  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
    };
  }, []);

  const checkAndRequestLocationPermission = async () => {
    try {
      const permissionResult = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      if (permissionResult === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        requestLocationPermission();
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  const navigateToBookNow = () => {
    navigation.navigate('CreateOrder');
  }

  const requestLocationPermission = async () => {
    try {
      const permissionResult = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      if (permissionResult === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.warn('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };


  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        Geocoder.from(latitude, longitude)
          .then((response) => {
            const address = response.results[0].formatted_address;
            setCurrentAddress(address);
          })
          .catch((error) => console.warn('Error fetching location address:', error));
      },
      (error) => console.log('Error getting current location:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <CustomHeader title={title} navigation={navigation} />

    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{}}>
      <Image 
        source={require('../../assets/gradient.png')} 
        style={styles.backgroundImage} 
        resizeMode="cover" 
      />
      <CarouselComponent data={popularDishes} />

      </View>


      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#9252AA" />
        </View>
      ) : (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          {apiData && apiData.length > 1 && (
            <View style={{ marginHorizontal:16}}>
              <Image source={require('../../assets/orderDetailBackground.png')}
          style={{ height: 258, width:  Dimensions.get('window').width*.9, marginTop: 10 }}>
              </Image>
              <Text>{apiData[0].total_amount}</Text>
            </View>
          )}
          </View>)}


      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={navigateToBookNow} style={styles.customButton} activeOpacity={1}>
          <Text style={styles.buttonText}> Book Now</Text>
        </TouchableOpacity>

        <Image
          source={require('../../assets/bulb.png')}
          style={{ height: 48, width: 54, marginTop: 10 }}
        />

        <Text style={{ marginTop: 9 }}>
          <Text style={styles.normalText}>{currentAddress} </Text>
          <Text style={styles.dishesText}>it Works?</Text>
        </Text>

      </View>

      <View>
        {/* <Text style={{ marginStart:16,paddingTop: 4, color: 'black', fontWeight: '800', fontSize: 16 }}>
          <Text style={{ color: '#9252AA' }}>Most Popular</Text> Dishes
        </Text>

        <Text style={{ fontSize: 12, fontWeight: '400', color: '#8C8C8C' }}>
          HORA makes your parties easier and effortless as we provide magical cooks
        </Text> */}
      </View>

      <CarouselComponent data={desertsData} />

      <Image
          source={require('../../assets/celebrate.png')}
          style={{ height: 496, width:  Dimensions.get('window').width, marginTop: 10 }}
        />

      <CarouselComponent data={reviewData} />
      <Image
          source={require('../../assets/whyHora.png')}
          style={{ height: 534, width: Dimensions.get('window').width, marginTop: 10 }}
        />
        </View>
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
  backgroundImage: {
    width: '100%',
    height: 101,
    position: 'absolute',
  },
});

export default Home;

