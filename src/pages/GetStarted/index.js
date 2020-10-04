import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ILGetstarted, ILLogo} from '../../assets';
import {Button, Gap} from '../../components/atoms';

export default function GetStarted({navigation}) {
  return (
    <ImageBackground source={ILGetstarted} style={styles.page}>
      <View>
        <ILLogo />
        <Text style={styles.title}>
          Konsultasi dengan doter jadi lebih mudah dan fleksibel
        </Text>
      </View>
      <View>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Register')}
        />
        <Gap height={16} />
        <Button
          type="secondary"
          title="Sign In"
          onPress={() => navigation.replace('Login')}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'yellow',
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginTop: 91,
    fontFamily: 'Nunito-SemiBold',
  },
});
