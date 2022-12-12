import CommonContainer from '../containers/CommonContainer';
import { Button, useTheme, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { collection, doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/config';
import { User } from '../types/User';
import { useEffect, useState } from 'react';
import FullscreenLoading from '../components/FullscreenLoading';

export default function WelcomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(true);
  const persistLogin = () => {
    const usersCollection = collection(firestore, 'users');
    auth.onAuthStateChanged((user) => {
      setIsLoading(true);
      if (user?.uid) {
        getDoc(doc(usersCollection, user.uid))
          .then((document) => {
            if (document.exists() && document.data()) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home', params: { userData: document.data() as User } }],
              });
            }
          })
          .finally(() => setIsLoading(false));
      }
    });
  };

  useEffect(persistLogin, []);
  return isLoading ? (
    <FullscreenLoading />
  ) : (
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
    textAlign: 'center',
    marginBottom: 20,
  },
  register: {
    marginBottom: 20,
  },
  prompt: {
    marginBottom: 10,
    textAlign: 'center',
  },
});
