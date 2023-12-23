import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetailsSection = ({ OrderDetail }) => {
    const [orderId, setorderId] = useState('')
    const [orderDate , setOrderDate] = useState('')
    const getOrderId = async () => {
        setorderId(await AsyncStorage.getItem("orderId"))
        console.log("orderId3" , orderId)
    }
    useEffect(() => {
        getOrderId()
    }, [])
    const getOrderStatus = (orderStatusValue) => {
        // console.log("orderStatusValue2" + orderStatusValue)
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
  
    const getOrderD = (e) => {
        try {
          if (!e || typeof e !== 'string') {
            throw new Error('Invalid date format');
          }
      
          const str = e.split("T");
          if (str.length < 2) {
            throw new Error('Invalid date format');
          }
      
          const d1 = new Date(str[0]);
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const month = months[d1.getMonth()];
          const dateValueUpdate = d1.getDate() + " " + month + " , " + d1.getFullYear();
          return dateValueUpdate;
        } catch (error) {
          console.error('Error processing date:', error.message);
          return null; // or handle the error in a way that makes sense for your application
        }
      };
      
   
  

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "#9252AA", paddingTop: 12, paddingBottom: 12, paddingLeft: 12, paddingRight: 12 }}>
                <Text style={{ color: "#fff", fontWeight: "500" , fontSize:13}}>
                    {"OrderId:"}{" "}{orderId}
                </Text>
                <Text style={styles.orderstausclass}>{getOrderStatus(OrderDetail.order_status)}</Text>
            </View>
            <View style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 12, paddingRight: 12 }}>
                <Text>
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
              
                </Text>

           
             <Text style={styles.orderheadings}>{getOrderD(OrderDetail.order_date)}</Text> 
              {/* <Text style={styles.orderheadings}>{orderDate}</Text>  
              {/* <Text style={styles.orderheadings}>{'05 feb , 2023'}</Text>   */}

            </View>
            <View style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 12, paddingRight: 12}}>
                <Text>
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
               </Text>
                <Text style={styles.orderheadings}>{OrderDetail.order_time}</Text>
            </View>
            <View style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 12, paddingRight: 12 }}>
                <Text><Image source={require('../assets/icon3.png')} style={{
                    height: 13,
                    width: 13,
                    marginLeft: 15,
                    marginVertical: 46,
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 0,
                    marginBottom: 0
                }} /> 
                </Text>
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
        fontSize:11
    },
    orderstausclass: 
    {
        backgroundColor: "rgb(169 123 185)",
        borderRadius: 15,
        // verticalAlign: "middile", // This is the invalid property
        fontWeight: "500",
        fontSize: 10,
        color: "#fff",
        textTransform: "capitalize",
        marginTop: 4,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0, // Typo: should be "marginBottom"
        paddingTop: 1,
        paddingBottom: 4, // Typo: should be "paddingBottom"
        paddingLeft: 12,
        paddingRight: 12
      }
})


export default OrderDetailsSection;