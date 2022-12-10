import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import {MusicContext} from '../../context/MusicContext';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackNavigatorParamList} from '../../navigation/MainStack';

type HomeScreenNavigationProp =
  NativeStackNavigationProp<MainStackNavigatorParamList>;

const {width} = Dimensions.get('screen');
const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {musicStorage, playSongFormIdx, toggleIsMusicPlaying} = useContext(
    MusicContext,
  ) as any;

  const handleItemPress = async (song: AudioType) => {
    console.log(song);
    navigation.navigate('PlayerScreen');
    playSongFormIdx(song.idx);
    toggleIsMusicPlaying(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>songs</Text>
      </View>

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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingLeft: 20,
    width,
    backgroundColor: COLORS.bgBlack,
  },
  headerWrapper: {
    height: 100,
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: 45,
    fontFamily: FONTS.Regular,
    color: COLORS.textWhite,
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
