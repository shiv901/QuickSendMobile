import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  caption: {
    fontSize: 12,
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },
  countryInputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  countryCodeButton: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#777',
    padding: 10,
    borderRadius: 5,
  },
  clipboardText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#264653',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  callButton: {
    backgroundColor: '#4CAF50', // Green color for call button
    padding: 15,
    borderRadius: 5,
    flex: 0.45,
  },
  whatsappButton: {
    backgroundColor: '#25d366',
    padding: 15,
    borderRadius: 5,
    flex: 0.45,
  },
  smsButton: {
    backgroundColor: '#4285f4',
    padding: 15,
    borderRadius: 5,
    flex: 0.45,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    zIndex: 1000,
  },
  countryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pasteButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  pasteButtonText: {
    color: 'white',
  },
});
