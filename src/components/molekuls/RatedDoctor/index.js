import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {DummyDoctor1, IconStar} from '../../../assets';
import {fonts, colors} from '../../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function RatedDoctor({onPress, name, avatar, desc}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.profile}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{desc}</Text>
      </View>
      <View style={styles.rate}>
        <IconStar />
        <IconStar />
        <IconStar />
        <IconStar />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  profile: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.prirmary[600],
    color: colors.text.primary,
  },
  rate: {
    flexDirection: 'row',
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.prirmary.normal,
    color: colors.secondary,
    marginTop: 2,
  },
});
