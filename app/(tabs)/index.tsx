import { COUNTRIES } from '@/constants/constants';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppState,
  Linking,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/styles';

export default function HomeScreen() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default India
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [clipboardPhoneNumber, setClipboardPhoneNumber] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    checkClipboard();
    // Handle app state changes
    const handleAppStateChange = async (nextAppState: string) => {
      console.log('App state changed:', nextAppState);
      if (nextAppState === 'active') {
        // Add a delay before checking the clipboard
        setTimeout(async () => {
          await checkClipboard();
        }, 500); // Delay of 500ms
      }
    };

    // Add app state change listener
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    // Cleanup subscription
    return () => {
      subscription.remove();
    };
  }, []);

  const checkClipboardPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error('Clipboard permission error:', error);
        return false;
      }
    }
    return true;
  };

  const checkClipboard = async () => {
    try {
      const clipboardText = await Clipboard.getString();
      console.log('Clipboard content:', clipboardText);

      if (!clipboardText) return; // Exit if clipboard is empty

      if (clipboardText.startsWith('+')) {
        const phoneRegex = /^(\+?\d{1,3})[\s-]?(\d{10,14})$/;
        const match = clipboardText.match(phoneRegex);

        if (match) {
          const [, countryCode = '', number] = match; // Extract groups
          console.log('Country Code:', countryCode, 'Number:', number);

          // Ensure the number is always 10 digits
          const cleanedNumber = number.slice(-10);

          const matchedCountry =
            COUNTRIES.find(
              (c) => c.code.replace('+', '') === countryCode.replace('+', '')
            ) || COUNTRIES[0];

          setSelectedCountry(matchedCountry);
          setPhoneNumber(cleanedNumber);
        } else {
          console.log('No valid phone number found in clipboard');
        }
      } else {
        console.log('here??');
        setPhoneNumber(clipboardText);
      }
    } catch (error) {
      console.error('Clipboard access error:', error);
    }
  };

  const isValidPhoneNumber = (number: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/; // 10 digit validation for India
    return phoneRegex.test(number);
  };

  const getFullPhoneNumber = () => {
    return `${selectedCountry.code}${phoneNumber}`;
  };

  const sendWhatsAppMessage = () => {
    const fullNumber = getFullPhoneNumber();
    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert('Invalid Number', 'Please enter a valid phone number');
      return;
    }

    const whatsappUrl = `https://wa.me/${fullNumber.replace(/\D/g, '')}`;
    Linking.openURL(whatsappUrl).catch((err) => {
      console.error('WhatsApp open error:', err);
      Alert.alert('Error', 'Could not open WhatsApp');
    });
  };

  const sendSMSMessage = () => {
    const fullNumber = getFullPhoneNumber();
    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert('Invalid Number', 'Please enter a valid phone number');
      return;
    }

    const smsUrl = Platform.select({
      ios: `sms:${fullNumber}`,
      android: `sms:${fullNumber}?body=`,
    });

    if (smsUrl === undefined) {
      Alert.alert('Error', 'Could not open SMS app');
      return;
    }

    Linking.openURL(smsUrl).catch((err) => {
      console.error('SMS open error:', err);
      Alert.alert('Error', 'Could not open SMS app');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QuickSend</Text>

      {/* Country Code Selector */}
      <View style={styles.countryInputContainer}>
        <TouchableOpacity
          style={styles.countryCodeButton}
          onPress={() => setModalVisible(true)}
        >
          <Text>
            {selectedCountry.flag} {selectedCountry.code}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder='Phone Number'
          keyboardType='phone-pad'
          maxLength={10}
        />
      </View>

      {/* Country Selection Modal */}
      {modalVisible && (
        <View style={styles.modalContainer}>
          {COUNTRIES.map((country) => (
            <TouchableOpacity
              key={country.code}
              style={styles.countryItem}
              onPress={() => {
                setSelectedCountry(country);
                setModalVisible(false);
              }}
            >
              <Text>
                {country.flag} {country.name} ({country.code})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {clipboardPhoneNumber && (
        <TouchableOpacity onPress={checkClipboard}>
          <Text style={styles.clipboardText}>
            Clipboard: {clipboardPhoneNumber}
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={sendWhatsAppMessage}
        >
          <Text style={styles.buttonText}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smsButton} onPress={sendSMSMessage}>
          <Text style={styles.buttonText}>SMS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
