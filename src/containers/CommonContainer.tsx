import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { Keyboard, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

export default function CommonContainer(props: CommonContainerProps) {
  const theme = useTheme();
  return props.useTouchableOpacity === false ? (
    <View style={[{ flex: 1, backgroundColor: theme.colors.background }, props.style]}>
      {props.children}
    </View>
  ) : (
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
  //Using the touchable opacity sometimes breaks scrolling on android
  useTouchableOpacity?: boolean;
};
