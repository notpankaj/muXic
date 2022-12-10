import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FONTS} from '../constants';
import {
  selectWordGridModalVisibilty,
  setWordGridModaValue,
  wordGridModalToggle,
} from '../store/features/modal/modalSlice';

const {width, height} = Dimensions.get('screen');
const SIZE = 60;

const DATA = [
  ['#', 'A', 'B', 'C'],
  ['D', 'E', 'F', 'G'],
  ['H', 'I', 'J', 'K'],
  ['L', 'M', 'N', 'O'],
  ['P', 'Q', 'R', 'S'],
  ['T', 'U', 'V', 'W'],
  ['X', 'Y', 'Z', '_'],
];

export default ({}) => {
  const visible = useSelector(selectWordGridModalVisibilty);
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(wordGridModalToggle(!visible));
  }
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Row start */}
            {DATA.map((item, index) => {
              return (
                <View key={index.toString()} style={{flexDirection: 'row'}}>
                  {item.map(word => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(setWordGridModaValue(word));
                          closeModal();
                        }}
                        key={word}
                        style={styles.textWrapper}>
                        <Text style={styles.text}>{word}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalView: {
    backgroundColor: 'transparent',
  },
  textWrapper: {
    width: SIZE,
    height: SIZE,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.Medium,
    fontSize: 25,
    color: '#fff',
  },
});
