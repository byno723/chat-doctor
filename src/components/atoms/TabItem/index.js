import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  IconDoctor,
  IconMessages,
  IconHospital,
  IconDoctorActive,
  IconMessagesActive,
  IconHospitalActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function TabItem({title, active, onPress, onLongPress}) {
  //custom icon
  const Icon = () => {
    if (title === 'Doctor') {
      return active ? <IconDoctorActive /> : <IconDoctor />;
    }
    if (title === 'Messages') {
      return active ? <IconMessagesActive /> : <IconMessages />;
    }
    if (title === 'Hospitals') {
      return active ? <IconHospitalActive /> : <IconHospital />;
    }
    return <IconDoctor />;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: active => ({
    fontSize: 10,
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    marginTop: 4,
    fontFamily: fonts.prirmary[600],
  }),
});
