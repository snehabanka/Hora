import React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, View, StyleSheet, Text, Image, TextInput, TouchableHighlight, Button, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { BASE_URL, USER_DETAILS_ENDPOINT , USER_MYACCOUNT_ENDPOINT} from '../../utils/ApiConstants';
import CustomHeader from '../../components/CustomeHeader';

const Profile = ({ navigation }) => {
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [customerType, setCustomerType] = useState('Male');
   
    useEffect(() => {
        fetchUserAccount(); // Fetch user profile data on component mount
    }, []);
    const handlelogout = async () => {
        alert("user logged out need to implement")
    }

    const fetchUserAccount = async () => {
        try {
            const response = await fetch(BASE_URL + USER_DETAILS_ENDPOINT); // Replace with your API endpoint
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
            const response = await fetch(BASE_URL +  USER_MYACCOUNT_ENDPOINT , {
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
            alert('Profile updated successfully');
        } catch (error) {
            // Handle error response
            alert('Error updating profile:', error);
        }
    };

    return (
        <View>
          <CustomHeader title={"Profile"} navigation={navigation} />
        <View style={styles.container}>
            <View style={styles.detailsec}>
                <Image source={require('../../assets/profileimage.png')} style={styles.profileimage} />
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
                        editable={false}
                        selectTextOnFocus={false}
                    />
                </View>

                <View style={styles.contentContainer1} >
                    <Image source={require('../../assets/icon-email.png')} style={styles.iconimage} />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter Email"
                        // placeholderTextColor="transparent"
                        style={styles.textInput2} />
                    <Image source={require('../../assets/carbon_edit.png')} style={styles.carbon_edit} />
                </View>

            </View>
            <View>
                <TouchableHighlight style={styles.button} onPress={handleEditAccount} underlayColor='#E56352'>
                    <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableHighlight>
            </View>
            <View>
                <TouchableHighlight style={styles.logoutbutton} onPress={handlelogout} underlayColor='#E56352'>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View><Image source={require('../../assets/logout.png')} style={styles.logoutimage} /></View>
                        <View><Text style={styles.logoutbuttonText}>Log Out</Text></View>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 21,
        backgroundColor: 'white'
    },
    detailsec: {
        backgroundColor: '#F1F1F1',
        paddingTop: 20,
        paddingLeft:15,
        paddingRight:15,
        marginTop: 130,
        paddingBottom: 60,
        borderRadius: 30,
        marginBottom: 40,
        position:"relative"
    },
    profileimage: {
        width: 100,
        height: 100,
        top: -60,
        left: 105,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#9252AA',
        borderRadius: 50
    },
    contentContainer0: {
        marginTop: 57
    },
    iconimage: {
        width: 23,
        height: 23,
        position: 'absolute',
        left: 15,
        top: 15,
        zIndex:111111111111111111
    },
    carbon_edit: {
        width: 17,
        height: 17,
        position: 'absolute',
        right: 20,
        top: 18,
        zIndex:111111111111111111
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
        marginLeft: 0,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 12,
        width: Dimensions.get('window').width * 0.8,
        // paddingTop: 15,
        // paddingBottom: 15,
        height:57,
        paddingLeft: 16,
        paddingRight: 20,
        color: '#9252AA',
        paddingLeft: 50
    },
    textInput: {
        color: '#414',
        fontSize: 13,
        fontWeight: '700',
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 12,
       width: Dimensions.get('window').width * 0.8,
        // paddingTop: 15,
        // paddingBottom: 15,
        height:57,
        paddingLeft: 16,
        paddingRight: 20,
        paddingLeft: 50
    },
    textInput2: {
        color: '#8D8D8D',
        fontSize: 13,
        fontWeight: '700',
        backgroundColor: '#D9D9D9',
        borderRadius: 16,
        width: Dimensions.get('window').width * 0.8,
        // paddingTop: 15,
        // paddingBottom: 15,
        height:57,
        paddingLeft: 16,
        paddingRight: 20,
        paddingLeft: 50
    },
    button: {
        height: 47,
        backgroundColor: '#9252AA',
        marginHorizontal: 31,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 15,
        width: Dimensions.get('window').width * 0.85,
        marginTop: 0,
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
        marginBottom: 220,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        borderColor: '#9252AA',
        color: '#9252AA',
        paddingTop: 11,
        paddingBottom: 11,
        paddingLeft: 21,
        paddingRight: 21,
        borderRadius: 20,
        width: Dimensions.get('window').width * 0.85,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutbuttonText: {
        fontSize: 16,
        color: '#9252AA',
        textAlign: 'center',
    },
    logoutimage: {
        width: 24,
        height: 24,
        position: 'relative',
        marginRight: 7,
        position: 'relative'
    }
});


export default Profile;