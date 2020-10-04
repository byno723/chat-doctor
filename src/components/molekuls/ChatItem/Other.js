import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, fonts} from '../../../utils';
import {DummyDoctor7} from '../../../assets';

export default function Other({text, date, photo}) {
  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.avatar} />
      <View>
        <View style={styles.chatContent}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 16,
    marginBottom: 20,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 12,
  },
  chatContent: {
    maxWidth: '80%',
    padding: 12,
    paddingRight: 18,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.prirmary.normal,
    color: colors.white,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.prirmary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
