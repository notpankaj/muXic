import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {MusicContext} from '../context/MusicContext';
import Loading from '../components/Loading';
import DetailScreen from '../screens/DetailScreen';
import PlayerScreen from '../screens/player/PlayerScreen';

export type MainStackNavigatorParamList = {
  HomeScreen: undefined;
  PlayerScreen: undefined;
  DetailScreen: undefined;
};

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

const MainStack = () => {
  const {isReady} = useContext(MusicContext) as any;

  if (!isReady) return <Loading />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
