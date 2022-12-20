import CommonContainer from '../containers/CommonContainer';
import { Button, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { User } from '../types/User';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamListTabs } from '../navigation/HomeTabNavigation';

export default function HomeScreen({
  navigation: tabNavigation,
  route: {
    params: { userData },
  },
}: HomeScreenProps) {
  return (
    <CommonContainer style={styles.container}>
      <Text>Welcome! {userData.fullName}</Text>
      <Button onPress={() => tabNavigation.navigate('Chat')}>To chat!</Button>
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
    textAlign: 'center',
    marginBottom: 10,
  },
});

export type HomeScreenParams = {
  userData: User;
};
export type HomeScreenProps = NativeStackScreenProps<RootStackParamListTabs, 'Home'>;
