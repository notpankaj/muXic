import React, {memo, useContext, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MusicContext} from '../../context/MusicContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants';
import {buildSectionList} from '../../helpers';

import WordMarker from '../../components/WordMarker';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectWordGridValue,
  wordGridModalToggle,
} from '../../store/features/modal/modalSlice';

const {width} = Dimensions.get('window');
const ArtistFragment = () => {
  const {musicStorage} = useContext(MusicContext) as any;
  const [artistList, setArtistList] = useState([]) as any;

  const word = useSelector(selectWordGridValue);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const listRef = useRef();
  React.useEffect(() => {
    const data = buildSectionList(musicStorage);
    setArtistList(data);
  }, []);

  function scrollToWordLocationByIndex(word: string) {
    function doScroll(idx: number) {
      listRef.current?.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: idx,
      });
    }

    if (word === '#') {
      doScroll(0);
      return;
    }
    if (word === '_') {
      doScroll(artistList.length - 1);
      return;
    }

    let index = null;
    for (let i = 0; i < artistList.length - 1; i++) {
      if (artistList[i].title === word) {
        index = i;
        break;
      }
    }

    if (index !== null) {
      doScroll(index);
    }
  }

  React.useEffect(() => {
    if (!word.length) return;
    scrollToWordLocationByIndex(word);
  }, [word]);
  return (
    <View style={styles.container}>
      <SectionList
        ref={listRef}
        sections={artistList}
        contentContainerStyle={{paddingHorizontal: 5, paddingBottom: 25}}
        keyExtractor={(item, index) => item.id + index}
        renderSectionHeader={({section}) => {
          const index = artistList.indexOf(section);

          return (
            <WordMarker
              word={section.title}
              onPress={() => {
                dispatch(wordGridModalToggle(true));
              }}
            />
          );
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.listBox}>
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

export default memo(ArtistFragment);

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
    fontSize: 20,
    marginRight: 10,
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
