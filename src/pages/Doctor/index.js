import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  HomeProfile,
  DoctorCategory,
  RatedDoctor,
  NewsItem,
  Gap,
} from '../../components';
import {fonts, colors, ShowError} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {
  JSONCategoryDoctor,
  DummyDoctor8,
  DummyDoctor2,
  DummyDoctor3,
} from '../../assets';
import {Fire} from '../../config';

export default function Doctor({navigation}) {
  //state
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getCategoryDoctor();
    getTopRatedDoctor();
    getNews();
  }, []);

  //top rated doctor
  const getTopRatedDoctor = () => {
    Fire.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then(res => {
        if (res.val()) {
          //parsing data objek ke array firebase
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setDoctors(data);
        }
      })
      .catch(err => {
        ShowError(err.message);
      });
  };
  //category doctor list firebase
  const getCategoryDoctor = () => {
    Fire.database()
      .ref('category_doctor/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setCategoryDoctor(filterData);
        }
      })
      .catch(err => {
        ShowError(err.message);
      });
  };
  //news list firebase
  const getNews = () => {
    Fire.database()
      .ref('news/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setNews(filterData);
        }
      })
      .catch(err => {
        ShowError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrappersection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Mau Konsultasi Dengan Siapa Hari Ini ?
            </Text>
          </View>
          <View style={styles.wrapperscroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map(item => {
                  return (
                    <DoctorCategory
                      key={`category-${item.id}`}
                      category={item.category}
                      //mengirim parameter item
                      onPress={() => navigation.navigate('ChooseDoctor', item)}
                    />
                  );
                })}

                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrappersection}>
            <Text style={styles.sectionlabel}> Top Rated Doctor </Text>
            {doctors.map(doctor => {
              return (
                <RatedDoctor
                  key={doctor.id}
                  name={doctor.data.fullName}
                  desc={doctor.data.profession}
                  avatar={{uri: doctor.data.photo}}
                  //mengirim parameter doctor
                  onPress={() => navigation.navigate('DoctorProfile', doctor)}
                />
              );
            })}

            <Text style={styles.sectionlabel}> Good News </Text>
          </View>
          {/* looping data dari firebase ke news */}
          {news.map(item => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                image={item.image}
                date={item.date}
              />
            );
          })}

          <Gap height={30} />
        </ScrollView>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.prirmary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 220,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperscroll: {
    marginHorizontal: -16,
  },
  sectionlabel: {
    fontSize: 16,
    fontFamily: fonts.prirmary[600],
    marginTop: 30,
    marginBottom: 13,
  },
  wrappersection: {
    paddingHorizontal: 16,
  },
});
