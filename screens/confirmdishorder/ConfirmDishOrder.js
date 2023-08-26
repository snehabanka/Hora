import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions, ImageBackground, FlatList, ScrollView, StatusBar, View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight, BackHandler } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomStatusBar from '../../components/CustomStatusBar';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BASE_URL, GET_CUISINE_ENDPOINT, API_SUCCESS_CODE, GET_MEAL_DISH_ENDPOINT } from '../../utils/ApiConstants';

const ConfirmDishOrder = ({ navigation, route }) => {

    const peopleCount = route.params.peopleCount
    const selectedDate = route.params.selectedDate
    const selectedTime = route.params.selectedTime
    const selectedDishData = route.params.selectedDishes
    const selectedMealList = Object.values(selectedDishData).map(dish => {
        return {
            name: dish.name,
            image: dish.image,
            price: dish.price,
            id: dish._id
        };
    });


    const renderDishItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'column', borderRadius: 8, borderColor: '#B8B8B8', borderWidth: 1, backgroundColor: '#FFF', paddingTop: 10, paddingEnd: 5, paddingLeft: 5,marginBottom:4 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: `https://horaservices.com/api/uploads/${item.image}` }} style={{ width: 41, height: 42, borderRadius: 36 }} />
                    <Text style={{ color: '#414141', fontSize: 11, fontWeight: '500', opacity: 0.9, width: 60, marginLeft: 9 ,marginTop:7}}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -10 }}>
                    <Text style={{ color: '#9252AA', fontSize: 11, fontWeight: '700', textAlign: 'center', paddingBottom: 7, marginLeft:9}}>{item.price}</Text>
                </View>

            </View>
        )


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
                <Text style={{fontSize:10,fontFamily:'600',color:'#F46C5B'}}>Select Dishes</Text>
                </View>
                <Image style={styles.separator1} source={require('../../assets/horizontalSeparator.png')} />
                <View>
                <Image style={styles.time} source={require('../../assets/SelectDateAndTimeSelected.png')} />
                <Text style={{fontSize:10,fontFamily:'600',color:'#F46C5B'}}>Select Date & Time</Text>
                </View>
                <Image style={styles.separator2} source={require('../../assets/horizontalSeparator.png')} />
                <View>  
                <Image style={styles.order} source={require('../../assets/ConfirmOrderUnselected.png')} />
                <Text style={{fontSize:10,fontFamily:'600',color:'#827F84'}}>Confirm Order</Text>
                </View>

            </View>
            <View style={{ marginHorizontal: 16, flexDirection: 'column', width: Dimensions.get('window').width * 0.9, padding: 7, backgroundColor: 'rgba(255, 164, 164, 0.27)', borderColor: '#F15252', borderWidth: 1, borderRadius: 3, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>

                <Text style={{ color: '#000', fontSize: 10, fontWeight: '500' }}>Chef details will be shared 5 hours before the order time</Text>
                <Text style={{ color: '#FF2929', fontWeight: '500', fontSize: 10 }}>Learn More</Text>
            </View>
            <View style={{ marginHorizontal: 16, flexDirection: 'column', width: Dimensions.get('window').width * 0.9, padding: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6, }}>
                <Text style={{ color: '#333', fontSize: 13, fontWeight: '700', }}>
                    Cooking location
                </Text>
                <View style={{ marginTop: 5, paddingStart: 11, paddingVertical: 6, backgroundColor: 'rgba(211, 75, 233, 0.10)', borderRadius: 4, borderWidth: 1, borderColor: '#FFE1E6', paddingEnd: 20 }}>
                    <Text style={{ color: '#9252AA', fontWeight: '500', lineHeight: 18, fontSize: 13 }}>Gunawarman street No.3, Selong, Kec. Kby. Baru, South Jakarta, Jakarta 12110</Text>

                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
                    <Text style={{ color: '#9252AA', fontSize: 13, fontWeight: '500', lineHeight: 18 }} >Change location</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 16, flexDirection: 'column', width: Dimensions.get('window').width * 0.9, padding: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6 }}>
                <Text style={{ color: '#333', fontSize: 13, fontWeight: '700', lineHeight: 26 }}>Payment summary</Text>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginHorizontal: 16, flexDirection: 'column', width: 120, paddingTop: 7, paddingLeft: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6 }}>
                            <Text style={{ color: '#A3A3A3', fontSize: 9, fontWeight: '400' }}>Booking Date</Text>
                            <Text style={{ color: '#9252AA', fontSize: 13, fontWeight: '600' }}>{selectedDate.toDateString()}</Text>
                        </View>
                        <View style={{ marginHorizontal: 16, flexDirection: 'column', width: 120, paddingTop: 7, paddingLeft: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6 }}>
                            <Text style={{ color: '#A3A3A3', fontSize: 9, fontWeight: '400' }}>Chef Arrival time</Text>
                            <Text style={{ color: '#9252AA', fontSize: 13, fontWeight: '600' }}>{selectedTime.toLocaleTimeString()}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginHorizontal: 16, flexDirection: 'column', width: 120, paddingTop: 7, paddingLeft: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6 }}>
                            <Text style={{ color: '#A3A3A3', fontSize: 9, fontWeight: '400' }}>Total Dishes</Text>
                            <Text style={{ color: '#9252AA', fontSize: 13, fontWeight: '600' }}>{Object.keys(selectedDishData).length}</Text>
                        </View>
                        <View style={{ marginHorizontal: 16, flexDirection: 'column', width: 120, paddingTop: 7, paddingLeft: 13, borderRadius: 6, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 6 }}>
                            <Text style={{ color: '#A3A3A3', fontSize: 9, fontWeight: '400' }}>No. of People</Text>
                            <Text style={{ color: '#9252AA', fontSize: 13, fontWeight: '600' }}>{peopleCount}</Text>
                        </View>
                    </View>
                </View>
                <Image style={{ width: 316, height: 1, marginTop: 23 }} source={require('../../assets/Rectangleline.png')}></Image>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: "#525252", fontWeight: '500', fontSize: 12, lineHeight: 20 }}>Price for dish</Text>
                    <Text style={{ color: "#525252", fontWeight: '500', fontSize: 12, lineHeight: 20 }}>₹ 330.00</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: "#525252", fontWeight: '500', fontSize: 12, lineHeight: 20 }}>Price for Number of people</Text>
                    <Text style={{ color: "#525252", fontWeight: '500', fontSize: 12, lineHeight: 20 }}>₹ 150.00</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>
                    <Text style={{ color: "#A3A3A3", fontWeight: '400', fontSize: 12, lineHeight: 20 }}>Other Charges</Text>
                    <Text style={{ color: "#A3A3A3", fontWeight: '400', fontSize: 12, lineHeight: 20 }}>Free</Text>
                </View>
                <Image style={{ width: 316, height: 1, marginTop: 3 }} source={require('../../assets/Rectangleline.png')}></Image>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                    <Text style={{ color: "#9252AA", fontWeight: '600', fontSize: 16, lineHeight: 20 }}>Total payment</Text>
                    <Text style={{ color: "#9252AA", fontWeight: '600', fontSize: 16, lineHeight: 20 }}>₹ 480.00</Text>
                </View>
                <Image style={{ width: 316, height: 1, marginTop: 3 }} source={require('../../assets/Rectangleline.png')}></Image>
                <View style={{ width: 334, padding: 7, flexDirection: 'row', borderRadius: 10, paddingLeft: 11, paddingRight: 11, marginTop: 15, borderRadius: 100, backgroundColor: 'rgba(211, 75, 233, 0.10)', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/info.png')} style={{ height: 16, width: 16 }} />
                    <Text style={{ fontSize: 10, color: '#9252AA', fontWeight: '400', marginLeft: 4, lineHeight: 15 }}>100% Payment is to be paid to chef after order completion.</Text>
                </View>
            </View>
            <ScrollView style={{  }}>


         
                    <View style={{ justifyContent: 'space-between',borderRadius:6,backgroundColor:'#E8E8E8',borderColor:'#D8D8D8',borderWidth:1,width:Dimensions.get('window').width,paddingBottom:10}}>
                        <View style={{marginHorizontal:16,flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                        <Text style={{padding:4,color: '#000', fontSize: 13, fontWeight: '600'}}>Order Summary</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <TouchableOpacity onPress={{}}>
                                <Text style={{ color: '#9252AA', fontWeight: '400', textDecorationLine: 'underline', fontSize: 11, marginLeft: 10 }}>View All</Text>

                            </TouchableOpacity>
                            <Image style={{ width: 9, height: 9, marginLeft: 6 }} source={require('../../assets/info.png')}></Image>
                        </View>
                        </View>

                   


                    {/* <FlatList
                                    data={item.dish}
                                    keyExtractor={(dish) => dish._id}
                                    renderItem={renderDishItem}
                                    numColumns={3} // Set numColumns to 3 for the grid layout
                                    contentContainerStyle={styles.dishContainer}
                                    columnWrapperStyle={styles.dishColumnWrapper}
                                /> */}
                    <View style={{marginTop:10,marginHorizontal:15}} >
                    <FlatList
                        data={selectedMealList.slice(0, 3)}
                        keyExtractor={(item) => item._id}
                        renderItem={renderDishItem}
                        numColumns={3}
                        contentContainerStyle={styles.dishContainer}
                        columnWrapperStyle={styles.dishColumnWrapper}
                    />
                     </View>
                     <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:12}}>
                <Text style={{fontSize:14,fontWeight:500,color:'#333'}}>Need more dishes?</Text> 
                <View style={{marginLeft:5,backgroundColor:'#E8E8E8',borderRadius:18,borderWidth:1,borderColor:'#9252AA',justifyContent:'center',alignItems:'center',width:96,height:28}}>
                    <Text style={{color:'#9252AA',fontSize:13,fontWeight:'500'}}>Add More</Text>
                </View>
            </View>
                </View>
            

            </ScrollView>
            <View style={{ marginTop:11,alignItems:'center',justifyContent: 'center'}}>
                <TouchableHighlight onPress={{}} style={styles.continueButton} underlayColor="transparent" activeOpacity={1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
                        <Text style={styles.buttonText1}>Confirm Order</Text>

                    </View>

                </TouchableHighlight>
            </View>

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
    dishContainer: {
    },
    dishColumnWrapper: {
        justifyContent: 'space-between',
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
        width: Dimensions.get('window').width * 0.85,
        backgroundColor: '#9252AA',
        justifyContent: 'center',
        paddingHorizontal:97,
        paddingVertical: 17,
        borderRadius: 20,
        marginBottom: 15
    },
    buttonText1: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
    },
})

export default ConfirmDishOrder