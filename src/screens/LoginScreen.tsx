import * as React from 'react';
import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Keyboard, StyleSheet, View } from 'react-native';
import { auth, firestore } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { User } from '../types/User';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import CommonContainer from '../containers/CommonContainer';

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('dino@gmail.com');
  const [password, setPassword] = useState('123456');

  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((r) => {
        const usersRef = collection(firestore, 'users');
        getDoc(doc(usersRef, r.user.uid)).then((document) => {
          if (!document.exists()) {
            alert("User doesn't exist!");
            return;
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home', params: { userData: document.data() as User } }],
          });
        });
      })
      .catch((e) => {
        alert(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CommonContainer>
      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email}
          style={styles.input}
          onChangeText={(v) => setEmail(v)}
        />

        <TextInput
          label="Password"
          secureTextEntry={true}
          value={password}
          style={styles.input}
          onChangeText={(v) => setPassword(v)}
        />

        <Button mode="contained-tonal" loading={isLoading} style={styles.button} onPress={login}>
          Login
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
