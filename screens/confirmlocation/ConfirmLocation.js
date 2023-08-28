import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, TouchableOpacity, Text, Image, View, FlatList, StyleSheet, TextInput, Alert, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import * as Permissions from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BASE_URL, SAVE_LOCATION_ENDPOINT, API_SUCCESS_CODE } from '../../utils/ApiConstants';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ConfirmLocation = ({ navigation, route }) => {
  const [locationPermissionStatus, setLocationPermissionStatus] = useState(null);
  const [locationText, setLocationText] = useState('');
  const [currentLocation, setCurrentLocation] = useState('')
  const [selectedButtonId, setSelectedButtonId] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [address, setAddress] = useState('');
  const data = route.params.data
  const [mapRegion, setMapRegion] = useState(null);
  const mapViewRef = useRef(null);
  const [isAddressValid, setAddressValid] = useState(false);



  const bottomSheetRef = useRef();
  const GOOGLE_MAP_KEY = "AIzaSyBmHupwMPDVmKEryBTT9LlIeQITS3olFeY"

  const buttonData = [
    { id: '1', label: 'Home' },
    { id: '2', label: 'Work' },
    { id: '3', label: 'Hotel' },
    { id: '4', label: 'Other' },
  ];

  const checkAddressValidity = () => {
    if (recipient && houseNumber && address) {
      setAddressValid(true);
    } else {
      setAddressValid(false);
    }
  };

  const ValidateAddress = (address) => {
    setAddress(address)
    checkAddressValidity()
  }


  const handleButtonPress = (buttonId) => {
    console.warn(buttonId)
    setSelectedButtonId(buttonId);
  };

  const renderButton = ({ item }) => (
    <TouchableOpacity activeOpacity={1} style={[styles.button1, selectedButtonId === item.id && styles.selectedButton]} onPress={() => handleButtonPress(item.id)}>
      <Text style={[styles.buttonText, selectedButtonId === item.id && styles.selectedText]} >{item.label}</Text>
    </TouchableOpacity>
  );


  const handleRegionChange = async (newRegion) => {
    setMapRegion(newRegion)
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
    Geocoder.init(GOOGLE_MAP_KEY);
    if (data != null) {
      handleSetLocation()
    }
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

    checkLocationPermission();
  }, []);

  const focusOnCurrentLocation = () => {
    if (locationPermissionStatus === 'granted') {
      getCurrentLocation()
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const updatedInitialRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setMapRegion(updatedInitialRegion); // Update the initialRegion directly
        Geocoder.from(latitude, longitude)
          .then((response) => {
            const address = response.results[0].formatted_address;
            setCurrentLocation(address);
          })
          .catch((error) =>
            console.warn('Error fetching location address:', error)
          );
      },
      (error) => console.log('Error getting current location:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };


  const handleSetLocation = () => {
    bottomSheetRef.current.open();
  };

  const handleSearchLocation = (address) => {
    setLocationText(address);
  };


  useEffect(() => {
    // ... your existing code
    if (route.params.data != null) {
      handleSetLocation();
      // Prefill recipient, houseNumber, and address based on address2
      if (data.address2) {
        console.warn(data.address2)
        const [prefillRecipient, prefillHouseNumber, prefillAddress] = data.address2.split('/');
        if (prefillAddress != NaN && prefillAddress != NaN) {
          setRecipient(prefillRecipient);
          setHouseNumber(prefillHouseNumber);
          setAddress(prefillAddress);
        }
      }

      const matchedButton = buttonData.find(button => button.label.toLowerCase() === data.title.toLowerCase());
      if (matchedButton) {
        setSelectedButtonId(matchedButton.id);
      }
      else {
        setSelectedButtonId('4');
      }
      checkAddressValidity()
    }

    // ... rest of your code
  }, []);



  const saveAddress = async () => {
    try {
      const url = BASE_URL + SAVE_LOCATION_ENDPOINT;
      let label = null
      if (selectedButtonId != null) {
        label = buttonData[selectedButtonId - 1]['label']
      }

      const address2 = recipient + "/" + houseNumber + "/" + address
      const requestData =
      {
        title: label,
        address1: currentLocation,
        address2: address2,
        address_type: "1",
        _id: "6413340f549b58e3dc39a035"
      };
      const token = await AsyncStorage.getItem('token')
      const response = await axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
      });
      console.warn(requestData)
      if (response.status == API_SUCCESS_CODE) {
        navigation.goBack()
      }
    } catch (error) {
      console.log('Error  Data:', error.message);
    }
  };

  const SearchIcon = () => (
    <Image source={require('../../assets/ic_search_black.png')} style={styles.image1}></Image>
  );
  



  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={styles.view1}>
        <Image style={styles.image4} source={require('../../assets/info.png')} />
        <Text style={styles.text1}>Price is calculated from dish cost and number of servings.</Text>
      </View>
      {locationPermissionStatus === 'granted' && mapRegion && (
        <MapView
          ref={mapViewRef}
          style={styles.map}
          mapType="standard"
          initialRegion={mapRegion}
          onRegionChange={(region) => handleRegionChange(region)}
        >

        </MapView>
      )}

      {mapRegion && (
        <View style={styles.markerContainer}>
          <Image
            source={require('../../assets/markerPin1.png')}
            style={styles.markerImage}
          />
        </View>
      )}

        
      {/* <View style={styles.searchBox}>
        <TouchableOpacity activeOpacity={1} style={styles.searchButton}>
          <Image source={require('../../assets/ic_search_black.png')} style={styles.image1}></Image>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Find Your location"
          value={locationText}
          onChangeText={handleSearchLocation}
          placeholderTextColor="black"
        />
      </View> */}

