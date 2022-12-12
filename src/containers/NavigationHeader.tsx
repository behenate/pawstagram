import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function NavigationHeader(props: NavigationHeaderProps) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {props.leftComponent ? props.leftComponent : <View />}
      <Text style={[theme.fonts.titleMedium, styles.title]}>{props.children}</Text>
      {props.rightComponent ? props.rightComponent : <View />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // React navigation adds margin on the left by default
    left: -15,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {},
});

export type NavigationHeaderProps = {
  children?: string;
  tintColor?: string;
  leftComponent?: JSX.Element | JSX.Element[];
  rightComponent?: JSX.Element | JSX.Element[];
};
