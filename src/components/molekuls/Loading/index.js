import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {colors, fonts} from '../../../utils';

export default function Loading() {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colors.loadingColors,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.prirmary[600],
    color: colors.primary,
    marginTop: 16,
  },
});
