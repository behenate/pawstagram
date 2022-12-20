import CommonContainer from '../containers/CommonContainer';
import { Button, Surface } from 'react-native-paper';
import React from 'react';
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { RootStackParamListTabs } from '../navigation/HomeTabNavigation';
import { Image } from 'react-native';

export default function ChatScreen({ navigation }: ChatScreenProps) {
  return (
    <CommonContainer style={{ padding: 20, justifyContent: 'center' }}>
      <Surface style={{ justifyContent: 'center', borderRadius: 20 }}>
        <Image
          style={{ width: '100%', height: '50%', resizeMode: 'contain' }}
          source={{
            uri: 'https://i.pinimg.com/474x/c4/66/90/c466907bfa75c5598d6a193a589531a4.jpg',
          }}
        />
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </Surface>
    </CommonContainer>
  );
}

type ChatScreenProps = MaterialBottomTabScreenProps<RootStackParamListTabs, 'Chat'>;