<View style={styles.container}>
      <GooglePlacesAutocomplete
        onPress={(data, details = null) => {
          console.warn(data);
          console.warn(details);
          if (details) {
            console.warn(data);
            // Display the selected location on the map
            // You can use the "details" object to get the location's latitude and longitude
          }
        }}
        query={{
          key: GOOGLE_MAP_KEY,
          language: 'en',
        }}
        styles={{
          container: styles.searchContainer,
          textInputContainer: styles.InputContainer,
          listView: styles.listView,
        }}
        renderLeftButton={SearchIcon}
      />
    </View>
    
      
    

      <View style={{ position: 'absolute', bottom: 270, right: 20 }}>
        <TouchableOpacity
          style={{ backgroundColor: 'transparent' }}
          onPress={focusOnCurrentLocation}
          activeOpacity={1}
        >
          <Image
            source={require('../../assets/markLocation.png')}
            style={styles.markLocationImage}
          />
        </TouchableOpacity>
      </View>


      <View style={styles.container}>

        <View style={styles.card}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText1}>Your Location</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Image source={require('../../assets/LocationPin.png')} style={styles.image2}></Image>
            <Text style={styles.locationText2} multiline
              numberOfLines={4}>{currentLocation}</Text>

          </View>
          <TouchableOpacity activeOpacity={1} style={styles.setLocation1} onPress={handleSetLocation}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>Set Location</Text>
          </TouchableOpacity>
        </View>
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

          <View style={{ ...styles.textInputContainer }}>
            <TextInput style={styles.textInput} placeholder="Recipient Name" value={recipient} onEndEditing={() => checkAddressValidity()}

              onChangeText={setRecipient} />
          </View>
          <View style={{ ...styles.textInputContainer, marginTop: 12 }}>
            <TextInput style={styles.textInput} placeholder="House/Flat/tower/floor number" value={houseNumber}
              onChangeText={setHouseNumber} onEndEditing={() => checkAddressValidity()}
            />
          </View>
          <View style={{ ...styles.textInputContainer, marginTop: 12 }}>
            <TextInput style={styles.textInput} placeholder="Street/Society/Nearyby Landmark" value={address}
              onChangeText={(address) => ValidateAddress(address)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              ...styles.setLocation,
              width: Dimensions.get('window').width * 0.9,
              backgroundColor: isAddressValid ? '#9252AA' : '#CFCFCF', // Change the background color based on validity
            }}
            onPress={saveAddress}
            disabled={!isAddressValid} // Disable the button if inputs are not valid
          >
            <Text style={{ color: !isAddressValid ? "#343333" : 'white', fontSize: 14, fontWeight: '500' }}>Save Address</Text>
          </TouchableOpacity>


        </View>
      </RBSheet>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,

  },
  searchBox: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    opacity: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#818181',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '000',
  },
  view1: { flexDirection: 'row', backgroundColor: '#EFF0F3', elevation: 2, width: Dimensions.get('window').width },
  text1: { color: '#676767', fontSize: 12, fontWeight: '400', paddingVertical: 5, marginStart: 8 },
  image4: { width: 16, height: 16, marginLeft: 16, marginTop: 5, marginBottom: 5 },
  searchButton: {
    marginLeft: 10,
    alignItems: 'center'
  },
  image1: {
    height: 24,
    width: 24,
    marginLeft:16,
    marginTop:10
  },
  image2: {
    height: 33,
    width: 33,
    marginLeft: 20
  },
  card: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9,
    bottom: 20,
    left: 20,
    right: 20,
    height: 220,
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
    marginTop: 22,
    color: '#000'
  },
  locationText2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    marginEnd: 26,
    height: 55,
  },
  buttonsContainer: {
    marginTop: 22,
    flexDirection: 'row',
    paddingEnd: 36,

  },
  changeLocation: {

    color: '#9252AA',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 24

  },
  setLocation: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9252AA',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 33,
    height: 57,
    marginTop: 43
  },
  setLocation1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9252AA',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 10,
    height: 57,
    marginTop: 32
  },
  bottomSheetWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  draggableIcon: {
    backgroundColor: '#000',
  },
  sheetContent: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: -19
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 16,

  },
  container1: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 22
  },
  button1: {
    flex: 1,
    height: 33,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000',
    marginHorizontal: 5,
    borderColor: '#AC6ABE',
    borderWidth: 0.5,
    borderRadius: 22,
  },
  buttonText: {
    color: '#AC6ABE',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center'
  },
  selectedButton: {
    backgroundColor: '#AC6ABE',
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center'
  },
  textInputContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: 57,
    backgroundColor: '#E7E7E7',
    borderRadius: 15,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    paddingHorizontal: 28,
    justifyContent: 'center'
  },
  textInput: {
    fontSize: 13,
    fontWeight: '400',
    color: '#414141'

  },
  textAddress: {
    fontSize: 16,
    marginTop: 44,
    fontWeight: '700',
    color: 'black',
    marginLeft: 10
  },
  saveAddress: {
    justifyContent: 'flex-start',
    fontSize: 12,
    marginTop: 26,
    marginLeft: 10,
    fontWeight: '400',
    color: '#414141'
  },
  focusButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  markLocationImage: {
    width: 39,
    height: 39,
  },
  markerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -33 }, { translateY: -108 }], // Adjust values as needed
    zIndex: 1,
  },
  markerImage: {
    width: 116,
    height: 116,
  },
  searchContainer: {
    marginHorizontal: 19,
    backgroundColor: null,
    height: 30,
    borderRadius: 15,
  },
  InputContainer: {
    backgroundColor: null,
    opacity: 0.5,
    marginLeft: 20,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 25,
  },

});


export default ConfirmLocation;
