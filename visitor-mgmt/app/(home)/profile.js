import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, Button, Alert, Image } from 'react-native';
import { View, Text } from '../../components/Themed';
import useAuth from '../../hooks/useAuth';
import { getUserProfile, updateUserProfile } from '../../services/network/users';
import PhoneInput from 'react-native-phone-number-input';
import { calling_codes } from '../../constants/ccaMap';

export default function ProfileScreen() {
  const { currentUser } = useAuth();

  // State for profile fields
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callingCode, setCallingCode] = useState(null);
  const [cca, setCca] = useState(calling_codes[callingCode] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const phoneInput = useRef(null);

  useEffect(() => {
    if (currentUser?.uid) {
      getUserProfile({ userID: currentUser.uid })
        .then(userProf => {
          setName(userProf.name);
          setEmail(userProf.email);
          setPhoneNumber(userProf.phone);
          setCallingCode(userProf.callingCode);
          setCca(calling_codes[userProf.callingCode]);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser?.uid) return;

    try {
      await updateUserProfile({ userID: currentUser.uid, name, email, phone: phoneNumber });
      Alert.alert("Profile Updated");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image
        style={styles.avatar}
      />
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        editable={isEditing}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        editable={isEditing}
      />
      {
        phoneNumber &&
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode={cca}
          layout="first"
          onChangeFormattedText={setPhoneNumber}
          withShadow
          containerStyle={styles.input}
          textContainerStyle={{ paddingVertical: 0 }}
          disabled={!isEditing}
        />
      }
      {isEditing ? (
        <Button title="Save Changes" onPress={handleSave} />
      ) : (
        <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});
