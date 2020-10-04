import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

export default function IsMe({text, date}) {
  return (
    <View style={styles.container}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    paddingRight: 16,
    marginBottom: 20,
  },
  chatContent: {
    maxWidth: '70%',
    padding: 12,
    paddingRight: 18,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    backgroundColor: colors.cardlight,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.prirmary.normal,
    color: colors.text.primary,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.prirmary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
