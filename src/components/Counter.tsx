import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';

export default function Counter({ count, label, style }: CounterProps) {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.countText}>{count}</Text>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
}

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    countText: {
      ...theme.fonts.titleMedium,
      marginBottom: -5,
    },
    labelText: {
      ...theme.fonts.bodySmall,
    },
  });
type CounterProps = {
  count: string;
  label: string;
  style?: ViewStyle;
};
