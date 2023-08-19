import React, { useEffect, useState, useRef} from 'react';
import { Dimensions,TouchableOpacity,Text,Image,View,FlatList, StyleSheet,TextInput, Alert, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import * as Permissions from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BASE_URL,SAVE_LOCATION_ENDPOINT,API_SUCCESS_CODE } from '../../utils/ApiConstants';
import axios from 'axios';

const ConfirmLocation = () => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [locationPermissionStatus, setLocationPermissionStatus] = useState(null);
  const [locationText, setLocationText] = useState('');
  const [currentLocation, setCurrentLocation] =useState('')
  const [center, setCenter] = useState(null);
  const [selectedButtonId, setSelectedButtonId] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [address, setAddress] = useState('');

  const bottomSheetRef = useRef();

  const buttonData = [
    { id: '1', label: 'Home' },
    { id: '2', label: 'Work' },
    { id: '3', label: 'Hotel' },
    { id: '4', label: 'Other' },
  ];

  const handleButtonPress = (buttonId) => {
    setSelectedButtonId(buttonId);
    // You can also perform additional actions when a button is pressed
  };

  const renderButton = ({ item }) => (
    <TouchableOpacity style={[styles.button1 , selectedButtonId === item.id && styles.selectedButton]} onPress={() => handleButtonPress(item.id)}>
      <Text style={[styles.buttonText , selectedButtonId === item.id && styles.selectedText]} >{item.label}</Text>
    </TouchableOpacity>
  );


  const handleRegionChange = async (newRegion) => {
    setCenter(newRegion);
    try {
      const response = await Geocoder.from(newRegion.latitude, newRegion.longitude);
      const address = response.results[0].formatted_address;
      setCurrentLocation(address);
    } catch (error) {
      console.warn('Error fetching location address:', error);
      setCurrentLocation('');
    }
  };

  useEffect(() => {
    Geocoder.init('AIzaSyBmHupwMPDVmKEryBTT9LlIeQITS3olFeY');

    const checkLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        setLocationPermissionStatus(granted ? 'granted' : 'denied');
        if (granted) {
          getCurrentLocation();
        }
      } else if (Platform.OS === 'ios') {
        const status = await Permissions.request(Permissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        setLocationPermissionStatus(status);
        if (status === Permissions.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      }
    };

    // const requestLocationPermissionAndroid = async () => {
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    //     );
    //     setLocationPermissionStatus(granted ? 'granted' : 'denied');
    //     if (granted) {
    //       getCurrentLocation();
    //     }
    //   } catch (error) {
    //     console.warn('Error requesting location permission:', error);
    //   }
    // };

    // const requestLocationPermissionIOS = async () => {
    //   try {
    //     const status = await Permissions.request(Permissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    //     setLocationPermissionStatus(status);
    //     if (status === Permissions.RESULTS.GRANTED) {
    //       getCurrentLocation();
    //     }
    //   } catch (error) {
    //     console.warn('Error requesting location permission:', error);
    //   }
    // };


    

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const initialRegion= {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
          setInitialRegion(initialRegion);
          setCenter(initialRegion)
          Geocoder.from(latitude, longitude)
          .then((response) => {
            const address = response.results[0].formatted_address;
            console.log('Current location address:', address);
            setCurrentLocation(address)
          })
          .catch((error) => console.warn('Error fetching location address:', error));
        },
        (error) => console.log('Error getting current location:', error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    checkLocationPermission();
  }, []);

  const handleSetLocation = () => {
    bottomSheetRef.current.open();

  };

  const handleSearchLocation = (text) => {
    setLocationText(text)
    Geocoder.from(text)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const address=response.results[0].geometry.formatted_address
        const initialRegion= {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421 }
        setInitialRegion(initialRegion);
        setCenter(initialRegion)
        setCurrentLocation(address)
      })
      .catch((error) => console.warn('Error fetching location:', error));
  };

  
    const saveAddress = async () => {
      try {
          const url = BASE_URL + SAVE_LOCATION_ENDPOINT;
          const requestData =
            {
              title:"Add edit",
              address1:"sdf",
              address2:"fsdfsdf",
              address_type:"1",
              _id:"6400482a8efa231e9390e487"
          };
          const response = await axios.post(url, requestData, {
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmY2RjMTVmY2RjMDNlMTRiZmNkNmUiLCJuYW1lIjoiIiwiZW1haWwiOiIiLCJwaG9uZSI6Ijc5OTIyNzkzODYiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2ODk4NjU4MTYsImV4cCI6MTcyMTQwMTgxNn0.tF6nGHudhONGgICO8Xf6TDH3XGb1YKLGERSqmbWE8E4'
              },
          });
          console.warn(requestData)
          if (response.status == API_SUCCESS_CODE) {
              console.warn(response.status)
          }
      } catch (error) {
          console.log('Error Fetching Data:', error.message);
      }
  };

  return (
    <View style={styles.container}>
      {locationPermissionStatus === 'granted' && initialRegion && (
        <MapView
          style={styles.map}
          mapType="standard"
          initialRegion={initialRegion}
          onRegionChange={handleRegionChange}
        >
          <Marker
            coordinate={center}
            image={require('../../assets/plus.png')}
          />
        </MapView>
      )}
      <View style={styles.searchBox}>
      <TouchableOpacity style={styles.searchButton}>
         <Image source={require('../../assets/search.png')} style={styles.image1}></Image>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Find Your location"
          value={locationText}
          onChangeText={handleSearchLocation}
          placeholderTextColor="gray"
        />
        
      </View>
      <View style={styles.card}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText1}>Your Location</Text>
          <TouchableOpacity  onPress={() => setLocationText('')} >
        <Text style={styles.changeLocation}>CHANGE</Text>
      </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
        <Image source={require('../../assets/LocationPin.png')} style={styles.image2}></Image>
        <Text style={styles.locationText2} multiline
        numberOfLines={2}>{currentLocation}</Text>
          
        </View>
        <TouchableOpacity style={styles.setLocation1} onPress={handleSetLocation}>
            <Text style={{color:'white',fontSize:14,fontWeight:'500'}}>Set Location</Text>
          </TouchableOpacity>
      </View>

      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={550}
        customStyles={{
          container: styles.bottomSheetContainer,
          wrapper: styles.bottomSheetWrapper,
          draggableIcon: styles.draggableIcon,
        }}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.textAddress}>Enter Complete Address</Text>
          <Text style={styles.saveAddress}>Save Address As*</Text>
          <View style={styles.container1}>

      <FlatList
        data={buttonData}
        renderItem={renderButton}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>

      <View style={{...styles.textInputContainer}}>
        <TextInput style={styles.textInput} placeholder="Recipient Name"  value={recipient}
        onChangeText={setRecipient}/>
      </View>
      <View style={{...styles.textInputContainer,marginTop:12}}>
        <TextInput style={styles.textInput} placeholder="House/Flat/tower/floor number"  value={houseNumber}
        onChangeText={setHouseNumber}/>
      </View>
      <View style={{...styles.textInputContainer,marginTop:12}}>
        <TextInput style={styles.textInput} placeholder="Street/Society/Nearyby Landmark" value={address}
        onChangeText={setAddress} />
      </View>

      <TouchableOpacity style={{...styles.setLocation, width:Dimensions.get('window').width*0.9}} onPress={saveAddress}>
            <Text style={{color:'white',fontSize:14,fontWeight:'500'}}>Save Address</Text>
        </TouchableOpacity>

        </View>
      </RBSheet>
      </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
  },
  searchButton: {
    marginLeft: 10,
  },
  image1:{
    height:24,
    width:24
  },
  image2:{
    height:33,
    width:33,
    marginLeft:20,
    marginTop:28
  },
  card: {
    position: 'absolute',
    width:Dimensions.get('window').width*0.9,
   
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 22,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText1: {
    fontSize: 15,
    fontWeight: '700',
    marginTop:22,
    color:'#000'
  },
  locationText2: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:20,
    marginTop:28,
    marginEnd:36
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    paddingEnd:36,
   
  },
  changeLocation: {

    color:'#9252AA',
    fontSize:11,
    fontWeight:'700',
    marginTop:24

  },
  setLocation: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#9252AA',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom:33,
    height:57,
    marginTop:43
  },
  setLocation1: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#9252AA',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal:16,
    marginBottom:33,
    height:57,
    marginTop:43
  },
  bottomSheetWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  draggableIcon: {
    backgroundColor: '#000',
  },
  sheetContent: {
    flex: 1,
    flexDirection:'column',
    marginBottom:-19
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 16,

  },
  container1: {
    flex: 1,
    justifyContent:'space-between',
    marginTop:22
  },
  button1: {
    flex:1,
    height:33,
    width:70,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#0000',
    marginHorizontal:5,
    borderColor:'#AC6ABE',
    borderWidth:0.5,
    borderRadius: 22,
  },
  buttonText: {
    color: '#AC6ABE',
    fontSize: 13,
    fontWeight: '600',
    textAlign:'center'
  },
  selectedButton:{
    backgroundColor:'#AC6ABE',
  },
  selectedText:{
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    textAlign:'center'
  },
  textInputContainer:{
    width:Dimensions.get('window').width*0.9,
    height:57,
    backgroundColor:'#E7E7E7',
    borderRadius:15,
    borderColor:'#D9D9D9',
    borderWidth:1,
    paddingHorizontal:28,
    justifyContent:'center'},
  textInput:{fontSize:13,
      fontWeight:'400',
      color:'#414141'

    },
    textAddress:{
      fontSize:16,
      marginTop:44,
      fontWeight:'700',
      color:'black',
      marginLeft:10
    },
    saveAddress:{
      justifyContent:'flex-start',
      fontSize:12,
      marginTop:26,
      marginLeft:10,
      fontWeight:'400',
      color:'#414141'
    }
});


export default ConfirmLocation;
