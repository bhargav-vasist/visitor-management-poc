import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Layout, Input, Button } from '@ui-kitten/components';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import useAuth from '../../hooks/useAuth';

import { auth } from '../../firebaseConfig';
const SignUp = () => {
    // const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // US phone number format: (XXX) XXX-XXXX
        const isEmailValid = emailRegex.test(email);
        const isPhoneValid = true
        // phoneRegex.test(phoneNumber);
        const isPasswordValid = password.length > 6; // Simple validation for password length
        const isNameValid = name.length > 0;

        setIsValid(isEmailValid && isPhoneValid && isPasswordValid && isNameValid);
    }, [email, password, name, phoneNumber]);

    const handleSignUp = async () => {
        if (!isValid) return;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Handle successful sign-up

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
            <Input
                placeholder="Phone Number* (e.g. (123) 456-7890)"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                style={styles.input}
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
