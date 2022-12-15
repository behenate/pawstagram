// noinspection JSUnusedGlobalSymbols

import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import RegisterScreen from './src/screens/RegisterScreen';
import SuccessScreen, { SuccessScreenParams } from './src/screens/SuccessScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen, { HomeScreenParams } from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import NavigationHeader from './src/components/NavigationHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // @ts-ignore
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primaryContainer,
            },
            headerTitleStyle: {
              ...theme.fonts.titleMedium,
            },
            headerTitle: (props) => <NavigationHeader {...props} />,
          }}>
          <Stack.Screen name={'Welcome'} component={WelcomeScreen} />
          <Stack.Screen name={'Login'} component={LoginScreen} />
          <Stack.Screen name={'Register'} component={RegisterScreen} />
          <Stack.Screen name={'Success'} component={SuccessScreen} />
          <Stack.Screen name={'Home'} component={HomeScreen} />
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
  Home: HomeScreenParams;
};

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  roundness: 10,
  version: 3,
};
