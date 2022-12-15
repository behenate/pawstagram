import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { Keyboard, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

export default function CommonContainer(props: CommonContainerProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[{ flex: 1, backgroundColor: theme.colors.background }, props.style]}
      onPress={Keyboard.dismiss}
      activeOpacity={1}>
      {props.children}
    </TouchableOpacity>
  );
}

type CommonContainerProps = {
  style?: StyleProp<ViewStyle> | undefined;
  children?: JSX.Element | JSX.Element[];
};
