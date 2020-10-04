import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, Profile, List, Gap} from '../../components';
import {getData, colors, ShowError} from '../../utils';
import {ILNullPhoto} from '../../assets';

import {showMessage, hideMessage} from 'react-native-flash-message';
import {Fire} from '../../config';

export default function UserProfile({navigation}) {
  const [profile, setProfile] = useState({
    fullname: '',
    photo: ILNullPhoto,
    profesion: '',
  });
  useEffect(() => {
    //membaca dari local storage
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  });

  //logout
  const Logout = () => {
    Fire.auth()
      .signOut()
      .then(() => {
        navigation.replace('GetStarted');
      })
      .catch(err => {
        ShowError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullname.length > 0 && (
        <Profile
          name={profile.fullname}
          desc={profile.profesion}
          photo={profile.photo}
        />
      )}

      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        desc="Last Update Yesterday"
        type="next"
        icon="language"
      />
      <List name="Rate" desc="Last Update Yesterday" type="next" icon="rate" />
      <List
        name="Sign Out"
        desc="Last Update Yesterday"
        type="next"
        icon="help"
        onPress={Logout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
});
