import { User } from '../types/User';
import CommonContainer from '../containers/CommonContainer';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Button, MD3Theme, useTheme } from 'react-native-paper';
import Counter from '../components/Counter';
import { queryIsFollowed } from '../queryFunctions/queryIsFollowed';
import { auth } from '../firebase/config';
import { queryUnfollow } from '../queryFunctions/queryUnfollow';
import { queryFollow } from '../queryFunctions/queryFollow';
import { useDispatch } from 'react-redux';
import { addFollowing, removeFollowing } from '../reducers/currentUserSlice';

export default function ProfileScreen({
  route: {
    params: { id, fullName, avatar, followersCount: initialFollowers, followingCount, postsCount },
  },
}: ProfileScreenProps) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(initialFollowers);
  const currentUserId = auth.currentUser?.uid!;
  const theme = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch();

  useEffect(() => {
    queryIsFollowed(currentUserId, id).then((result) => {
      setIsFollowed(result);
    });
  }, []);

  const toggleFollow = () => {
    isFollowed
      ? queryUnfollow(currentUserId, id).catch((e) => console.error(e))
      : queryFollow(currentUserId, id).catch((e) => console.error(e));
    setFollowersCount(isFollowed ? followersCount - 1 : followersCount + 1);
    isFollowed ? dispatch(removeFollowing(id)) : dispatch(addFollowing(id));
    setIsFollowed(!isFollowed);
  };
  return (
    <CommonContainer style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.innerContainer}>
          <Text style={theme.fonts.headlineMedium}>{fullName}</Text>
          <View style={styles.countersContainer}>
            <Counter label={'followers'} count={followersCount.toString()} />
            <Counter label={'following'} count={followingCount.toString()} />
            <Counter label={'posts'} count={postsCount.toString()} />
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button mode={'elevated'} style={styles.button} onPress={toggleFollow}>
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
        <Button mode={'elevated'} style={styles.button}>
          Message
        </Button>
      </View>
    </CommonContainer>
  );
}
const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 40,
      paddingVertical: 30,
    },
    innerContainer: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 20,
    },
    avatar: {
      borderRadius: 200,
      width: 96,
      height: 96,
      borderColor: theme.colors.primary,
      borderWidth: 4,
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    countersContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonsContainer: {
      display: 'flex',
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      paddingHorizontal: 20,
    },
  });
export type ProfileScreenParams = User;
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
