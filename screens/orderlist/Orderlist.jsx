import React, { useState, useEffect } from 'react';
import { ScrollView, Linking, View, StyleSheet, Text, Image, TextInput, TouchableHighlight, Button, ImageBackground, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Orderlist = ({ navigation }) => {
    const [orderData, setorderData] = useState({})
    const [invitedate, setInviteDate] = useState('')
    let base_url = 'https://horaservices.com:3000'
    useEffect(() => {
        fetchOrderList();
    }, [])

    async function fetchOrderList() {
        try {
            const response = await fetch(base_url + '/api/order/user_order_list', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "page": "1",
                    "_id": "640f67154466b415970be664"
                })
            });
            const responseData = await response.json();
            setorderData(responseData.data.order)
        }
        catch (error) {
            console.log(error)
        }
    }

    const sendInvite = async () => {
         orderData.map((item) => {
            return (
                <View>
                    {item.order_date}
                    {item.order_time}
                    {console.log(item.order_locality)}
                    {
                        item.selecteditems.map((cur) => {
                            return (
                                <View>
                                    {
                                    <ul>
                                            <li>{console.log(cur.name)}</li>
                                        </ul>
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            )
        })
        console.log("send button", orderData  )

        // const shareOptions = {
        //     massage: "text msg"
        // }
        // try {
        //     const ShareResponse = Share.open(shareOptions)
        //     console.log(ShareResponse)
        // }
        // catch (error) {
        //     console.log("error")
        // }
    }

    const getorderDate = (dateValue) => {
        var str = dateValue;
        var str = str.split("T");
        var d1 = new Date(str[0])
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = months[d1.getMonth()];
        var dateValueUpdate = d1.getDate() + " " + month + " , " + d1.getFullYear()
        return dateValueUpdate;
    }

    const getOrderStatus = (orderStatusValue) => {
        if (orderStatusValue === 1) {
            return "Booked1"
        }
        if (orderStatusValue == 2) {
            return "Accepted"
        }
        if (orderStatusValue === 3) {
            return "Completed"
        }
        if (orderStatusValue === 4) {
            return "Cancel"
        }
        if (orderStatusValue === 5) {
            return "In Progress"
        }
        if (orderStatusValue === 6) {
            return "Booked"
        }
    }

    const getOrderId = (e) => {
        const orderId1 = 10800 + e
        const updateOrderId = "#" + orderId1
        console.log("updateOrderId" + updateOrderId)
        AsyncStorage.setItem("orderId", updateOrderId)
        return updateOrderId;
    }


    return (
        <View style={styles.container}>
            {
                Object.keys(orderData).map((item, index) => {
                    return (
                        <View key={index} style={{ boxShadow: "0 0 5px #9f9e9e", marginBottom: "20px", borderRadius: "20px", borderRadius: "20px", boxSizing: "border-box" }}>
                            <View style={styles.sec1}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <span style={{ paddingLeft: "10px" }}>Order Id</span>
                                    <span style={{ paddingLeft: "9px" }}>
                                        {getOrderId(orderData[item].order_id)}
                                    </span>
                                </View>
                                <View>
                                    <Text style={styles.orderstatus}>{getOrderStatus(orderData[item].order_status)}</Text>
                                </View>
                            </View>
                            <View style={styles.sec}>
                                <View>
                                    <ul style={styles.ulclass1}>
                                        <li style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", listStyle: "none" }}>
                                            <span>
                                                <Image source={require('../../assets/date-time-icon.png')} style={{
                                                    height: 13,
                                                    width: 13,
                                                    marginLeft: 15,
                                                    marginVertical: 46,
                                                    marginLeft: 0,
                                                    marginRight: 0,
                                                    marginTop: 0,
                                                    marginBottom: 0
                                                }} />
                                            </span>

                                            <span style={{ marginLeft: "8px" }}><Text>{getorderDate(orderData[item].order_date)}</Text></span>

                                        </li>
                                        <li style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", listStyle: "none", paddingTop: "8px", paddingBottom: "8px" }}>
                                            <span>
                                                <Image source={require('../../assets/Time-Circle.png')} style={{
                                                    height: 13,
                                                    width: 13,
                                                    marginLeft: 15,
                                                    marginVertical: 46,
                                                    marginLeft: 0,
                                                    marginRight: 0,
                                                    marginTop: 0,
                                                    marginBottom: 0
                                                }} />
                                            </span>
                                            <span style={{ marginLeft: "8px" }}>{orderData[item].order_time}</span></li>
                                        <li style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", listStyle: "none" }}>
                                            <span>
                                                <Image source={require('../../assets/User.png')} style={{
                                                    height: 13,
                                                    width: 13,
                                                    marginLeft: 15,
                                                    marginVertical: 46,
                                                    marginLeft: 0,
                                                    marginRight: 0,
                                                    marginTop: 0,
                                                    marginBottom: 0
                                                }} />
                                            </span>
                                            <span style={{ marginLeft: "8px" }}>{orderData[item].no_of_people} People</span></li>
                                    </ul>
                                </View>
                                <View >
                                    <ul style={styles.ulclass}>
                                        <li style={{ textAlign: "right", listStyle: "none" }}>
                                            <Text style={{ color: "#9252AA", fontSize: "16px", fontWeight: "bolder" }}>Total Payment</Text>
                                        </li>
                                        <li style={{ textAlign: "right", listStyle: "none", paddingTop: "14px" }}>
                                            <Text style={{ color: "#9252AA", fontSize: "16px", fontWeight: "bold" }}>
                                                {"₹" + "" + orderData[item].payable_amount + ".00"}</Text>
                                        </li>
                                    </ul>

                                </View>
                            </View>
                            <View style={styles.sec}>
                                {/* <View>
                                    <Button
                                        onPress={() => { getOrderId(orderData[item].order_id) }}
                                        title="View Details"
                                        color="#9252AA"
                                    />
                                </View> */}
                                <View>
                                    <TouchableHighlight style={styles.button} underlayColor="#E56352">
                                        <View><Text style={styles.buttonText}>View Details</Text></View>
                                    </TouchableHighlight>
                                </View>

                                <View>
                                    {getOrderStatus(orderData[item].order_status) == "Booked" ?
                                        <TouchableHighlight style={styles.ratingbutton} underlayColor="#E56352" onPress={sendInvite}>
                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                <View><Text style={styles.ratingbuttonText}>Send Invite</Text></View>
                                            </View>
                                        </TouchableHighlight>
                                        :
                                        <TouchableHighlight style={styles.ratingbutton} underlayColor="#E56352">
                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                <View><Image source={require('../../assets/Star 6.png')} style={styles.ratingimage} /></View>
                                                <View><Text style={styles.ratingbuttonText}>Rate Us</Text></View>
                                            </View>
                                        </TouchableHighlight>
                                    }

                                </View>
                            </View>
                        </View>
                    )
                })
            }


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "20px",
        backgroundColor: 'white'
    },
    sec: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingBottom: "16px",
        paddingLeft: "20px",
        paddingRight: "20px"
    },
    ulclass: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingBottom: 0,
        paddingTop: "5px",
        paddingLeft: 0,
        paddingRight: 0
    },
    ulclass1: {
        marginTop: "12px",
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0
    },
    sec1: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderRadius: "20px 20px 0 0",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        paddingTop: "6px",
        paddingBottom: "6px",
        paddingRight: "6px",
        paddingLeft: "6px",
        backgroundColor: "#E7E7E7",
        color: "#9252AA",
        fontWeight: "bold"
    },
    ratingbutton: {
        marginTop: 0,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#9252AA",
        border: "1px solid #9252AA",
        color: "#fff",
        paddingTop: "3px",
        paddingBottom: "3px",
        paddingLeft: "10px",
        paddingRight: "10px",
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    ratingbuttonText: {
        fontWeight: 400,
        fontSize: "14px",
        color: "#fff"
    },
    ratingimage: {
        width: "13px",
        height: "13px",
        position: "relative",
        marginRight: "7px",
        position: "relative"
    },
    button: {
        paddingTop: "3px",
        paddingBottom: "3px",
        paddingLeft: "10px",
        paddingRight: "10px",
        backgroundColor: '#fff',
        border: "1px solid #9252AA",
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontWeight: 400,
        fontSize: "14px",
        color: "#9252AA"
    },
    orderstatus: {
        paddingRight: "15px"
    }
})
export default Orderlist;
