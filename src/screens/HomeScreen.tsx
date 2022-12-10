import CommonContainer from '../containers/CommonContainer';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '../../App';
import { User } from '../types/User';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function HomeScreen({
  route: {
    params: { userData },
  },
}: HomeScreenProps) {
  return (
    <CommonContainer style={styles.container}>
      <Text>Welcome! {userData.fullName}</Text>
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
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
