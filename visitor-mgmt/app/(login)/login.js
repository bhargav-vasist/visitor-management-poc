import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { Link } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth()

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Handle successful login
        } catch (error) {
            // Handle login error
            console.error(error);
        }
    };

    return (
        <Layout style={styles.container}>
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <Input
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                style={styles.input}
            />
            <Button onPress={handleLogin}>Login</Button>
            <Link href={'/signup'}>
                <Text>Sign Up</Text>
            </Link>
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