import React from "react";
import { Image, ImageBackground, Text, View, FlatList } from "react-native";
import styles from './styles'
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { TouchableHighlight } from "react-native-gesture-handler";
import { BASE_URL, GET_ORDER_HISTORY_ENDPOINT } from "../../utils/ApiConstants";
import CustomHeader from '../../components/CustomeHeader';


const OrderHistory = () => {

    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    const fetchOrderHistory = async () => {
        try {
            const url = BASE_URL + GET_ORDER_HISTORY_ENDPOINT
            const requestData = {
                "page": "1",
                "_id": "640f67154466b415970be664"
            }
            const headers = {
                'Content-Type': 'application/json',
            }
            const data = await axios.post(url, requestData, headers)
            if (data && data.data) {
                console.warn(data.status)
                console.warn(data.data.order)
                // const orders = data.data.order.map((orderData) => ({
                //     orderId: orderData._id,
                //     //   orderDate: orderData.order_date,
                //     //   orderTime: orderData.order_time,
                //     //   jobStartTime: orderData.job_start_time,
                //     //   jobEndTime: orderData.job_end_time,
                //     //   noOfPeople: orderData.no_of_people,
                //     //   noOfBurner: orderData.no_of_burner,
                //     //   type: orderData.type,
                //     //   orderType: orderData.order_type,
                //     // //   items: orderData.items,
                //     //   fromId :
                //     //   {
                //     //     otp: orderData.fromId.otp}
                // }));
                setOrderList(orders);
            }
        } catch (error) {

        }
    }


    const renderItem = (data) => {
        return (
            <View style={styles.screenContainer}>
                   <CustomHeader title={"Order history"} navigation={navigation} />

                <ImageBackground source={require('../../assets/orderHistoryRectangle.png')} style={styles.imageBackground}>
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            <View style={styles.textView1}>
                                <View style={styles.button}><Text style={styles.text1}>Completed</Text>
                                </View>
                                <Text style={styles.text2}>Order Id:{data._id}</Text>
                                <Text style={styles.text3}>OTP : {data.fromId.otp}</Text>
                            </View>
                            <Image style={styles.line1} source={require('../../assets/verticalDottedLine.jpg')} />
                            <View style={styles.textView2}>
                                <View style={styles.texticon}>
                                    <Text style={{ ...styles.text3, marginLeft: 22, marginTop: 16, marginBottom: 6 }}>05 Feb, 2023</Text>
                                    <Image style={{ ...styles.icon, marginTop: 21, marginRight: 27 }} source={require('../../assets/calender.jpg')} />
                                </View >
                                <View style={styles.texticon}>
                                    <Text style={{ ...styles.text3, marginLeft: 42, marginBottom: 6 }}>12:00 pm</Text>
                                    <Image style={{ ...styles.icon, marginTop: 5, marginRight: 27 }} source={require('../../assets/calender.jpg')} />
                                </View >
                                <View style={styles.texticon}>
                                    <Text style={{ ...styles.text3, marginLeft: 42 }}>05 people</Text>
                                    <Image style={{ ...styles.icon, marginTop: 5, marginRight: 27 }} source={require('../../assets/person.jpg')} />
                                </View >
                            </View>
                        </View>
                        <Image style={styles.line2} source={require('../../assets/horizontalDottedLine.png')} />
                        <View style={styles.buttonContainer}>
                            {/* <TouchableHighlight style={styles.button1}  underlayColor="#E56352">
                    <Text style={styles.buttonText1}>Details</Text>
                </TouchableHighlight> */}
                            {/* <TouchableHighlight style={styles.button} underlayColor="transparent">
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableHighlight> */}
                            <Text>5000/-</Text>
                        </View>

                    </View>

                </ImageBackground>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={orderList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()} // You can use a unique key for each item

            ></FlatList>


        </View>
    )
};
export default OrderHistory;






