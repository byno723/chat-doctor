import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {DummyHospital1} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function ListHospital({type, name, address, pic}) {
  return (
    <View style={styles.container}>
      <Image source={pic} style={styles.picture} />
      <View>
        <Text style={styles.title}>{type}</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  picture: {
    width: 80,
    height: 60,
    borderRadius: 11,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: fonts.prirmary.normal,
  },
  address: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: fonts.prirmary[300],
    paddingTop: 6,
  },
});
