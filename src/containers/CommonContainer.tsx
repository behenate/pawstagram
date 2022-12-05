import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleProp, View, ViewStyle } from 'react-native';

export default function CommonContainer(props: CommonContainerProps) {
  const theme = useTheme();
  return (
    <View style={[{ flex: 1, backgroundColor: theme.colors.background }, props.style]}>
      {props.children}
    </View>
  );
}

type CommonContainerProps = {
  style?: StyleProp<ViewStyle> | undefined;
  children?: JSX.Element | JSX.Element[];
};
