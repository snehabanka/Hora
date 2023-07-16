import React, { useState, useRef, useEffect } from 'react';
import { ScrollView,StatusBar,View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight,BackHandler } from 'react-native';
import styles from './style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {

    const [mobileNumber, setMobileNumber] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [timer, setTimer] = useState(0);
    const [validOtp, setValidOtp] = useState(undefined);
    let fetchedOtp='1234'

    useEffect(() => {
        const backAction = () => {
          BackHandler.exitApp(); // Close the app
          return true; // Prevent default back button behavior
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => {
          backHandler.remove();
        };
      }, []);


    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text === '' && index > 0) {
            // Move the cursor to the previous input on backspace
            inputRefs.current[index - 1].focus();
        } else if (text.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }

        if (newOtp.join('').length === 4) {
            validateOtp(newOtp.join(''));
        } else {
            setValidOtp(undefined);
        }
    };

    const handleMobileNumberChange = (text) => {
        if (text.length <= 10) {
            setMobileNumber(text);
        }
    };

    const handleResendOtp = () => {
        setTimer(30);
        setOtp(['', '', '', ''])
        inputRefs.current[0].focus();
        setValidOtp(undefined);
        fetchOtp();
    };

    const fetchOtp = async () => {
        const apiKey = 'YOUR_API_KEY';
        try {
            const response = await axios.get('https://www.fast2sms.com/dev/bulk', {
                params: {
                    authorization: apiKey,
                    numbers: mobileNumber,
                },
            });

            if (response.data.return === true) {
                console.log('OTP sent successfully');
                fetchedOtp = response.data.otp;
            } else {
                console.log('OTP sending failed');
            }
        } catch (error) {
            console.log('Error sending OTP:', error.message);
        }
    };

    const setData = async() =>{
        AsyncStorage.setItem("isLoggedIn","true")
    }

    const validateOtp = (enteredOtp) => {
        if (fetchedOtp != null) {
            if (enteredOtp === fetchedOtp) {
                setValidOtp(true);
                setData()
                navigation.navigate('Home');
            } else {
                setValidOtp(false);
            }
        }
    };

    useEffect(() => {
        let intervalId;
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [timer]);

    const handlePress = () => {
        if (mobileNumber.length < 10) {
            console.warn('Invalid Mobile Number');
        } else {
            setIsPressed(true);
            setValidOtp(undefined)
            fetchOtp();
            setTimer(30);
        }
    };

    const validOtpInputStyle = {
        ...styles.otpInput,
        backgroundColor: validOtp === true ? '#F4FFF6' : validOtp === false ? '#FFF4F7' : undefined,
        borderColor: validOtp === true ? '#4D9058' : validOtp === false ? '#B46B7C' : undefined,
    };


    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <Image source={require('../../assets/login.png')} style={styles.image} />
            <Text style={styles.text1}>Login</Text>
            <Text style={styles.text2}>{isPressed ? 'Verification Code' : 'Mobile Number'}</Text>
            <Text style={styles.text2}>{isPressed ? `Enter Code sent to (+91) ${mobileNumber}` : null}</Text>
            {!isPressed ? (
                <View style={styles.inputContainer}>
                    <TextInput style={styles.prefix} value="+91 | " editable={false} />
                    <TextInput
                        style={styles.input}
                        placeholder="000 000 0000"
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={mobileNumber}
                        onChangeText={handleMobileNumberChange}
                    />
                </View>
            ) : null}
            {!isPressed ? (
                <TouchableHighlight style={styles.button} onPress={handlePress} underlayColor="#E56352">
                    <Text style={styles.buttonText}>GET OTP</Text>
                </TouchableHighlight>
            ) : (
                <View style={styles.otpContainer}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={[
                                validOtp === undefined ? styles.otpInput : validOtpInputStyle,
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            value={otp[index]}
                            onChangeText={(text) => handleOtpChange(text, index)}
                        />
                    ))}
                </View>
            )}

            {isPressed ? (
                <View>
                    {timer === 0 ? (
                        <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
                            <Text style={styles.buttonText}>Resend OTP</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.timerText}>Resend OTP in {timer} seconds</Text>
                    )}
                    {validOtp === false && <Text style={styles.invalidOtpText}>Wrong OTP</Text>}
                </View>
            ) : null}
        </ScrollView>
    );
};

export default Login;
