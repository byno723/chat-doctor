import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, ChatItem, InputChat} from '../../components';
import {
  fonts,
  colors,
  getData,
  ShowError,
  getChatTime,
  setDateChat,
} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {Fire} from '../../config';

export default function Chating({navigation, route}) {
  //mengambil parameter
  const dataDoctor = route.params;
  //state
  const [chatContent, setChatContent] = useState('');
  //state untuk local storage
  const [user, setUser] = useState({});
  //state untuk looping data chat
  const [chatData, setChatData] = useState([]);

  //untuk menangkap data diri dari local storage
  useEffect(() => {
    getDataUserFromLocal();

    //mendapatkan data chattingan
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatID}/allChat/`;
    Fire.database()
      .ref(urlFirebase)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const allDataChat = [];
          Object.keys(dataSnapshot).map(key => {
            const dataChat = dataSnapshot[key];
            const newDataChat = [];

            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });

            allDataChat.push({
              id: key,
              data: newDataChat,
            });
          });
          setChatData(allDataChat);
        }
      });
  }, [dataDoctor.data.uid, user.uid]);

  //fungsi data local
  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  //fungsi send message
  const chatSend = () => {
    const today = new Date();
    //tangkap data sebelum dikirim ke firebase
    const data = {
      sendBy: user.uid,
      //timeStamp
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    //variabel
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
    //untuk histori chat
    const urlMessageUser = `messages/${user.uid}/${chatID}`;
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };
    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    //krim ke firebase gabungan dengan iduser dan iddokter kedalam tabel chating->allchat
    Fire.database()
      .ref(urlFirebase)
      .push(data)
      .then(() => {
        setChatContent('');
        //untuk history chat ke message for user
        Fire.database()
          .ref(urlMessageUser)
          .set(dataHistoryChatForUser);

        //untuk history chat ke message for doctor
        Fire.database()
          .ref(urlMessageDoctor)
          .set(dataHistoryChatForDoctor);
      })
      .catch(err => {
        ShowError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.category}
        photo={{uri: dataDoctor.data.photo}}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* looping data chat */}
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : {uri: dataDoctor.data.photo}}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  chatDate: {
    fontFamily: fonts.prirmary.normal,
    fontSize: 14,
    textAlign: 'center',
    color: colors.text.secondary,
  },
});
