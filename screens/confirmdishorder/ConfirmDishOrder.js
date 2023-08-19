import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet,Dimensions, ImageBackground, FlatList, ScrollView, StatusBar, View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight, BackHandler } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomStatusBar from '../../components/CustomStatusBar';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BASE_URL, GET_CUISINE_ENDPOINT, API_SUCCESS_CODE, GET_MEAL_DISH_ENDPOINT } from '../../utils/ApiConstants';

const ConfirmDishOrder = ({navigation}) => {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.view1}>
                <Image style={styles.image1} source={require('../../assets/info.png')} />
                <Text style={styles.text1}>Bill value depends upon Dish selected + Number of people</Text>
            </View>
            <View style={styles.view2}>
                <Image style={styles.image2} source={require('../../assets/selectDish.png')} />
                <Image style={styles.image3} source={require('../../assets/separator.png')} />
                <Image style={styles.image2} source={require('../../assets/SelectDateAndTime.png')} />
                <Image style={styles.image3} source={require('../../assets/separator.png')} />
                <Image style={styles.image2} source={require('../../assets/selectDish.png')} />
            </View>
            <View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    view1: { flexDirection: 'row', backgroundColor: '#EFF0F3',elevation:2,width:Dimensions.get('window').width},
    text1: { color: '#676767', fontSize: 12, fontWeight: '400', paddingVertical:5 ,marginStart:8},
    image1: { width: 16, height: 16, marginLeft: 16, marginTop: 5,marginBottom:5},
    view2: { flexDirection: 'row',marginEnd:21,marginStart:16 ,marginTop:15},
    image2: { height: 36, width: 47},
    image3: { height: 2, width: 80, marginLeft: 20, marginTop:15 },
    image4: {},
    image5: {},})

export default ConfirmDishOrder