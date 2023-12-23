import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderDetailsSection from '../../components/orderDetailsSection';
import OrderDetailsChef from '../../components/OrderDetailsChef';
import { ScrollView, TextInput, TouchableOpacity, TouchableHighlight, ImageBackground, KeyboardAvoidingView } from 'react-native';
import OrderDetailsMenu from '../../components/OrderDetailsMenu';
import OrderDetailsIngre from '../../components/OrderDetailsIngre';
import CustomHeader from '../../components/CustomeHeader';
import OrderDetailsAppli from '../../components/OrderDetailsAppli';
import { BASE_URL, ORDER_DETAILS_ENDPOINT, ORDER_CANCEL } from '../../utils/ApiConstants';


const OrderDetails = ({ navigation }) => {
    const [orderDetail, setOrderDetail] = useState({})
    const [orderMenu, setOrderMenu] = useState([]);
    const [OrderAppl, setOrderAppl] = useState([]);
    const [orderIngredients, setOrderIngredients] = useState([]);
    const [orderId, setorderId] = useState({})
    const [selectedTab, setSelectedTab] = useState(1);
    const getOrderId = async () => {
        const orderIdupdate = await AsyncStorage.getItem("orderId")
        setorderId(orderIdupdate)
    }
    const handleRating = () => {
        console.log("handleRating")
    }

    const Tabs = ({ onSelectTab }) => (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => onSelectTab(1)}
                style={[
                    styles.tab,
                    selectedTab === 1 ? styles.activeTab : styles.inactiveTab,
                ]}
            >
                <Text style={[styles.tabText, selectedTab === 1 ? styles.activeTabText : styles.inactiveTabText]}>
                    Tab 1
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onSelectTab(2)}
                style={[
                    styles.tab,
                    selectedTab === 2 ? styles.activeTab : styles.inactiveTab,
                ]}
            >
                <Text style={[styles.tabText, selectedTab === 2 ? styles.activeTabText : styles.inactiveTabText]}>
                    Tab 2
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onSelectTab(3)}
                style={[
                    styles.tab,
                    selectedTab === 3 ? styles.activeTab : styles.inactiveTab,
                ]}
            >
                <Text style={[styles.tabText, selectedTab === 3 ? styles.activeTabText : styles.inactiveTabText]}>
                    Tab 3
                </Text>
            </TouchableOpacity>
        </View>
    );

    const handleTabChange = (tabNumber) => {
        setSelectedTab(tabNumber);
    };

    useEffect(() => {
        fetchOrderDetails()
        getOrderId()
    }, [])

    async function fetchOrderDetails() {
        try {
            // const response = await fetch(BASE_URL + '/api/order/order_details/v1/645e2485cda2cca13ca86464');
            const response = await fetch(BASE_URL + ORDER_DETAILS_ENDPOINT + '/v1/645e2485cda2cca13ca86464');
            const responseData = await response.json();
            setOrderDetail(responseData.data)
            setOrderMenu(responseData.data.selecteditems)
            setOrderAppl(responseData.data.orderApplianceIds)
            setOrderIngredients(responseData.data.ingredientUsed)
            console.log("orderDetail1111" + orderDetail)
            console.log("orderIngredients" + orderIngredients)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function cancelOrder() {
        try {
            const response = await fetch(BASE_URL + ORDER_CANCEL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: "64627058b3592591716bd1c0",
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

        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <CustomHeader title={"Order Details"} navigation={navigation} />
            <View style={styles.container}>
                <OrderDetailsSection OrderDetail={orderDetail} />
                {/* {
                        orderDetail.order_status == '4' ?
                            <OrderDetailsChef OrderDetail={orderDetail} />
                            : null
                    } */}
                <View  style={styles.tabSec}>
                <Tabs onSelectTab={handleTabChange} />
                {selectedTab === 1 ? <OrderDetailsMenu OrderMenu={orderMenu} /> : selectedTab === 2 ? <OrderDetailsAppli OrderAppl={OrderAppl} /> : <OrderDetailsIngre OrderMenu={orderMenu} />}

                </View>
               
                <View>
                    {
                        orderDetail.order_status == '4' ?
                            <View>
                                <TouchableHighlight style={styles.ratingbutton} onPress={handleRating} underlayColor='#E56352'>
                                    <Text style={styles.ratingbuttonText}>{'Rate Us'}</Text>
                                </TouchableHighlight>
                            </View> : null
                    }
                </View>
                <View>
                    {orderDetail.order_status == '4' ? '' :
                        <View>
                            <TouchableHighlight style={styles.ratingbutton} onPress={handleRating} underlayColor='#E56352'>
                                <Text style={styles.ratingbuttonText}>{'Share Menu with Guest'}</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.cancelbutton} onPress={cancelOrder} underlayColor='#E56352'>
                                <Text style={styles.cancelbuttonText}>Cancel Order</Text>
                            </TouchableHighlight>
                        </View>
                    }
                </View>
                <View>
                    {orderDetail.order_status == '4' ? '' :
                        <View style={styles.cancelorderbox}>
                            <View>
                            <Text style={styles.cancelorderboxtext1}>We Regret to inform you that your order has been canceled! we are working hard to make your experience better and hustle free
                                </Text>
                            </View>
                            <View>
                            <Text style={styles.cancelorderboxtext2}>Contact us for more help!</Text>
                                </View>
                        </View>
                    }
                </View>


            </View>
            </ScrollView>
    )

}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        backgroundColor: '#F2F2F2',
    },
    innercontainer: {
        paddingLeft: 15,
        paddingRight: 15
    },
    tabSec:{
        marginLeft:10,
        marginRight:10,
        marginTop:15,
        borderRadius: 20,
    },
    ratingbutton: {
        height: 47,
        backgroundColor: '#9252AA',
        marginHorizontal: 31,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 20,
        width: '88%',
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    cancelbutton: {
        height: 47,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#9252AA',
        marginHorizontal: 31,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 10,
        width: "88%",
        marginTop: 1,
        marginBottom: 20,
        marginLeft: "auto",
        marginRight: "auto"
    },
    cancelbuttonText: {
        textAlign: 'center', // Center the text horizontally
        color: '#9252AA',
        fontSize: 18,
        fontWeight: "500"
    },
    ratingbuttonText: {
        textAlign: 'center', // Center the text horizontally
        color: 'white',
        fontSize: 18,
        fontWeight: "500"
    },

    cancelorderbox: {
        borderWidth: 1,
        borderColor: '#FFA4A4',
        marginBottom: 40,
        marginLeft: 'auto',
        width:"85%",
        marginRight: 'auto',
        padding: 20, // Use 'padding' instead of separate properties
        borderRadius: 5, // Adjust the value based on your preference
        backgroundColor: 'rgba(255, 164, 164, 0.2)', // Adjust the alpha value as needed
    },
    cancelorderboxtext1: {
        fontWeight: "500",
        marginBottom: 0
    },
    cancelorderboxtext2: {
        fontWeight: "500",
        color: "#FF2929",
        textAlign: "center",
        marginTop: 0,
        marginBottom: 11
    },
    tab: {
        flex: 1,
        padding: 10,
    },
    tabText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    activeTab: {
        backgroundColor: 'white',
    },
    activeTabText: {
        color: "#B16BCB",
    },
    inactiveTab: {
        backgroundColor: '#B8B8B8',
    },
    inactiveTabText: {
        color: '#efefef',
    },
})


export default OrderDetails;