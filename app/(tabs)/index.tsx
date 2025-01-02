import {
  openDialer,
  sendSMSMessage,
  sendWAMessage,
} from '@/components/actions';
import { sanitizeText } from '@/components/utils';
import { COUNTRIES } from '@/constants/constants';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';
import {
  AppState,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
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

      const cleanNumber = sanitizeText(clipboardText);

      if (!cleanNumber || cleanNumber.match(/[^0-9+]/)) {
        ToastAndroid.show(
          'Clipboard is empty or contains invalid characters',
          ToastAndroid.LONG
        );
        return; // Exit if clipboard is empty
      }

      if (cleanNumber.startsWith('+')) {
        const phoneRegex = /^(\+?\d{1,3})[\s-]?(\d{10,14})$/;
        const match = cleanNumber.match(phoneRegex);

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
        setPhoneNumber(cleanNumber);
      }
    } catch (error) {
      console.error('Clipboard access error:', error);
    }
  };

  function handlePhoneNumberChange(text: string): void {
    if (text == '' || Number(text)) {
      setPhoneNumber(text.trim());
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SendIt 2.0</Text>
      <Text style={styles.subtitle}>Send WhatsApp without saving number.</Text>
      <Text style={styles.caption}>
        Number will automatically pasted form clipboard
      </Text>

      {/* Country Code Selector */}
      <View style={styles.countryInputContainer}>
        <TouchableOpacity
          style={styles.countryCodeButton}
          onPress={() => setModalVisible(true)}
        >
          <Text>
            {selectedCountry?.flag || '🌍'} {selectedCountry?.code || '+00'}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
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

      {clipboardPhoneNumber ? (
        <TouchableOpacity onPress={checkClipboard}>
          <Text style={styles.clipboardText}>
            Clipboard: {clipboardPhoneNumber || 'No phone number found'}
          </Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => openDialer(selectedCountry, phoneNumber)}
        >
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={() => sendWAMessage(selectedCountry, phoneNumber)}
        >
          <Text style={styles.buttonText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smsButton}
          onPress={() => sendSMSMessage(selectedCountry, phoneNumber)}
        >
          <Text style={styles.buttonText}>SMS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
