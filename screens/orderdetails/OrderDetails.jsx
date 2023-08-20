import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderDetailsSection from '../../components/orderDetailsSection';
import OrderDetailsChef from '../../components/OrderDetailsChef';
import OrderDetailsTabs from '../../components/OrderDetailsTabs';
import { ScrollView, TextInput, TouchableHighlight, ImageBackground, KeyboardAvoidingView } from 'react-native';

const OrderDetails = ({ navigation }) => {
    let base_url = 'https://horaservices.com:3000'
    const [orderDetail, setOrderDetail] = useState({})
    const getOrderId = async () => {
        const orderId = await AsyncStorage.getItem("orderId")
        console.log(orderId)
    }
    const handleRating = () => {
        console.log("handleRating")
    }

    useEffect(() => {
        fetchOrderDetails()
        // getOrderId()
    }, [])

    async function fetchOrderDetails() {
        try {
            const response = await fetch(base_url + '/api/order/order_details/v1/645e2485cda2cca13ca86464');
            const responseData = await response.json();
            console.log("orderDetail" + responseData)
            setOrderDetail(responseData.data)
            console.log("orderDetail" + orderDetail)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function cancelOrder (){
        try {
            const response = await fetch(base_url + '/api/order/cancelOrder', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id:"64627058b3592591716bd1c0",
                    Authorisation: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMzQwZjU0OWI1OGUzZGMzOWEwMzUiLCJuYW1lIjoiUmFodWwiLCJlbWFpbCI6IiIsInBob25lIjoiODM4Nzk5OTM4MiIsInJvbGUiOiJzdXBwbGllciIsImlhdCI6MTY3ODk4NDg3OSwiZXhwIjoxNzEwNTIwODc5fQ.PEnGF12sAFsF_idngQZnGR_eSLYweXCOPsq7iTJUMoc"
                })
            }); // Replace with your API endpoint for updating user profile

            // Handle success response
            console.log('Order cancelled successfully');
        } catch (error) {
            // Handle error response
            console.log('Error updating profile:', error);
        }
    }

    



    return (
        <View style={styles.container}>
            <OrderDetailsSection OrderDetail={orderDetail} />
            <View style={styles.innercontainer}>
                <OrderDetailsChef OrderDetail={orderDetail} />
                <OrderDetailsTabs OrderDetail={orderDetail} />
            </View>
            {
                orderDetail.order_status == '4' ?
                    <View>
                        <TouchableHighlight style={styles.ratingbutton} onPress={handleRating} underlayColor="#E56352">
                            <Text style={styles.ratingbuttonText}>Rate Us</Text>
                        </TouchableHighlight>
                    </View> : null
            }
             { orderDetail.order_status == '4' ? '' :
            <View>
               <TouchableHighlight style={styles.ratingbutton} onPress={handleRating} underlayColor="#E56352">
                   <Text style={styles.ratingbuttonText}>Share Menu with Guest</Text>
               </TouchableHighlight>
               <TouchableHighlight style={styles.cancelbutton} onPress={cancelOrder} underlayColor="#E56352">
                   <Text style={styles.cancelbuttonText}>Cancel Order</Text>
               </TouchableHighlight>
           </View>  
            } 
            { orderDetail.order_status == '4' ? '' :
            <View  style={styles.cancelorderbox}>
               <Text>
                <p  style={styles.cancelorderboxtext1}>We Regret to inform you that your order has been canceled!
                we are working hard to make your experience better and hustle free</p>
                <p  style={styles.cancelorderboxtext2}>Contact us for more help!</p>
               </Text>
           </View>  
            } 


        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F2F2",
    },
    innercontainer: {
        paddingLeft: "15px",
        paddingRight: "15px"
    },
    ratingbutton: {
        height: 47,
        backgroundColor: '#9252AA',
        marginHorizontal: 31,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: "20px",
        width: "88%",
        marginTop: "15px",
        marginBottom: "10px",
        marginLeft: "auto",
        marginRight: "auto"
    },
    cancelbutton:{
        height: 47,
        backgroundColor: '#fff',
        border:"1px solid #9252AA",
        marginHorizontal: 31,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: "10px",
        width: "88%",
        marginTop: "1px",
        marginBottom: "20px",
        marginLeft: "auto",
        marginRight: "auto"
    },
    cancelbuttonText:{
        textAlign: 'center', // Center the text horizontally
        color: '#9252AA',
        fontSize: 18,
        fontWeight: '500'
    },
    ratingbuttonText: {
        textAlign: 'center', // Center the text horizontally
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    },
    cancelorderbox:{
    border: "1px solid #F15252",
    backgroundColor: "#FFA4A4",
    width: "87%",
    marginTop: 0,
    marginBottom:0,
    marginLeft:'auto',
    marginRight:'auto',
    paddingTop:0,
    paddingBottom:0,
    paddingLeft:"20px",
    paddingRight: "20px" ,
    marginBottom:"20px"
},
cancelorderboxtext1:{
    fontWeight: 500,
    marginBottom:0
},
cancelorderboxtext2:{
    fontWeight: 500,
    color:"#FF2929",
    textAlign:"center",
    marginTop:0,
    marginBottom:11
}
})


export default OrderDetails;