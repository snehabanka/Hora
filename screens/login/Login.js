import { View, Text, Button, Image, TextInput, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import styles from './style';
import axios from 'axios';


const Login = () => {
    const [mobileNumber, setMobileNumber] = useState("")
    const [ispressed, setPressed] = useState(false)
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [timer, setTimer] = useState(0)
    const [validOtp, setValidOtp]  =useState(undefined)




    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
    
        if (text.length === 1 && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      };

    const handleMobileNumberChange = (text) => {
        if (text.length <= 10) {
            setMobileNumber(text);
        }
    }
    const handleResendOtp = () => {
        setTimer(30)
        fetchOtp()
        setValidOtp(undefined)
    }

    const fetchOtp = async (mobileNumber) => {
        validateOtp(otp)
        const apiKey = 'Lx6DpivcnsjBbThkmXQurwz7NdJGU0E1YtVPZRlK9MAIS4q2gH5zsmnpr98K6vEGhMofybYxTiJUFRWQ';
      
        try {
          const response = await axios.get('https://www.fast2sms.com/dev/bulk', {
            params: {
              authorization: apiKey,
              numbers: mobileNumber,
            },
          });
      
          if (response.data.return === true) {
            console.log('OTP sent successfully');
            const fetchedotp = response.data.return
            validateOtp(otp)
          } else {
            console.log('OTP sending failed');
          }
        } catch (error) {
          console.log('Error sending OTP:', error.message);
        }
      };

    const validateOtp = (otp)=>{
        if (otp=== 1234) {
            setValidOtp(true)
        }

        console.warn(otp)
    }


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
            console.warn("Invalid Mobile Number")
        }
        else {
            setPressed(true)
            fetchOtp()
            setTimer(30)
        }
    }


    const otpInputStyle = {
        ...styles.otpInput,
        backgroundColor: validOtp ? '#F4FFF6' : '#FFF4F7',
        borderColor: validOtp ? '#4D9058' : '#B46B7C',
      };


    return (
        <View style={styles.container}>
            <Image source={require('../../assets/login.png')} style={styles.image} />
            <Text style={styles.text}>Login</Text>
            <Text style={styles.text2}>{ispressed ? "Verification Code" : "Mobile Number"}</Text>
            <Text style={styles.text2}>{ispressed ? "Enter Code sent to (+91)" + mobileNumber : null}</Text>
            {!ispressed ? (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.prefix}
                        value="+91 | "
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="000 000 0000"
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={mobileNumber}
                        onChangeText={handleMobileNumberChange}
                    />
                </View>) : null}
            {!ispressed ? (
                <TouchableHighlight style={styles.button} onPress={handlePress}
                    underlayColor="#E56352">
                    <Text style={styles.buttonText}>GET OTP</Text>

                </TouchableHighlight>) :
                    <View style={styles.otpContainer}>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={otpInputStyle}
                        keyboardType="numeric"
                        maxLength={1}
                        value={otp[index]}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        onBlur={validateOtp}
                      />
                    ))}
                  </View>
                }
          
                {ispressed ? (
                  <View>
                    {timer === 0 ? (
                      <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
                        <Text style={styles.buttonText}>Resend OTP</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.timerText}>Resend OTP in {timer} seconds</Text>
                    )}
                    {!validOtp ? <Text style={styles.invalidOtpText}>Wrong OTP</Text> : null}
                  </View>
                ) : null}
              </View>
            );
          };
    

export default Login;