import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, List} from '../../components';
import {DummyDoctor2} from '../../assets';
import {colors} from '../../utils';
import {Fire} from '../../config';

export default function ChooseDoctor({navigation, route}) {
  //menerima parameter props route
  const itemCategoryDoctor = route.params;
  //state
  const [listCategorDoctor, setListCategoryDoctor] = useState([]);
  useEffect(() => {
    callDoctorCategory(itemCategoryDoctor.category);
  }, [itemCategoryDoctor.category]);

  //fungsi doctorcategori
  const callDoctorCategory = category => {
    Fire.database()
      .ref('doctors/')
      .orderByChild('category')
      .equalTo(category)
      .once('value')
      .then(res => {
        //parsing daata objek ke array
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setListCategoryDoctor(data);
        }
      });
  };
  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title={`pilih ${itemCategoryDoctor.category}`}
        onPress={() => navigation.goBack()}
      />
      {listCategorDoctor.map(doctor => {
        return (
          <List
            key={doctor.id}
            type="next"
            profile={{uri: doctor.data.photo}}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            onPress={() => navigation.navigate('DoctorProfile', doctor)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
