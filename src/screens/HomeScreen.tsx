import CommonContainer from '../containers/CommonContainer';
import { Button, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '../../App';
import { User } from '../types/User';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';

export default function HomeScreen({
  route: {
    params: { userData },
  },
}: HomeScreenProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // Adding offset, because the default padding is too much, and can't be removed
        <Button icon={'menu'} contentStyle={{ left: 20 }}>
          {''}
        </Button>
      ),
    });
  }, []);

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
