import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {ILHospitalBG} from '../../assets/ilustration';
import {fonts, colors} from '../../utils';
import {ListHospital} from '../../components';
import {DummyHospital1, DummyHospital2, DummyHospital3} from '../../assets';
export default function Hospitals() {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>My Hospital </Text>
        <Text style={styles.desc}>3 Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospital
          type="Rumah Sakit"
          name="Medika"
          address="jl. bunga cempaka"
          pic={DummyHospital1}
        />
        <ListHospital
          type="Rumah Sakit"
          name="Hitam Putih"
          address="jl. cempaka"
          pic={DummyHospital2}
        />
        <ListHospital
          type="Rumah Sakit"
          name="Mitra bersama"
          pic={DummyHospital3}
          address="jl. bunga Indah"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    paddingTop: 14,
    marginTop: -30,
  },
  background: {height: 240, paddingTop: 30},
  title: {
    fontSize: 20,
    fontFamily: fonts.prirmary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.prirmary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
});
