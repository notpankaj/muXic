import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';

const {width, height} = Dimensions.get('window');

function SearchGridSheet(props: SheetProps) {
  const list = props.payload.section;

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          width,
          height: height * 0.99,
        }}></View>
    </ActionSheet>
  );
}

export default SearchGridSheet;
