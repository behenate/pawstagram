import * as React from 'react';
import { Button, useTheme, TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { auth, firestore } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState();
  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((r) => {
      const usersRef = collection(firestore, 'users');
      const usersDoc = getDoc(doc(usersRef, r.user.uid)).then((document) => {
        if (!document.exists()) {
          alert("User doesn't exist!");
          return;
        }
        const userData = document.data();
        navigation.navigate('Home', { user: userData });
      });
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email}
          style={styles.input}
          onChangeText={(v) => setEmail(v)}
        />

        <TextInput
          label="Password"
          value={password}
          style={styles.input}
          onChangeText={(v) => setPassword(v)}
        />

        <Button
          mode="contained-tonal"
          loading={isLoading}
          style={styles.button}
          onPress={() => login()}>
          Login
        </Button>
      </View>
    </View>
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
