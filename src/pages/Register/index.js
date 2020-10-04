import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Input, Button, Gap, Loading} from '../../components/';
import {colors, UseForm, storeData, getData} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {Fire} from '../../config';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

export default function Register({navigation}) {
  //data dikumpulkan dengan usestate
  const [form, setForm] = UseForm({
    fullname: '',
    profesion: '',
    email: '',
    password: '',
  });

  //loading
  const dispatch = useDispatch();
  //untuk button continue untuk proses ke firebase
  const onContinue = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      //proses firebase register
      .then(success => {
        dispatch({type: 'SET_LOADING', value: false});
        setForm('reset');

        const data = {
          fullname: form.fullname,
          profesion: form.profesion,
          email: form.email,
          uid: success.user.uid,
        };
        Fire.database()
          .ref('users/' + success.user.uid + '/')
          .set(data);

        //proses simpan di local storage
        storeData('user', data);

        //pindah halaman dengan parameter data yg dibawa dari fungsi /'data' yg ada diatas
        navigation.navigate('UploadPhoto', data);
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch({type: 'SET_LOADING', value: false});
        showMessage({
          message: errorMessage,
          backgroundColor: colors.error,
          color: colors.white,
          type: 'info',
        });
      });
  };
  return (
    <>
      <View style={styles.page}>
        <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullname}
              onChangeText={value => setForm('fullname', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={form.profesion}
              onChangeText={value => setForm('profesion', value)}
            />
            <Gap height={24} />
            <Input
              label="Email"
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
            <Gap height={24} />
            <Input
              label="Password"
              value={form.password}
              onChangeText={value => setForm('password', value)}
              secureTextEntry
            />
            <Gap height={40} />
            <Button title="Continue" onPress={onContinue} />
          </ScrollView>
        </View>
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
