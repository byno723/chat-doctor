import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';
import {DummyDoctor9} from '../../../assets';

export default function DarkProfile({onPress, title, photo, desc}) {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-light" onPress={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <Image source={photo} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 20,
  },
  content: {flex: 1},
  avatar: {width: 46, height: 46, borderRadius: 46 / 2},
  name: {
    fontSize: 20,
    fontFamily: fonts.prirmary[600],
    color: colors.white,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.prirmary.normal,
    marginTop: 6,
    textAlign: 'center',
    color: colors.text.subTitle,
    textTransform: 'capitalize',
  },
});
