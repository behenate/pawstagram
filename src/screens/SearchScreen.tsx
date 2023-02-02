import CommonContainer from '../containers/CommonContainer';
import { TextInput, useTheme } from 'react-native-paper';
import React, { useEffect, useRef, useState } from 'react';
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { RootStackParamListTabs } from '../navigation/HomeTabNavigation';
import { StyleSheet } from 'react-native';

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import useKeyboardStateChangeListener from '../hooks/useKeyboardStateChangeListener';
import { useSearchBox } from 'react-instantsearch-hooks';
import { InstantSearch, useInfiniteHits } from 'react-instantsearch-hooks-web';
import { UserFromSearch } from '../types/UserFromSearch';
import ProfilesList from '../components/ProfilesList';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch('71LXLQU5UT', '55c4e887e440b575c613d084bea504c6');

export default function SearchScreen({}: FavouritesScreenProps) {
  return (
    <InstantSearch searchClient={searchClient} indexName="users">
      <SearchScreenContent />
    </InstantSearch>
  );
}

function SearchScreenContent() {
  const theme = useTheme();
  const { refine } = useSearchBox();

  const { hits, isLastPage, showMore } = useInfiniteHits();
  useRef(null);
  const [searchText, setSearchText] = useState('');
  const animatedHeight = useSharedValue<number>(100);

  const { setOnKeyboardShow, setOnKeyboardHide } = useKeyboardStateChangeListener();

  const onSearchChange = (change: string) => {
    setSearchText(change);
    refine(change);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      maxHeight: withSpring(animatedHeight.value, {
        damping: 10,
        mass: 0.5,
        stiffness: 100,
      }),
      marginTop: withSpring(animatedHeight.value == 0 ? 0 : 30),
      marginBottom: withSpring(animatedHeight.value == 0 ? 0 : 20),
    };
  });

  useEffect(() => {
    setOnKeyboardShow(() => () => {
      animatedHeight.value = 0;
    });
    setOnKeyboardHide(() => () => {
      animatedHeight.value = 100;
    });
  }, []);

  return (
    <CommonContainer style={styles.container}>
      <Animated.Text style={[animatedStyles, theme.fonts.headlineMedium, styles.titleText]}>
        Search for friends
      </Animated.Text>
      <TextInput
        dense={true}
        mode={'flat'}
        label={searchText.length < 4 ? 'Type to find your friends' : 'username'}
        value={searchText}
        onChangeText={(text) => onSearchChange(text)}
        style={styles.textInput}
      />

      <ProfilesList
        profiles={
          hits.map((hit) => ({
            id: hit.objectID,
            avatar: hit.avatar,
            fullName: hit.fullName,
            description: hit.description,
          })) as UserFromSearch[]
        }
        onEndReached={() => !isLastPage && showMore()}
      />
    </CommonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 40,
    paddingTop: 10,
  },
  titleText: {
    fontWeight: 'bold',
  },
  textInput: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 0.2,
    elevation: 5,
  },
});
type FavouritesScreenProps = MaterialBottomTabScreenProps<RootStackParamListTabs, 'Search'>;
