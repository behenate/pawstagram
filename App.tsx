// noinspection JSUnusedGlobalSymbols

import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import RegisterScreen from './src/screens/RegisterScreen';
import SuccessScreen, { SuccessScreenParams } from './src/screens/SuccessScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { HomeScreenParams } from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HomeTabNavigation from './src/navigation/HomeTabNavigation';
import PostScreen from './src/screens/PostScreen';

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
            headerTitleAlign: 'center',
            headerTitleStyle: {
              ...theme.fonts.titleMedium,
            },
          }}>
          <Stack.Screen name={'Welcome'} component={WelcomeScreen} />
          <Stack.Screen name={'Login'} component={LoginScreen} />
          <Stack.Screen name={'Register'} component={RegisterScreen} />
          <Stack.Screen name={'Success'} component={SuccessScreen} />
          <Stack.Screen name={'HomeNavigation'} component={HomeTabNavigation} />
          <Stack.Screen name={'Settings'} component={SettingsScreen} />
          <Stack.Screen name={'Post'} component={PostScreen} />
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
  HomeNavigation: HomeScreenParams;
  Settings: undefined;
  Post: PostScreenParams;
};

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  roundness: 10,
  version: 3,
  colors: {
    primary: 'rgb(117,120,196)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(230,230,248)',
    onPrimaryContainer: 'rgb(119,119,124)',
    secondary: 'rgb(92, 93, 114)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(225, 224, 249)',
    onSecondaryContainer: 'rgb(25, 26, 44)',
    tertiary: 'rgb(120, 83, 107)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 216, 238)',
    onTertiaryContainer: 'rgb(46, 17, 38)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(27, 27, 31)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(27, 27, 31)',
    surfaceVariant: 'rgb(228, 225, 236)',
    onSurfaceVariant: 'rgb(70, 70, 79)',
    outline: 'rgb(119, 118, 128)',
    outlineVariant: 'rgb(199, 197, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(48, 48, 52)',
    inverseOnSurface: 'rgb(243, 239, 244)',
    inversePrimary: 'rgb(190, 194, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(245, 242, 255)',
      level2: 'rgb(239, 236, 255)',
      level3: 'rgb(233, 230, 255)',
      level4: 'rgb(231, 228, 255)',
      level5: 'rgb(227, 224, 255)',
    },
    surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
    backdrop: 'rgba(48, 48, 56, 0.4)',
  },
};
