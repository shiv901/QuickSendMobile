export const isValidPhoneNumber = (number: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/; // 10 digit validation for India
  return phoneRegex.test(number);
};

export const getFullPhoneNumber = (
  selectedCountry: { code: string; name: string; flag: string },
  phoneNumber: string
) => `${selectedCountry.code}${phoneNumber}`;

export const sanitizeText = (text: string) => {
  return text.trim().replace(/\s/g, '');
};
