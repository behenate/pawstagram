import * as React from 'react';
import { Button, useTheme, Surface, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import CommonContainer from '../containers/CommonContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

export default function SuccessScreen({ route }: SuccessScreenProps) {
  const theme = useTheme();
  return (
    <CommonContainer style={styles.container}>
      <Surface style={styles.surface} elevation={3}>
        <Text style={[styles.textCenter, theme.fonts.headlineMedium]}>{route.params.message}</Text>
        <Button mode={'contained'} onPress={route.params.onButtonPress}>
          {route.params.buttonText}
        </Button>
      </Surface>
    </CommonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    height: 250,
    width: 250,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export type SuccessScreenParams = {
  message: String;
  buttonText: String;
  onButtonPress?: () => void;
};
type SuccessScreenProps = NativeStackScreenProps<RootStackParamList, 'Success'>;
