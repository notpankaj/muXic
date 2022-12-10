import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {FONTS} from '../constants';

type PropType = {
  onPress: () => void;
  word: string;
};

const SIZE = 40;

export default ({onPress, word}: PropType) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: SIZE,
        height: SIZE,
        backgroundColor: 'red',
        marginTop: 10,
        marginLeft: 10,
      }}>
      <Text
        style={{
          fontFamily: FONTS.Regular,
          fontSize: 25,
          marginTop: 8,
          marginLeft: 8,
        }}>
        {word}
      </Text>
    </TouchableOpacity>
  );
};
