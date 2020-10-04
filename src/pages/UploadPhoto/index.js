import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ILNullPhoto} from '../../assets/ilustration';
import {IconAddPhoto, IconRemovePhoto} from '../../assets/icon';
import {Button, Link, Header, Gap, Loading} from '../../components';
import {colors, fonts, storeData} from '../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {Fire} from '../../config';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

export default function UploadPhoto({navigation, route}) {
  //menerima parameter dengan props route
  const {fullname, profesion, email, uid} = route.params;
  //untuk foto
  const [photoforDB, setphotoforDB] = useState('');
  //jika foto belum ada pilih dari galeri dan camera
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const GetImage = () => {
    ImagePicker.showImagePicker(
      {quality: 0.5, maxHeight: 200, maxWidth: 200},
      response => {
        console.log('Response  ', response);
        if (response.didCancel) {
          showMessage({
            message: 'oops, anda belum memilih foto !',
            backgroundColor: colors.error,
            color: colors.white,
            type: 'info',
          });
        } else {
          const source = {uri: response.uri};
          //menyimpan foto ke  dengan mengupdate data yg sudah ada sama kayak register
          setphotoforDB(`data:${response.type};base64,${response.data}`);
          setPhoto(source);
          setHasPhoto(true);
        }
      },
    );
  };

  const uploadandcontinue = () => {
    //menyimpan foto ke  dengan mengupdate data yg sudah ada sama kayak register ke firbase
    Fire.database()
      .ref('users/' + uid + '/')
      .update({photo: photoforDB});

    //menyimpan update foto ke local storage
    const data = route.params;
    data.photo = photoforDB;
    storeData('user', data);

    navigation.replace('MainApp');
  };
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarwrapper} onPress={GetImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addphoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addphoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullname}</Text>
          <Text style={styles.profesion}>{profesion}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload And Continue"
            onPress={uploadandcontinue}
          />
          <Gap height={30} />
          <Link
            title="skip for this"
            size={16}
            align={'center'}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 64,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatarwrapper: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
  },
  addphoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.prirmary[600],
    textAlign: 'center',
  },
  profesion: {
    fontSize: 18,
    fontFamily: fonts.prirmary.normal,
    textAlign: 'center',
    color: colors.secondary,
    marginTop: 4,
  },
});
