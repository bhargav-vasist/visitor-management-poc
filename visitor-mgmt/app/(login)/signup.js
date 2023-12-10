import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Layout, Input, Button } from '@ui-kitten/components';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import PhoneInput from 'react-native-phone-number-input';
import { createUserProfile } from '../../services/network/users';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callingCode, setCallingCode] = useState('+1');
    const [isValid, setIsValid] = useState(false);
    const phoneInput = useRef(null);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);
        const isPhoneValid = phoneInput?.current?.isValidNumber(phoneNumber)
        const isPasswordValid = password.length > 6; // Simple validation for password length
        const isNameValid = name.length > 0;

        setIsValid(isEmailValid && isPhoneValid && isPasswordValid && isNameValid);
    }, [email, password, name, phoneNumber]);

    const handleSignUp = async () => {
        if (!isValid) return;
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            // Handle successful sign-up
            await updateProfile(userCred.user, {
                displayName: name
            })
            await createUserProfile({
                userID: userCred.user.uid,
                name: name,
                phone: phoneNumber,
                email: email,
                callingCode: callingCode
            })
        } catch (error) {
            // Handle sign-up error
            console.error(error);
        }
    };

    return (
        <Layout style={styles.container}>
            <Input
                placeholder="Email*"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
                autoCapitalize={'none'}
            />
            <Input
                placeholder="Password*"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Input
                placeholder="Name*"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode="US"
                layout="first"
                onChangeText={(text) => {
                    setPhoneNumber(text);
                }}
                onChangeCountry={(country) => {
                    setCallingCode("+" + country.callingCode[0])
                }}
                withShadow
                autoFocus
                containerStyle={{ marginVertical: 8, width: '100%' }}
            />
            <Button onPress={handleSignUp} disabled={!isValid}>
                Sign Up
            </Button>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        marginVertical: 8,
    },
});

export default SignUp;
