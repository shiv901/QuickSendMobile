import { Linking, StyleSheet, Text, View } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.text}>
        This app is a simple way to send WhatsApp messages without saving the
        number. The app automatically paste the copied number into the input
        field.
      </Text>
      <Text style={styles.text}>
        The app is built using React Native and uses the Expo framework. The app
        is open sourced and the code is available on
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://github.com/shiv901/QuickSendMobile/')
          }
        >
          {' '}
          Github
        </Text>
      </Text>
      <Text style={styles.text}>
        The app is developed and maintained by
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://github.com/shiv901')}
        >
          {' '}
          @shiv901
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    marginBottom: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default About;
