import React, { useState, useEffect } from 'react';
import countVisits from "../../services/network/visits";
import { Text, Card } from '@ui-kitten/components';
import { View, StyleSheet, ScrollView } from 'react-native';

const HomeDashboard = () => {
    const [visitorCount, setVisitorCount] = useState({ day: 0, week: 0, month: 0 });

    useEffect(() => {
        const fetchVisitorCounts = async () => {
            const counts = await countVisits();
            setVisitorCount(counts);
        };

        fetchVisitorCounts();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Text category="h5" style={styles.cardTitle}>Visitors Today</Text>
                <Text category="h1" style={styles.cardNumber}>{visitorCount.day}</Text>
            </Card>
            <Card style={styles.card}>
                <Text category="h5" style={styles.cardTitle}>Visitors This Week</Text>
                <Text category="h1" style={styles.cardNumber}>{visitorCount.week}</Text>
            </Card>
            <Card style={styles.card}>
                <Text category="h5" style={styles.cardTitle}>Visitors This Month</Text>
                <Text category="h1" style={styles.cardNumber}>{visitorCount.month}</Text>
            </Card>
            {/* Render list of visitors or charts here */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        margin: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardTitle: {
        textAlign: 'center',
        marginBottom: 5,
    },
    cardNumber: {
        textAlign: 'center',
        fontSize: 36, // Adjust the font size as needed
    }
});

export default HomeDashboard;
