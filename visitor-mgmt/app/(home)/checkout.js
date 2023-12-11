import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { updateCheckOutTime } from '../../services/network/visitors';

const CheckOut = () => {
    const [visitorName, setVisitorName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callingCode, setCallingCode] = useState('+1');
    const [isValid, setIsValid] = useState(false);
    const phoneInput = useRef(null);

    useEffect(() => {
        const isPhoneValid = phoneInput?.current?.isValidNumber(phoneNumber)
        const isNameValid = visitorName.length > 0;

        setIsValid(isPhoneValid && isNameValid);
    }, [visitorName, phoneNumber]);

    const handleCheckOut = async () => {
        // Code to handle check-out process
        try {
            const checkOutStatus = await updateCheckOutTime(phoneNumber)
        } catch {
            console.log("Error checking out user", visitorName, phoneNumber)
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={visitorName}
                onChangeText={setVisitorName}
                placeholderTextColor="#666"
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
            <View style={styles.buttonContainer}>
                <Button title="Check Out" onPress={handleCheckOut} color="#007AFF" disabled={!isValid} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        width: '100%',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        borderRadius: 5,
    }
});

export default CheckOut;
