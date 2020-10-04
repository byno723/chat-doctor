import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {fonts, colors} from '../../../utils';

export default function NewsItem({title, image, date}) {
  return (
    <View style={styles.container}>
      <View style={styles.titlewrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Image source={{uri: image}} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titlewrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.prirmary[600],
    color: colors.text.primary,
    maxWidth: '90%',
  },
  date: {
    fontFamily: fonts.prirmary.normal,
    fontSize: 12,
    marginTop: 4,
    color: colors.text.secondary,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 11,
  },
});
