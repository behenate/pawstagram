import * as React from 'react';
import { Button, useTheme, TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function LoginScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
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
          onPress={() => setIsLoading(!isLoading)}>
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
