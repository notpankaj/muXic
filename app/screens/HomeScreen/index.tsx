import React, {useContext, useRef, useState} from 'react';
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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackNavigatorParamList} from '../../navigation/MainStack';
import {SCREEN_LIST} from './data';
import SongFragment from './SongFragment';
import ArtistFragment from './ArtistFragment';
import WordGridModal from '../../modal/WordGridModal';

type HomeScreenNavigationProp =
  NativeStackNavigationProp<MainStackNavigatorParamList>;

const {width, height} = Dimensions.get('screen');
const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {musicStorage, playSongFormIdx, toggleIsMusicPlaying} = useContext(
    MusicContext,
  ) as any;

  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef();
  const bottomRef = useRef();

  function scrollListToIndex(index: number) {
    setActiveIndex(index);

    bottomRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    topRef.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  }
  return (
    <View style={styles.container}>
      <WordGridModal />
      <FlatList
        ref={topRef}
        data={SCREEN_LIST}
        scrollEnabled={false}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const isLastItem = Boolean(index === SCREEN_LIST.length - 1);
          return (
            <TouchableOpacity
              onPress={() => {
                scrollListToIndex(index);
              }}
              style={{
                paddingRight: 10,
                flex: isLastItem ? 1 : 0,
                width: isLastItem ? width : 'auto',
              }}>
              <Text
                style={[
                  styles.headerText,
                  {
                    color:
                      index === activeIndex
                        ? COLORS.textWhite
                        : COLORS.textGray,
                  },
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <FlatList
        showsHorizontalScrollIndicator={false}
        ref={bottomRef}
        data={SCREEN_LIST}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={ev => {
          const index = Math.ceil(ev.nativeEvent.contentOffset.x / width);
          scrollListToIndex(index);
        }}
        renderItem={({item, index}) => {
          if (item === SCREEN_LIST[0]) {
            return <SongFragment />;
          }
          if (item === SCREEN_LIST[3]) {
            return <ArtistFragment />;
          }
          return (
            <View
              style={{
                width,
                height,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>{item}</Text>
            </View>
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
    width,
    backgroundColor: COLORS.bgBlack,
    // backgroundColor: '#000',
  },
  headerWrapper: {
    height: 100,
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: 45,
    paddingHorizontal: 10,
    fontFamily: FONTS.Regular,
    color: COLORS.textWhite,
  },
});
