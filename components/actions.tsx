import { ICOUNTRY } from '@/types/common';
import { Alert, Linking, Platform } from 'react-native';
import { getFullPhoneNumber, isValidPhoneNumber } from './utils';

export const sendSMSMessage = (
  selectedCountry: ICOUNTRY,
  phoneNumber: string
) => {
  const fullNumber = getFullPhoneNumber(selectedCountry, phoneNumber);
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

export const sendWAMessage = (
  selectedCountry: ICOUNTRY,
  phoneNumber: string
) => {
  const fullNumber = getFullPhoneNumber(selectedCountry, phoneNumber);
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

export const openDialer = (selectedCountry: ICOUNTRY, phoneNumber: string) => {
  const fullNumber = getFullPhoneNumber(selectedCountry, phoneNumber);
  Linking.openURL(`tel:${fullNumber}`).catch((err) => {
    console.error('Dialer open error:', err);
    Alert.alert('Error', 'Could not open dialer');
  });
};
