import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Layout, Card } from '@ui-kitten/components';

const Home = ({ navigation }) => {
    return (
        <Layout style={styles.container}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('CheckIn')}>
                <Card style={styles.cardContent}>
                    <Text style={styles.text}>Check-In</Text>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('CheckOut')}>
                <Card style={styles.cardContent}>
                    <Text style={styles.text}>Check-Out</Text>
                </Card>
            </TouchableOpacity>
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
    card: {
        width: '80%',
        marginVertical: 10,
    },
    cardContent: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default Home;
