import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetailsSection = ({ OrderDetail }) => {
    console.log("OrderDetailsec" + OrderDetail)
    // console.log("OrderDetail.order_time" + OrderDetail.order_time)
    // console.log("OrderDetail.order_date" + OrderDetail.order_date)
    const [orderId, setorderId] = useState('')
    const [orderDate , setOrderDate] = useState('')
    const getOrderId = async () => {
        setorderId(await AsyncStorage.getItem("orderId"))
        console.log(orderId)
    }
    useEffect(() => {
        getOrderId()
    }, [])
    const getOrderStatus = (orderStatusValue) => {
        console.log("orderStatusValue" + orderStatusValue)
        if (orderStatusValue === 1) {
            return "1"
        }
        if (orderStatusValue == 2) {
            return "2"
        }
        if (orderStatusValue === 3) {
            return "completed"
        }
        if (orderStatusValue === 4) {
            return "4"
        }
        if (orderStatusValue === 5) {
            return "5"
        }
        if (orderStatusValue === 6) {
            return "6"
        }
    }
//    useEffect(()=>{
//     getOrderD();
//    }, [orderDate])
    // const getOrderD = (OrderDetail) => {
    //     const dateValue = OrderDetail.order_date
    //     console.log("dateValue" + dateValue)
    //     var str = dateValue;
    //     var str = str.split("T");
    //     var d1 = new Date(str[0])
    //     var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     var month = months[d1.getMonth()];
    //     var dateValueUpdate = d1.getDate() + " " + month + " , " + d1.getFullYear()
    //     setOrderDate(dateValueUpdate)
    // }
  

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "#9252AA", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "12px", paddingRight: "12px" }}>
                <Text style={{ color: "#fff", fontWeight: "500" , fontSize:"13px"}}>
                    {"OrderId:"}{" "}{orderId}
                </Text>
                <Text><span style={styles.orderstausclass}>{getOrderStatus(OrderDetail.order_status)}</span></Text>
            </View>
            <View style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "12px", paddingRight: "12px" }}>
                <Text><span>
                    <Image source={require('../assets/date.png')} style={{
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
                </Text>
               
             {/* <Text style={styles.orderheadings}>{getOrderD(OrderDetail.order_date)}</Text> */}
              {/* <Text style={styles.orderheadings}>{orderDate}</Text>   */}
              <Text style={styles.orderheadings}>{'05 feb , 2023'}</Text>  

            </View>
            <View style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "12px", paddingRight: "12px" }}>
                <Text><span>
                    <Image source={require('../assets/time-icon.png')} style={{
                        height: 13,
                        width: 13,
                        marginLeft: 15,
                        marginVertical: 46,
                        marginLeft: 0,
                        marginRight: 0,
                        marginTop: 0,
                        marginBottom: 0
                    }} />
                </span></Text>
                <Text style={styles.orderheadings}>{OrderDetail.order_time}</Text>
            </View>
            <View style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "12px", paddingRight: "12px" }}>
                <Text><span><Image source={require('../assets/icon3.png')} style={{
                    height: 13,
                    width: 13,
                    marginLeft: 15,
                    marginVertical: 46,
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 0,
                    marginBottom: 0
                }} /> 
                </span></Text>
                <Text style={styles.orderheadings}>{OrderDetail.no_of_people} {"People"}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DFDFDF',
        display: "flex",
        flexDirection: "row",
        justifyContent: 'inherit',
        alignItems: 'center'
    },
    orderheadings: {
        color: "#9252AA",
        fontWeight: "600",
        fontSize:"11px"
    },
    orderstausclass: {
        backgroundColor: "rgb(169 123 185)",
        display: "inline-block",
        borderRadius: "15px",
        verticalAlign: "middile",
        fontWeight: 500,
        fontSize:"10px",
        color: "#fff",
        textTransform: "capitalize",
        boxShadow: "1px 0px 1px 1px rgb(140 136 141)",
        marginTop: "4px",
        marginLeft: "0",
        marginRight: "0",
        marginBottum: "0",
        paddingTop: "1px",
        paddingBottom: "4px",
        paddingLeft: "12px",
        paddingRight: "12px"
    }
})


export default OrderDetailsSection;