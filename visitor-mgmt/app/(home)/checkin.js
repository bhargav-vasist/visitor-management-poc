import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, Button, View, Image, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { departmentsList } from '../../constants/departments';
import PhoneInput from 'react-native-phone-number-input';
import { createVisitorProfile, createVisitorVisit, getVisitorProfile } from '../../services/network/visitors';

const CheckIn = () => {
    const [visitorEmail, setVisitorEmail] = useState('')
    const [visitorName, setVisitorName] = useState('');
    const [department, setDepartment] = useState(departmentsList[0]);
    const [pointOfContact, setPointOfContact] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callingCode, setCallingCode] = useState('+1');
    const [isValid, setIsValid] = useState(false);
    const phoneInput = useRef(null);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(visitorEmail);
        const isPhoneValid = phoneInput?.current?.isValidNumber(phoneNumber)
        const isNameValid = visitorName.length > 0;

        setIsValid(isPhoneValid && isNameValid);
    }, [visitorName, phoneNumber]);

    const handleCheckIn = async () => {
        // Code to handle check-in process
        let isVisitorProfile = await getVisitorProfile(phoneNumber)
        if (!isVisitorProfile) {
            isVisitorProfile = await createVisitorProfile({ name: visitorName, phone: phoneNumber, email: visitorEmail, callingCode: callingCode })
        }
        console.log("isVisitorProfile", isVisitorProfile)
        await createVisitorVisit({ phone: phoneNumber, email: visitorEmail, department: department, pointOfContact: pointOfContact })
    };

    const pickImage = async () => {
        // Code for picking an image
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={visitorName}
                onChangeText={setVisitorName}
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
            <Picker
                selectedValue={department}
                onValueChange={setDepartment}
                style={styles.picker}
            >
                {departmentsList.map((dept, index) => (
                    <Picker.Item key={index} label={dept} value={dept} />
                ))}
            </Picker>
            <TextInput
                style={styles.input}
                placeholder="Here to see..."
                value={pointOfContact}
                onChangeText={setPointOfContact}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <Text>Select Visitor's Picture</Text>
            </TouchableOpacity>
            {profileImage && (
                <Image source={{ uri: profileImage }} style={styles.image} />
            )}
            <View style={styles.buttonContainer}>
                <Button
                    title="Check In"
                    onPress={handleCheckIn}
                    color="#007AFF"
                    disabled={!isValid}
                />
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
    },
    picker: {
        width: '100%',
        marginVertical: 10,
    },
    imagePicker: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        borderRadius: 5,
    }
});

export default CheckIn;
