import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, Profile, Input, Button, Gap, Loading} from '../../components';
import {colors, getData, storeData, ShowError} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import {Fire} from '../../config';

export default function UpdateProfile({navigation}) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
    photoForDB: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : ILNullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setPhoto(tempPhoto);
      setProfile(data);
    });
  }, []);

  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        ShowError('Password kurang dari 6 karater');
      } else {
        updatePassword();
        updateProfileData();
      }
    } else {
      updateProfileData();
    }
  };

  const updatePassword = () => {
    Fire.auth().onAuthStateChanged(user => {
      if (user) {
        user.updatePassword(password).catch(err => {
          ShowError(err.message);
        });
      }
    });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = profile.photoForDB;
    delete data.photoForDB;
    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        storeData('user', data)
          .then(() => {
            navigation.replace('MainApp');
          })
          .catch(() => {
            ShowError('Terjadi Masalah');
          });
      })
      .catch(err => {
        ShowError(err.message);
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };
  //untuk ambil foto dari kamera dan galeri
  const GetImage = () => {
    ImagePicker.showImagePicker(
      {quality: 0.5, maxHeight: 200, maxWidth: 200},
      response => {
        if (response.didCancel) {
          ShowError('oops, anda belum memilih foto !');
        } else {
          const source = {uri: response.uri};
          //menyimpan foto ke  dengan mengupdate data yg sudah ada sama kayak register
          setPhotoForDB(`data:${response.type};base64,${response.data}`);
          setPhoto(source);
        }
      },
    );
  };
  return (
    <>
      <View style={styles.page}>
        <Header title="Update Profile" onPress={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Profile isRemove photo={photo} onPress={GetImage} />
            <Gap height={26} />
            <Input
              label="Full Name"
              value={profile.fullname}
              onChangeText={value => changeText('fullname', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={profile.profesion}
              onChangeText={value => changeText('profesion', value)}
            />
            <Gap height={24} />
            <Input label="Email" value={profile.email} disable />
            <Gap height={24} />
            <Input
              label="Password"
              value={password}
              secureTextEntry
              onChangeText={value => setPassword(value)}
            />
            <Gap height={40} />
            <Button title="Save Profile" onPress={update} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
