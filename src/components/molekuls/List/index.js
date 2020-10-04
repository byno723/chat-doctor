import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  IconNext,
  IconEditProfile,
  IconLanguage,
  IconRate,
  IconHelp,
} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function List({profile, desc, name, type, onPress, icon}) {
  const Icon = () => {
    if (icon === 'edit-profile') {
      return <IconEditProfile />;
    }
    if (icon === 'language') {
      return <IconLanguage />;
    }
    if (icon === 'rate') {
      return <IconRate />;
    }
    if (icon === 'help') {
      return <IconHelp />;
    }
    return <IconEditProfile />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? <Icon /> : <Image source={profile} style={styles.avatar} />}

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      {type === 'next' && <IconNext />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  name: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: fonts.prirmary.normal,
    color: colors.text.primary,
  },
  desc: {
    fontFamily: fonts.prirmary[300],
    textTransform: 'capitalize',
    color: colors.text.secondary,
    fontSize: 12,
  },
});
