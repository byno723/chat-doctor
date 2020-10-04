import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, fonts} from '../../../utils';
import IconOnly from './IconOnly';
import BtnIconSend from './BtnIconSend';

//props untuk title bacaan tombol
export default function Button({type, title, onPress, icon, disable}) {
  //send buttonn
  if (type === 'btn-icon-send') {
    return <BtnIconSend disable={disable} onPress={onPress} />;
  }
  //icon
  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPress} />;
  }
  if (disable) {
    return (
      <View style={styles.disablebg}>
        <Text style={styles.disableText}>{title} </Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{title} </Text>
    </TouchableOpacity>
  );
}

//dijadikan function kalau button nya beda warna

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor:
      type === 'secondary'
        ? colors.button.secondary.background
        : colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: 10,
  }),
  text: type => ({
    fontSize: 18,
    fontFamily: fonts.prirmary[600],
    textAlign: 'center',
    color:
      type === 'secondary'
        ? colors.button.secondary.text
        : colors.button.primary.text,
  }),
  disablebg: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.button.disable.background,
  },
  disableText: {
    fontSize: 18,
    fontFamily: fonts.prirmary[600],
    textAlign: 'center',
    color: colors.button.disable.text,
  },
});
