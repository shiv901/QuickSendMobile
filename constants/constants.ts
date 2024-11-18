// Country data
export const COUNTRIES = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
];

export const PHONE_LENGTHS: Record<string, string> = {
  '+1': '10', // US, Canada
  '+91': '10', // India
  '+44': '9', // UK
  '+86': '11', // China
  '+81': '10', // Japan
};
