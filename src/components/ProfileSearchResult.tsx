import { MD3Theme, Surface, useTheme } from 'react-native-paper';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { UserFromSearch } from '../types/UserFromSearch';
import queryUser from '../queryFunctions/queryUser';

export default function ProfileSearchResult({ foundUser }: ProfileSearchResultProps) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const navigateToUser = async () => {
    const user = await queryUser(foundUser.id);
    navigation.navigate('Profile', user);
  };

  return (
    <Surface style={styles.container}>
      <TouchableOpacity style={styles.innerContainer} onPress={navigateToUser}>
        <Image source={{ uri: foundUser.avatar }} style={styles.avatar} />
        <View>
          <Text style={[theme.fonts.titleMedium, styles.bold]}>{foundUser.fullName}</Text>
          <Text style={theme.fonts.bodySmall}>{foundUser.description}</Text>
        </View>
      </TouchableOpacity>
    </Surface>
  );
}

type ProfileSearchResultProps = {
  foundUser: UserFromSearch;
};
const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      margin: 10,
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 48,
      marginRight: 10,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    bold: {
      fontWeight: 'bold',
    },
  });
