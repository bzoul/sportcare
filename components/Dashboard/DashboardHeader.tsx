import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {IUserInfos} from '../../interfaces/IUserInfos.types';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

type Props = {
  userInfos: IUserInfos | null;
  tintColor: string;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

export default function DashboardHeader({
  userInfos,
  tintColor,
  navigation,
}: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Image
          style={styles.logo_image}
          source={require('../../components/logos/logo_mobile.png')}
        />
        <Text style={styles.textWelcom}>Bonjour {userInfos?.firstName} !</Text>
        {/* <Text style={styles.textNotif}>
          Aucun nouveau message de votre coach en attente.
        </Text> */}
      </View>
      <TouchableOpacity
        style={[styles.formeView]}
        onPress={() => {
          navigation.navigate('Electrocardiogramme');
        }}>
        {userInfos?.condition === 'very bad' ? (
          <Image
            style={[styles.emoji, {tintColor: tintColor}]}
            source={require('../../icon/emoji-0.png')}
          />
        ) : userInfos?.condition === 'bad' ? (
          <Image
            style={[styles.emoji, {tintColor: tintColor}]}
            source={require('../../icon/emoji-1.png')}
          />
        ) : userInfos?.condition === 'medium' ? (
          <Image
            style={[styles.emoji, {tintColor: tintColor}]}
            source={require('../../icon/emoji-2.png')}
          />
        ) : userInfos?.condition === 'good' ? (
          <Image
            style={[styles.emoji, {tintColor: tintColor}]}
            source={require('../../icon/emoji-3.png')}
          />
        ) : userInfos?.condition === 'very good' ? (
          <Image
            style={[styles.emoji, {tintColor: tintColor}]}
            source={require('../../icon/emoji-4.png')}
          />
        ) : (
          <Text>Condition not found</Text>
        )}
        <Image
          style={[styles.heart, {tintColor: tintColor}]}
          source={require('../../icon/like.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    left: (widthScreen * 3) / 100,
    width: (widthScreen * 94) / 100,
    top: (heightScreen * 3) / 100,
    height: (heightScreen * 15) / 100,
    flexDirection: 'row',
  },
  logo_image: {
    width: 150,
    height: 30,
    resizeMode: 'contain',
  },

  like_logo: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    tintColor: 'blue',
    top: '9%',
  },

  textWelcom: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    left: (widthScreen * 1) / 100,
  },
  textNotif: {
    fontSize: 16,
    color: 'orange',
    left: (widthScreen * 1) / 100,
  },
  formeView: {
    borderRadius: 40,
    height: (heightScreen * 5) / 100,
    width: (widthScreen * 20) / 100,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    right: '5%',
  },

  emoji: {
    resizeMode: 'contain',
    height: '90%',
    width: '90%',
    flex: 1,
  },
  heart: {
    resizeMode: 'contain',
    height: '90%',
    width: '90%',
    flex: 1,
  },

  containerForme: {
    flexDirection: 'column',
    height: (heightScreen * 6) / 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
