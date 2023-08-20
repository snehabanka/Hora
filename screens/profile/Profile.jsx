import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, Image, TextInput, TouchableHighlight, Button, ImageBackground, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { color } from '@rneui/base';

const Profile = ({ navigation }) => {
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [customerType, setCustomerType] = useState('Male');
    let base_url = 'https://horaservices.com:3000'
    useEffect(() => {
        fetchUserAccount(); // Fetch user profile data on component mount
    }, []);

    const handlelogout = async () => {
        console.log("user loged out")
    }

    const fetchUserAccount = async () => {
        try {
            const response = await fetch(base_url + '/api/setting/details'); // Replace with your API endpoint
            const userData = await response.json();
            setEmail(userData.data.email);
            setMobileNumber("+91" + " " + userData.data.phone);
            setName("User" + "-" + userData.data.phone);
        } catch (error) {
            console.log('Error fetching user profile:', error);
        }
    };

    const handleEditAccount = async () => {
        try {
            const response = await fetch(base_url + '/api/users/my_account', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: mobileNumber.split(" ")[1],
                    email: email,
                    Authorisation: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMzQwZjU0OWI1OGUzZGMzOWEwMzUiLCJuYW1lIjoiUmFodWwiLCJlbWFpbCI6IiIsInBob25lIjoiODM4Nzk5OTM4MiIsInJvbGUiOiJzdXBwbGllciIsImlhdCI6MTY3ODk4NDg3OSwiZXhwIjoxNzEwNTIwODc5fQ.PEnGF12sAFsF_idngQZnGR_eSLYweXCOPsq7iTJUMoc"
                })
            }); // Replace with your API endpoint for updating user profile

            // Handle success response
            console.log('Profile updated successfully');
        } catch (error) {
            // Handle error response
            console.log('Error updating profile:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.detailsec}>
                <Image source={require('../../assets/profile.png')} style={styles.profileimage} />
                <View style={styles.contentContainer0} >
                    <Image source={require('../../assets/mdi_user-outline.png')} style={styles.iconimage} />
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        //placeholder="Enter your number"
                        // placeholderTextColor="transparent"
                        style={styles.textInput1} />
                        <Image source={require('../../assets/carbon_edit.png')} style={styles.carbon_edit} />

                </View>
                <View style={styles.contentContainer1} >
                <Image source={require('../../assets/material-symbols_call-outline.png')} style={styles.iconimage} />
                    <TextInput
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                        //placeholder="Enter your number"
                        // placeholderTextColor="transparent"
                        style={styles.textInput}
                        disabled="disabled"
                    />
                </View>
                <View style={styles.contentContainer1} >
                <Image source={require('../../assets/icon-email.png')} style={styles.iconimage} />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email"
                        // placeholderTextColor="transparent"
                        style={styles.textInput2} />
                   <Image source={require('../../assets/carbon_edit.png')} style={styles.carbon_edit} />

                </View>

            </View>
            <View>
                <TouchableHighlight style={styles.button} onPress={handleEditAccount} underlayColor="#E56352">
                    <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableHighlight>
            </View>
            <View>
                <TouchableHighlight style={styles.logoutbutton} onPress={handlelogout} underlayColor="#E56352">
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <View><Image source={require('../../assets/logout.png')} style={styles.logoutimage} /></View>
                        <View><Text style={styles.logoutbuttonText}>Log Out</Text></View>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: "20px",
        paddingRight: "21px",
        backgroundColor: 'white'
    },
    detailsec: {
        backgroundColor: "#EEEEEE",
        paddingTop: "20px",
        marginTop: "24%",
        paddingBottom: "50px",
        borderRadius: "30px",
        marginBottom: "40px"
    },
    text: {
        paddingTop: 11,
        font: 14,
        color: '#414141',
        marginLeft: 14,
        fontWeight: '600',
        opacity: 0.6,
    },
    textInput1: {
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 15,
        backgroundColor: "#fff",
        borderRadius: "16px",
        marginBottom: "12px",
        width: "90%",
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "16px",
        paddingRight: "20px",
        color: "#9252AA",
        paddingLeft:"50px"
    },
    textInput: {
        color: '#414',
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 15,
        backgroundColor: "#fff",
        borderRadius: "16px",
        marginBottom: "12px",
        width: "90%",
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "16px",
        paddingRight: "20px",
        paddingLeft:"50px"
    },
    textInput2: {
        color: '#8D8D8D',
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 15,
        backgroundColor: "#D9D9D9",
        borderRadius: "16px",
        marginBottom: "12px",
        width: "90%",
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "16px",
        paddingRight: "20px",
        paddingLeft:"50px"
    },
  
    button: {
        height: 47,
        backgroundColor: '#9252AA',
        marginHorizontal: 31,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: "20px",
        width: "97%",
        marginTop: 0,
        marginBottom: "20px",
        marginLeft: "auto",
        marginRight: "auto"
    },

    buttonText: {
        textAlign: 'center', // Center the text horizontally
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    },
    logoutbutton: {
        marginTop: 0,
        marginBottom: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        border: "1px solid #9252AA",
        color: "#9252AA",
        paddingTop: "11px",
        paddingBottom: "11px",
        paddingLeft: "21px",
        paddingRight: "21px",
        borderRadius: 20,
        width:"99%",
        justifyContent:"center",
        alignItems:"center"
    },
    logoutbuttonText: {
        fontWeight: 600,
        fontSize: "16px",
        color: "#9252AA"
    },
    logoutimage: {
        width: "20px",
        height: "20px",
        position: "relative",
        marginRight: "7px",
        position: "relative"
    },
    profileimage: {
        width: "100px",
        height: "100px",
        top: -60,
        left: 0,
        right: 0,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: "auto",
        marginRight: "auto",
        position: "absolute",
        border: "1px solid #9252AA",
        borderRadius: "50%"
    },
    contentContainer0: {
        marginTop: "57px",
    },
    iconimage:{
        width:23,
        height:23,
        position: "absolute",
        left: 30,
        top: 15
    },
    carbon_edit:{
        width:17,
        height:17,
        position:"absolute",
        right:40,
        top:16
    }
});


export default Profile;