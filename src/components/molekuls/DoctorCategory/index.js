import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {ILCatUmum, ILCatPsikiater, ILCatObat} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function DoctorCategory({category, onPress}) {
  //kategori icon
  const Icon = () => {
    if (category === 'dokter umum') {
      return <ILCatUmum style={styles.ilustration} />;
    }
    if (category === 'psikiater') {
      return <ILCatPsikiater style={styles.ilustration} />;
    }
    if (category === 'dokter obat') {
      return <ILCatObat style={styles.ilustration} />;
    }
    return <ILCatUmum style={styles.ilustration} />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
      <Text style={styles.label}>Saya Butuh</Text>
      <Text style={styles.category}>{category}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardlight,
    alignSelf: 'flex-start',
    marginRight: 10,
    borderRadius: 10,
    width: 100,
    height: 130,
  },
  ilustration: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.prirmary[300],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.prirmary[600],
    color: colors.text.primary,
  },
});
