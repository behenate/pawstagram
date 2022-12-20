import CommonContainer from '../containers/CommonContainer';
import { Button, Surface } from 'react-native-paper';
import React from 'react';
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { RootStackParamListTabs } from '../navigation/HomeTabNavigation';
import { Image } from 'react-native';

export default function FavouritesScreen({ navigation }: FavouritesScreenProps) {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <CommonContainer style={{ padding: 20, justifyContent: 'center' }}>
      <Surface style={{ justifyContent: 'center', borderRadius: 20 }}>
        <Image
          style={{ width: '100%', height: '50%', resizeMode: 'contain' }}
          source={{
            uri: 'https://media.istockphoto.com/id/942498970/photo/young-happy-smiling-white-samoyed-dog-or-bjelkier-sammy-sit-outdoor-in-green-spring-meadow.jpg?s=612x612&w=0&k=20&c=11OGTg7VZeq-Vk9EPwZgiFM8ymPNC5OoEwAN3P7eWLo=',
          }}
        />
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </Surface>
    </CommonContainer>
  );
}
type FavouritesScreenProps = MaterialBottomTabScreenProps<RootStackParamListTabs, 'Favourites'>;
