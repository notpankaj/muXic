import React, {memo, useContext} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MusicContext} from '../../context/MusicContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackNavigatorParamList} from '../../navigation/MainStack';
type HomeScreenNavigationProp =
  NativeStackNavigationProp<MainStackNavigatorParamList>;

const {width} = Dimensions.get('window');
const SongFragment = () => {
  const {musicStorage, playSongFormIdx, toggleIsMusicPlaying} = useContext(
    MusicContext,
  ) as any;
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const handleItemPress = async (song: AudioType) => {
    console.log(song);
    navigation.navigate('PlayerScreen');
    playSongFormIdx(song.idx);
    toggleIsMusicPlaying(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={musicStorage}
        initialNumToRender={50}
        keyExtractor={item => item.idx}
        ListEmptyComponent={() => {
          return (
            <Text style={{color: 'white'}}>
              THERE ARE NO AUDIO FILES FOUND IN YOUR DEVICE
            </Text>
          );
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.listBox}
              onPress={() => handleItemPress(item)}>
              <TouchableOpacity style={styles.playBtn}>
                <Ionicons name={'caret-forward'} color="white" size={15} />
              </TouchableOpacity>
              <Text style={styles.listText} numberOfLines={1}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default memo(SongFragment);
const styles = StyleSheet.create({
  container: {
    width,
  },
  listBox: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  listText: {
    fontSize: 15,
    fontFamily: FONTS.Regular,
    color: COLORS.textWhite,
  },

  playBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.textWhite,
    borderWidth: 2,
    borderRadius: 20,
    width: 20,
    height: 20,
    marginRight: 15,
    opacity: 0.4,
  },
});
