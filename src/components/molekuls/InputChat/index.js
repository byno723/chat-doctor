import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';

export default function InputChat({value, onChangeText, onButtonPress}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tulis Pesan..."
        value={value}
        onChangeText={onChangeText}
      />
      <Button
        type="btn-icon-send"
        onPress={onButtonPress}
        disable={value.length < 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: fonts.prirmary.normal,
    flex: 1,
    maxHeight: 45,
    marginRight: 10,
  },
});
