// noinspection JSUnusedGlobalSymbols

import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import RegisterScreen from './src/screens/RegisterScreen';
import SuccessScreen, { SuccessScreenParams } from './src/screens/SuccessScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={'Welcome'} component={WelcomeScreen} />
          <Stack.Screen name={'Login'} component={LoginScreen} />
          <Stack.Screen name={'Register'} component={RegisterScreen} />
          <Stack.Screen name={'Success'} component={SuccessScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Success: SuccessScreenParams;
  Register: undefined;
};

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  roundness: 10,
};
