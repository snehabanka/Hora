import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetailsChef = ({ OrderDetail }) => {

    useEffect(() => {
        // getOrderId()
    }, [])
    return (
        <View style={styles.container}>
            {OrderDetail.order_status == '4' ? '' :
                <View>
                    <Image source={require('../assets/Frame.png')} style={styles.chefimage} />
                </View>
            }
            {/* <Text style={{ fontSize: "14px", fontWeight: "700" }}>Chef Details</Text> */}
            {/* <View style={styles.chefmidsec}>
                <Text>
                    <Image source={require('../assets/Ellipse.png')} style={styles.image} />
                </Text>
                <Text style={{ fontSize: "14px", fontWeight: "600" }}>Rahul Kumar Gupta</Text>
                <Text>
                    <Button
                        onPress={() => Alert.alert('Button with adjusted color pressed')}
                        title="Rate Us"
                        color="#9252AA"
                    />
                </Text>
            </View> */}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingTop: "10px"
    },
    chefmidsec: {
        display: "flex",
        justifyContent: 'space-around',
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: "10px",
        marginTop: "10px"
    },
    image: {
        height: 59,
        width: 59,
        marginLeft: 15,
        marginVertical: 46,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        boxShadow: "0 0 5px #9f9e9e",
    },
    chefimage: {
        height: 179,
        maxWidth: "100%",
        borderRadius: "10px",
        marginBottom: "10px",
        boxShadow: "0 0 5px #9f9e9e",
    },
    imagebanner: {
        backgroundSize: "contain",
        opacity: 1,
        // boxShadow: "0 0 5px #9f9e9e",
    }
})


export default OrderDetailsChef;