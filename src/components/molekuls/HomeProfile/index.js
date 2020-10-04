import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {DummyUser, ILNullPhoto} from '../../../assets';
import {fonts, colors, getData} from '../../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function HomeProfile({onPress}) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    profesion: '',
  });
  //get data dari local storage untuk update homeprofile
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  }, []);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={profile.photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{profile.fullname}</Text>
        <Text style={styles.profesion}>{profile.profesion}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {width: 46, height: 46, borderRadius: 46 / 2, marginRight: 12},
  name: {
    marginTop: 4,
    fontSize: 16,
    fontFamily: fonts.prirmary[600],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  profesion: {
    fontSize: 14,
    fontFamily: fonts.prirmary[400],
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
});
