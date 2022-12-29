import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { useTheme } from 'react-native-paper';

export default function Line() {
  const theme = useTheme();
  return (
    <View
      style={{
        borderBottomColor: theme.colors.onSurface,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
}
