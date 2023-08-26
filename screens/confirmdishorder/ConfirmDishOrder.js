import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions, ImageBackground, FlatList, ScrollView, StatusBar, View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight, BackHandler } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomStatusBar from '../../components/CustomStatusBar';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BASE_URL, GET_CUISINE_ENDPOINT, GET_ADDRESS_LIST, API_SUCCESS_CODE, GET_MEAL_DISH_ENDPOINT } from '../../utils/ApiConstants';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

const ConfirmDishOrder = ({ navigation, route }) => {

    const peopleCount = route.params.peopleCount
    const selectedDate = route.params.selectedDate
    const selectedTime = route.params.selectedTime
    const selectedDishData = route.params.selectedDishes
    const [addresses, setAddresses] = useState([]);
    const bottomSheetRef = useRef(null);
    const [currentAddress, setCurrentAddress] = useState('');
    const [showAllItems, setShowAllItems] = useState(false);
    const selectedMealList = Object.values(selectedDishData).map(dish => {
        return {
            name: dish.name,
            image: dish.image,
            price: Number(dish.price),
            id: dish._id
        };
    });

    const onViewAllClick = () => {
        setShowAllItems(!showAllItems);
    }


    const editAddress = (address) => {
        console.warn(address)
        navigation.navigate('ConfirmLocation', { 'data': address })
    }

    const dishPrice = selectedMealList.reduce((total, dish) => total + dish.price, 0);
    const priceForPeople = peopleCount * 49
    const totalPrice = dishPrice + priceForPeople


    const AddressItem = ({ address, selected, onSelect }) => (
        <TouchableOpacity onPress={onSelect}>
            <View style={[styles.container, selected && styles.selectedContainer]}>
                <View style={{ flexDirection: 'row', marginTop: 25, alignItems: 'center' }}>
                    <Text style={[styles.headingText, selected && styles.selectedText]}>Delivers To</Text>
                    <TouchableOpacity onPress={() => editAddress(address)} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <Image source={selected ? require('../../assets/editSelected.png') : require('../../assets/edit.png')} style={{ height: 14, width: 14 }} />
                        <Text style={[styles.editText, selected && styles.selectedText]}>Edit</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', flex: 1, marginTop: 10, marginStart: 5, marginEnd: 16, paddingBottom: 25, alignItems: 'center' }}>
                    <View>
                        <Image
                            source={
                                address.title === 'home'
                                    ? selected
                                        ? require('../../assets/homeSelected.png')
                                        : require('../../assets/homelabel.png')
                                    : address.title === 'hotel'
                                        ? selected
                                            ? require('../../assets/homeSelected.png')
                                            : require('../../assets/hotel.png')
                                        : address.title === 'work'
                                            ? selected
                                                ? require('../../assets/homeSelected.png')
                                                : require('../../assets/homelabel.png')
                                            : require('../../assets/hotel.png')

                            }
                            style={styles.homeIcon}
                        />
                    </View>
                    <View>
                        <Text style={[styles.parallelText, selected && styles.selectedText]}>
                            {address.title}
                        </Text>
                        <Text style={[styles.multiLineText, selected && styles.selectedText]}>
                            {address.address1}
                        </Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );

    const BottomSheetContent = ({ data, onSelectAddress }) => (

        <View style={{ flexDirection: 'column' }}>
            <View style={{ marginHorizontal: 40 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: 'black' }}>
                    Saved Address
                </Text>
            </View>
            <View style={{ marginTop: 19 }}>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <AddressItem
                            address={item}
                            onSelect={() => onSelectAddress(item)}
                            selected={false}
                        />
                    )}>
                </FlatList>
            </View>

        </View>

    );

    useEffect(() => {

        Geocoder.init('AIzaSyBmHupwMPDVmKEryBTT9LlIeQITS3olFeY');
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                Geocoder.from(latitude, longitude)
                    .then(response => {
                        const address = response.results[0].formatted_address;
                        setCurrentAddress(address);
                    })
                    .catch(error => {
                        console.error('Error fetching address:', error);
                    });
            },
            error => {
                console.error('Error getting current location:', error);
            }
        );
    }, []);

    const fetchAddressesFromAPI = async () => {
        try {
            const url = BASE_URL + GET_ADDRESS_LIST;
            const requestData = {
                page: '1'
            };
            const response = await axios.post(url, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMzQwZjU0OWI1OGUzZGMzOWEwMzUiLCJuYW1lIjoiUmFodWwiLCJlbWFpbCI6IiIsInBob25lIjoiODM4Nzk5OTM4MiIsInJvbGUiOiJzdXBwbGllciIsImlhdCI6MTY3ODk4NDg3OSwiZXhwIjoxNzEwNTIwODc5fQ.PEnGF12sAFsF_idngQZnGR_eSLYweXCOPsq7iTJUMoc'
                },
            });
            console.warn(response.status)
            if (response.status == API_SUCCESS_CODE) {
                console.warn(response.data.data.address)
                setAddresses(response.data.data.address)
            }
        } catch (error) {
            console.log('Error Fetching Data:', error.message);
        }
    };

    const openBottomSheet = () => {
        bottomSheetRef.current.open();
        fetchAddressesFromAPI()
    };

    const handleSelectAddress = (address) => {
        setCurrentAddress(address.address1);
        bottomSheetRef.current.close();
    };




    const renderDishItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row',marginRight:5,width:106, borderRadius: 8, borderColor: '#B8B8B8', borderWidth: 1, backgroundColor: '#FFF',paddingBottom:5 }}>
                <Image source={{ uri: `https://horaservices.com/api/uploads/${item.image}` }} style={{ width: 41, height: 42, borderRadius: 20,marginBottom:9,marginTop:9,marginStart:6}} />
                <View style={{ flexDirection: 'column',alignContent:'flex-end'}}>
                    <Text numberOfLines={3} style={{ alignItems:'flex-end',width:50,marginLeft:7,color: '#414141',fontSize: 11, fontWeight: '500', opacity: 0.9,marginTop: 10}}>{item.name}</Text>
                    <Text style={{ width:45,marginTop:2,color: '#9252AA', fontSize: 11, fontWeight: '700', textAlign: 'center' }}>₹ {item.price}</Text>
                </View>


            </View>
        )

    }

    const onContinueClick = () => {
        navigation.navigate('ConfirmOrder')
    }

    const addMore = () => {
        navigation.navigate('CreateOrder')
    }

    const changeLocation = () => {
        openBottomSheet()
    }

    const addAddress = () => {
        navigation.navigate('ConfirmLocation', { 'data': null })
    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.view1}>
                <Image style={styles.image1} source={require('../../assets/info.png')} />
                <Text style={styles.text1}>Bill value depends upon Dish selected + Number of people</Text>
            </View>
            <View style={styles.view2}>
                <View>
                    <Image style={styles.dish} source={require('../../assets/SelectDishUnselected.png')} />
                    <Text style={{ fontSize: 10, fontFamily: '600', color: '#F46C5B' }}>Select Dishes</Text>
                </View>
                <Image style={styles.separator1} source={require('../../assets/horizontalSeparator.png')} />
                <View>
                    <Image style={styles.time} source={require('../../assets/SelectDateAndTimeTick.png')} />
                    <Text style={{ fontSize: 10, fontFamily: '600', color: '#F46C5B' }}>Select Date & Time</Text>
                </View>
                <Image style={styles.separator2} source={require('../../assets/horizontalSeparator.png')} />
                <View>
                    <Image style={styles.order} source={require('../../assets/ConfirmOrderSelected.png')} />
                    <Text style={{ fontSize: 10, fontFamily: '600', color: '#F46C5B' }}>Confirm Order</Text>
                </View>

            </View>
            <View style={{ marginHorizontal: 16, flexDirection: 'column', width: Dimensions.get('window').width * 0.9, padding: 7, backgroundColor: 'rgba(255, 164, 164, 0.27)', borderColor: '#F15252', borderWidth: 1, borderRadius: 3, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>

                <Text style={{ color: '#000', fontSize: 10, fontWeight: '500' }}>Chef details will be shared 5 hours before the order time</Text>
                <Text style={{ color: '#FF2929', fontWeight: '500', fontSize: 10 }}>Learn More</Text>
            </View>
            <ScrollView style={{}}>
                <View style={{ marginHorizontal: 16, flexDirection: 'column', width: Dimensions.get('window').width * 0.9, padding: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6, }}>
                    <Text style={{ color: '#333', fontSize: 13, fontWeight: '700', }}>
                        Cooking location
                    </Text>
                    <View style={{ marginTop: 5, paddingStart: 11, paddingVertical: 6, backgroundColor: 'rgba(211, 75, 233, 0.10)', borderRadius: 4, borderWidth: 1, borderColor: '#FFE1E6', paddingEnd: 20 }}>
                        <Text style={{ color: '#9252AA', fontWeight: '500', lineHeight: 18, fontSize: 13 }}>{currentAddress}</Text>

                    </View>
                    <TouchableOpacity onPress={changeLocation}>

                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
                            <Text style={{ color: '#9252AA', fontSize: 13, fontWeight: '500', lineHeight: 18 }} >Change location</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 16, flexDirection: 'column', width: Dimensions.get('window').width * 0.9, padding: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6, paddingEnd: 10 }}>
                    <Text style={{ color: '#333', fontSize: 13, fontWeight: '700', lineHeight: 26 }}>Payment summary</Text>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ marginHorizontal: 16, flexDirection: 'column', width: 120, paddingTop: 7, paddingLeft: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6, paddingBottom: 3 }}>
                                <Text style={{ color: '#A3A3A3', fontSize: 9, fontWeight: '400' }}>Booking Date</Text>
                                <Text style={{ color: '#9252AA', fontSize: 13, fontWeight: '600' }}>{selectedDate.toDateString()}</Text>
                            </View>
                            <View style={{ marginHorizontal: 16, flexDirection: 'column', width: 120, paddingBottom: 3, paddingTop: 7, paddingLeft: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6 }}>
                                <Text style={{ color: '#A3A3A3', fontSize: 9, fontWeight: '400' }}>Chef Arrival time</Text>
                                <Text style={{ color: '#9252AA', fontSize: 13, fontWeight: '600' }}>{selectedTime.toLocaleTimeString()}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginHorizontal: 16, flexDirection: 'column', width: 120, paddingBottom: 3, paddingTop: 7, paddingLeft: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6 }}>
                                <Text style={{ color: '#A3A3A3', fontSize: 9, fontWeight: '400' }}>Total Dishes</Text>
                                <Text style={{ color: '#9252AA', fontSize: 13, fontWeight: '600' }}>{Object.keys(selectedDishData).length}</Text>
                            </View>
                            <View style={{ marginHorizontal: 16, flexDirection: 'column', width: 120, paddingBottom: 3, paddingTop: 7, paddingLeft: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6 }}>
                                <Text style={{ color: '#A3A3A3', fontSize: 9, fontWeight: '400' }}>No. of People</Text>
                                <Text style={{ color: '#9252AA', fontSize: 13, fontWeight: '600' }}>{peopleCount}</Text>
                            </View>
                        </View>
                    </View>
                    <Image style={{ width: 316, height: 1, marginTop: 23 }} source={require('../../assets/Rectangleline.png')}></Image>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: "#525252", fontWeight: '500', fontSize: 12, lineHeight: 20 }}>Price for dish</Text>
                        <Text style={{ color: "#525252", fontWeight: '500', fontSize: 12, lineHeight: 20 }}>₹ {dishPrice}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: "#525252", fontWeight: '500', fontSize: 12, lineHeight: 20 }}>Price for Number of people</Text>
                        <Text style={{ color: "#525252", fontWeight: '500', fontSize: 12, lineHeight: 20 }}>₹ {priceForPeople}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>
                        <Text style={{ color: "#A3A3A3", fontWeight: '400', fontSize: 12, lineHeight: 20 }}>Other Charges</Text>
                        <Text style={{ color: "#A3A3A3", fontWeight: '400', fontSize: 12, lineHeight: 20 }}>Free</Text>
                    </View>
                    <Image style={{ width: 316, height: 1, marginTop: 3 }} source={require('../../assets/Rectangleline.png')}></Image>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                        <Text style={{ color: "#9252AA", fontWeight: '600', fontSize: 16, lineHeight: 20 }}>Total payment</Text>
                        <Text style={{ color: "#9252AA", fontWeight: '600', fontSize: 16, lineHeight: 20 }}>₹ {totalPrice}</Text>
                    </View>
                    <Image style={{ width: 316, height: 1, marginTop: 3 }} source={require('../../assets/Rectangleline.png')}></Image>
                    <View style={{ padding: 7, flexDirection: 'row', borderRadius: 10, paddingRight: 11, marginTop: 15, borderRadius: 100, backgroundColor: 'rgba(211, 75, 233, 0.10)', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/info.png')} style={{ height: 16, width: 16 }} />
                        <Text style={{ fontSize: 10, color: '#9252AA', fontWeight: '400', marginLeft: 4, lineHeight: 15 }}>100% Payment is to be paid to chef after order completion.</Text>
                    </View>
                </View>




                <View style={{ justifyContent: 'space-between',marginTop:5, borderRadius: 6, backgroundColor: '#E8E8E8', borderColor: '#D8D8D8', borderWidth: 1, width: Dimensions.get('window').width, paddingBottom: 10 }}>
                    <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Text style={{ padding: 4, color: '#000', fontSize: 13, fontWeight: '600' }}>Order Summary</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <TouchableOpacity onPress={onViewAllClick}>
                                <Text style={{ color: '#9252AA', fontWeight: '400', textDecorationLine: 'underline', fontSize: 11, marginLeft: 10 }}>View All</Text>

                            </TouchableOpacity>
                            <Image style={{ width: 9, height: 9, marginLeft: 5 }} source={require('../../assets/viewAll.png')}></Image>
                        </View>
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 15, flexDirection: 'row',flex:1 }} >
                        <FlatList
                            data={showAllItems ? selectedMealList : selectedMealList.slice(0, 3)}
                            keyExtractor={(item) => item._id}
                            renderItem={renderDishItem}
                            numColumns={3}
                            columnWrapperStyle={styles.dishColumnWrapper}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 12 }}>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>Need more dishes?</Text>
                        <TouchableOpacity onPress={addMore} activeOpacity={1}>
                            <View style={{ marginLeft: 5, backgroundColor: '#E8E8E8', borderRadius: 18, borderWidth: 1, borderColor: '#9252AA', justifyContent: 'center', alignItems: 'center', width: 96, height: 28 }}>
                                <Text style={{ color: '#9252AA', fontSize: 13, fontWeight: '500' }}>Add More</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>
            <View style={{ marginTop: 11, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={onContinueClick} style={styles.continueButton} activeOpacity={1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
                        <Text style={styles.buttonText1}>Confirm Order</Text>

                    </View>

                </TouchableOpacity>
            </View>
            <RBSheet
                ref={bottomSheetRef}
                closeOnDragDown={true}
                height={500}
                customStyles={{
                    container: styles.bottomSheetContainer,
                    wrapper: styles.bottomSheetWrapper,
                    draggableIcon: styles.draggableIcon,
                }}
            >
                <View style={{ flexDirection: 'column', marginBottom: 39, flex: 1 }}>
                    <BottomSheetContent
                        data={addresses}
                        onSelectAddress={handleSelectAddress}

                    />
                </View>

                <View style={{
                    justifyContent: 'center',
                    marginTop: 29,
                    marginBottom: 26,
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => addAddress()} style={styles.customButton} activeOpacity={1}>
                        <Text style={styles.buttonText}> + Add Address</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>

        </View>



    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    view1: { flexDirection: 'row', backgroundColor: '#EFF0F3', elevation: 2, width: Dimensions.get('window').width },
    text1: { color: '#676767', fontSize: 12, fontWeight: '400', paddingVertical: 5, marginStart: 8 },
    image1: { width: 16, height: 16, marginLeft: 16, marginTop: 5, marginBottom: 5 },
    view2: { flexDirection: 'row', marginEnd: 21, marginStart: 16, marginTop: 15 },
    image2: { height: 36, width: 47 },
    image3: { height: 2, width: 80, marginLeft: 20, marginTop: 15 },
    dishColumnWrapper: {
        marginBottom: 4,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        alignItems: 'center',
    },
    continueButton: {
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: '#9252AA',
        justifyContent: 'center',
        paddingVertical: 17,
        borderRadius: 20,
        marginBottom: 15
    },
    buttonText1: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
    },
    order: { height: 24, width: 24, marginLeft: 16 },
    time: { height: 25, width: 30, marginLeft: 25 },
    dish: { height: 24, width: 24, marginLeft: 15 },
    separator1: { height: 1, width: 70, marginTop: 10, marginLeft: 5 },
    separator2: { height: 1, width: 70, marginTop: 10, marginStart: -15 },
    container: {
        flex: 1,
        backgroundColor: '#F3F2F2',
        borderRadius: 8,
        elevation: 1,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        paddingBottom: 1,
        marginBottom: 3
    },
    headingText: {
        flex: 1,
        color: '#414141',
        fontSize: 12,
        fontWeight: '400',
        justifyContent: 'space-between',
        opacity: 0.8,
        marginLeft: 10,
    },
    homeIcon: {
        marginLeft: 25,
        width: 24,
        height: 24
    },
    bottomText: {
        marginTop: 8,
        marginLeft: 38,
        color: '#414141',
        fontWeight: '400',
        fontSize: 10,
        opacity: 0.8


    },
    parallelText: {
        marginLeft: 16,
        fontSize: 12,
        fontWeight: '600',
        color: '#000'
    },
    multiLineText: {
        marginTop: 6,
        paddingHorizontal: 16,
        color: '#414141',
        fontWeight: '400',
        fontSize: 11,
        opacity: 0.8,
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
    },
    customButton: {
        height: 57,
        width: Dimensions.get('window').width * 0.8,
        backgroundColor: '#9252AA',
        marginHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    selectedContainer: {
        backgroundColor: '#9252AA', // Selected background color
        borderColor: '#9252AA', // Selected border color
    },
    selectedText: {
        color: 'white', // Selected text color
    },
    bottomSheetContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 12,
        paddingTop: 12

    },
    bottomSheetWrapper: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    draggableIcon: {
        backgroundColor: '#000',
    },
    editText: {
        fontSize: 11,
        fontWeight: '500',
        marginLeft: 10
    },
    dishItemContainer: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 8,
        borderColor: '#B8B8B8',
        borderWidth: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4, // Add vertical margin
    },
})

export default ConfirmDishOrder