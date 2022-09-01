/* eslint-disable react/self-closing-comp */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import Config from '../../config';
var state = '';
const BottomBar = ({navigation}) => (
  <View style={styles.main_container}>
    <View style={styles.bar}>
      <Pressable
        style={styles.icon}
        onPress={() => {
          navigation.navigate('Profil');
          state = 'user';
        }}>
        <Image style={styles.icon} source={require('../../icon/user.png')} />
        {state === 'user' ? (
          <Image
            style={styles.substract}
            source={require('../../icon/substract.png')}
          />
        ) : (
          <></>
        )}
      </Pressable>
      <Pressable
        style={styles.icon}
        onPress={() => {
          navigation.navigate('Training');
          state = 'running';
        }}>
        <Image style={styles.icon} source={require('../../icon/running.png')} />
        {state === 'running' ? (
          <Image
            style={styles.substract}
            source={require('../../icon/substract.png')}
          />
        ) : (
          <></>
        )}
      </Pressable>
      <Pressable
        style={styles.icon}
        onPress={() => {
          navigation.navigate('Dashboard');
          state = 'home';
        }}>
        <Image
          style={styles.icon}
          source={require("../../icon/page-d'accueil.png")}
        />
        {state === 'home' ? (
          <Image
            style={styles.substract}
            source={require('../../icon/substract.png')}
          />
        ) : (
          <></>
        )}
      </Pressable>
      <Pressable
        style={styles.icon}
        onPress={() => {
          navigation.navigate('Stats');
          state = 'statistic';
        }}>
        <Image
          style={styles.icon}
          source={require('../../icon/statistics.png')}
        />
        {state === 'statistic' ? (
          <Image
            style={styles.substract}
            source={require('../../icon/substract.png')}
          />
        ) : (
          <></>
        )}
      </Pressable>
      <Pressable
        style={styles.icon}
        onPress={() => {
          navigation.navigate('Chat');
          state = 'chat';
        }}>
        <Image style={styles.icon} source={require('../../icon/chat.png')} />
        {state === 'chat' ? (
          <Image
            style={styles.substract}
            source={require('../../icon/substract.png')}
          />
        ) : (
          <></>
        )}
      </Pressable>
    </View>
  </View>
);

export default BottomBar;

const styles = StyleSheet.create({
  main_container: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    position: 'absolute',
    width: '100%',
    height: 75,
    backgroundColor: Config.AppColor.Second,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  icon: {
    width: 35,
    height: 35,
  },
  substract: {
    width: 35,
    height: 35,
  },
});
