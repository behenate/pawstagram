import CommonContainer from '../containers/CommonContainer';
import { Button, useTheme, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

export default function WelcomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <CommonContainer style={styles.container}>
      <Text style={[theme.fonts.titleLarge, styles.title]}>Welcome to {'\n'}Pawstagram!</Text>
      <Button
        mode={'contained'}
        style={styles.register}
        onPress={() => navigation.navigate('Register')}>
        Join Pawstagram
      </Button>
      <Text style={[theme.fonts.bodyMedium, styles.prompt]}>Already an user?</Text>
      <Button mode={'elevated'} onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
    </CommonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
  register: {
    marginBottom: 20,
  },
  prompt: {
    marginBottom: 10,
  },
});
