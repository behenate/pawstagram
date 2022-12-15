import * as React from 'react';
import { useTheme, Surface, Text, MD3Theme } from 'react-native-paper';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import CommonContainer from '../containers/CommonContainer';
import { RootStackParamList } from '../../App';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export default function SettingsScreen() {
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const SettingsGroup = ({ title, children }: SettingsGroupProps) => (
    <>
      <Text style={styles.settingsGroupTitle}>{title}</Text>
      <Surface style={styles.settingsGroup}>{children}</Surface>
    </>
  );

  const SettingsElem = ({ text, iconName, iconText, hideDivider, onPress }: SettingsElemProps) => (
    <>
      <TouchableOpacity style={styles.settingsElem} onPress={onPress}>
        {iconName && (
          <AntDesign
            name={iconName}
            size={15}
            color={theme.colors.onSurface}
            style={styles.settingsElemIcon}
          />
        )}
        {iconText && <Text style={styles.settingsElemIcon}>{iconText}</Text>}
        <Text style={theme.fonts.labelLarge}>{text}</Text>
      </TouchableOpacity>
      {!hideDivider && <View style={styles.elemDividerLine} />}
    </>
  );

  return (
    <CommonContainer style={styles.container}>
      <ScrollView style={{ padding: 20 }}>
        <SettingsGroup title={'Account'}>
          <SettingsElem
            iconText={'🚪'}
            text={'Log Out'}
            onPress={() => {
              signOut(auth).then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Welcome' }],
                });
              });
            }}
          />
          <SettingsElem iconName={'camera'} text={'Test1'} />
          <SettingsElem iconName={'check'} text={'Test2'} hideDivider={true} />
        </SettingsGroup>
      </ScrollView>
    </CommonContainer>
  );
}

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      padding: 30,
    },
    settingsGroup: {
      flex: 1,
      marginBottom: 40,
      marginTop: 13,
      borderRadius: 20,
    },
    settingsGroupTitle: {
      ...theme.fonts.titleLarge,
      fontWeight: 'bold',
    },
    settingsElem: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingsElemIcon: {
      marginRight: 10,
    },
    elemDividerLine: {
      borderBottomColor: theme.colors.onSurface,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });

type SettingsElemProps = {
  iconName?: keyof typeof AntDesign.glyphMap;
  iconText?: string;
  text: string;
  hideDivider?: boolean;
  onPress?: () => void;
};

type SettingsGroupProps = {
  title: string;
  children?: JSX.Element | JSX.Element[];
};
