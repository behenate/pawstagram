import * as React from 'react';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { auth, firestore } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import CommonContainer from '../containers/CommonContainer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { LogBox } from 'react-native';
import { User } from '../types/User';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const register = async () => {
    setIsLoading(true);
    if (password != confirmedPassword) {
      alert('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const uid = response.user?.uid;
        const data: User = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = collection(firestore, 'users');
        const usersDoc = doc(usersRef, uid);
        setDoc(usersDoc, data).catch((error) => {
          alert(error);
        });
      })
      .catch((error) => {
        alert(error);
      })
      .then(() => {
        console.log('Halo :((');
        navigation.navigate('Success', {
          message: 'Account Created Successfully!',
          buttonText: 'To Login',
          onButtonPress: () => navigation.navigate('Welcome'),
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // @ts-ignore
  return (
    <CommonContainer>
      <View style={styles.container}>
        <TextInput
          label="Full Name"
          value={fullName}
          style={styles.input}
          outlineColor={theme.colors.primary}
          mode={'outlined'}
          onChangeText={(v) => setFullName(v)}
        />
        <TextInput
          label="Email"
          value={email}
          style={styles.input}
          outlineColor={theme.colors.primary}
          mode={'outlined'}
          onChangeText={(v) => setEmail(v)}
        />

        <TextInput
          label="Password"
          value={password}
          style={styles.input}
          outlineColor={theme.colors.primary}
          secureTextEntry={true}
          mode={'outlined'}
          onChangeText={(v) => setPassword(v)}
        />

        <TextInput
          label="Confirm Password"
          value={confirmedPassword}
          style={styles.input}
          outlineColor={theme.colors.primary}
          secureTextEntry={true}
          mode={'outlined'}
          onChangeText={(v) => setConfirmedPassword(v)}
        />

        <Button mode="contained-tonal" loading={isLoading} style={styles.button} onPress={register}>
          Register
        </Button>
      </View>
    </CommonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 30,
    marginHorizontal: 50,
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 50,
  },
  input: {
    marginVertical: 10,
  },
});
