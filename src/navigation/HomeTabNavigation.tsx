import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen, { HomeScreenParams } from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/store';

const Tab = createMaterialBottomTabNavigator<RootStackParamListTabs>();

export default function HomeTabNavigation(props: HomeTabNavigationProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Pawstagram',
      headerLeft: () => (
        <IconButton
          icon={'account'}
          size={22}
          style={{
            left: -15,
          }}
          iconColor={theme.colors.primary}
          onPress={() => navigation.navigate('Profile', { ...currentUser })}
        />
      ),
      headerRight: () => (
        <IconButton
          icon={'menu'}
          size={20}
          style={{
            // Adding offset, because the default padding is too much, and can't be removed
            left: 10,
          }}
          iconColor={theme.colors.primary}
          onPress={() => navigation.navigate('Settings')}
        />
      ),
    });
  }, []);
  // @ts-ignore
  return (
    <Tab.Navigator initialRouteName={'Home'} backBehavior={'history'}>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chat" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="dog" color={color} size={26} />,
        }}>
        {(p) => (
          <HomeScreen
            {...p}
            // ☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️
            //@ts-ignore
            route={props.route as unknown as RouteProp<RootStackParamListTabs, 'Home'>}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="star" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
}
export type HomeTabNavigationProps = NativeStackScreenProps<RootStackParamList, 'HomeNavigation'>;

export type RootStackParamListTabs = {
  Home: HomeScreenParams;
  Chat: undefined;
  Favourites: undefined;
};
