import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image , Button} from 'react-native';
import axios from 'axios';


const Contact = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    let base_url = 'https://horaservices.com:3000'
    useEffect(() => {
        fetchContactDetail();
    }, [])

    async function fetchContactDetail() {
        try {
            const response = await fetch(base_url + '/api/setting/details');
            const responseData = await response.json();
            const contactData = responseData.data
            const phone = "+91" + contactData.phone
            setEmail(contactData.email)
            setMobileNumber(phone)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Image source={require('../../assets/contactus.png')} style={styles.image} />
                </View>
                <View style={{ flexDirection: 'column', marginTop: 15, minHeight: 300 }}>
                    <View style={styles.addressdetails}>
                        <Text style={{
                            color: '#979797',
                            fontFamily: 'Roboto-Regular',
                            marginRight: 5,
                            fontSize: 15
                        }}>
                            Call us at
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 7,
                            padding: 10,
                            marginTop: 10,
                            marginBottom: 14,
                            marginLeft: 0,
                            marginRight: 0,
                            boxShadow: "0 0 5px #9f9e9e"
                        }}>
                            <Image source={require('../../assets/call-icon.png')}
                                style={{
                                    height: 49,
                                    marginLeft: 15,
                                    marginVertical: 46,
                                    width: 48,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginTop: 0,
                                    marginBottom: 0
                                }}
                            />
                            <Text style={{
                                color: '#3F3F3F',
                                fontFamily: 'Roboto-Regular',
                                marginRight: 5,
                                fontSize: 16,
                                marginLeft: 30
                            }}>
                                {mobileNumber}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{
                            color: '#979797',
                            fontFamily: 'Roboto-Regular',
                            marginRight: 5,
                            fontSize: 15
                        }}>Email us at</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 7,
                        padding: 10,
                        marginTop: 10,
                        marginBottom: 14,
                        marginLeft: 0,
                        marginRight: 0,
                        boxShadow: "0 0 5px #9f9e9e"
                    }}>
                        <Image source={require('../../assets/email-icon.png')}
                            style={{
                                height: 49,
                                marginLeft: 15,
                                marginVertical: 46,
                                width: 48,
                                marginLeft: 0,
                                marginRight: 0,
                                marginTop: 0,
                                marginBottom: 0
                            }}
                        />
                        <Text style={{
                            color: '#3F3F3F',
                            fontFamily: 'Roboto-Regular',
                            marginRight: 5,
                            fontSize: 16,
                            marginLeft: 30
                        }}>
                            {email}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: "20px",
        paddingRight: "20px",
        backgroundColor: 'white'
    },
    image: {
        height: 320,
        marginLeft: 15,
        marginVertical: 46,
        maxWidth: "100%",
        marginLeft: 0,
        marginRight: 0,
        marginTop: 20,
        marginBottom: 0
    },
    contactnumber: {
        marginTop: 14
    }
});

export default Contact