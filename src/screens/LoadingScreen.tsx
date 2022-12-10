import * as React from 'react';
import CommonContainer from '../containers/CommonContainer';
import { ActivityIndicator } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function LoadingScreen() {
  return (
    <CommonContainer style={styles.container}>
      <ActivityIndicator size={'large'}></ActivityIndicator>
    </CommonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
