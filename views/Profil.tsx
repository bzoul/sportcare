/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchUserInfos} from '../utils/userInfos';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

interface State {
  email: string;
  firstName: string;
  lastName: string;
}
export default class Profil extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
    };
  }
  // supprime le token stocker sur le telephone
  removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userid');
      this.props.navigation.navigate('Login');
    } catch (e) {
      console.error('RmToken  ' + e);
    }
  };

  async onMount() {
    const data = await fetchUserInfos();
    if (data) {
      this.setState({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    }
  }

  componentDidMount() {
    this.onMount();
  }

  render() {
    return (
      <View>
        <View style={styles.main_container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Votre profil</Text>
            <TouchableOpacity
              style={styles.touchableLogout}
              onPress={() => {
                this.removeToken();
              }}>
              <Image
                style={styles.logout}
                source={require('../icon/logout.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.photo_container}>
            <Image
              style={styles.photo}
              source={require('../icon/logo_sport_care_tigre_v3.png')}
            />
            <Text style={{fontSize: 25}}>
              {this.state.firstName + ' ' + this.state.lastName}
            </Text>
            <Text style={{fontSize: 20}}>{this.state.email}</Text>
          </View>
          <View style={styles.features_container}>
            {/* <View style={styles.text_container}>
              <Image style={styles.icon} source={require('../icon/user.png')} />
              <Text style={styles.text_style}>Profil</Text>
            </View> */}
            <View style={styles.text_container}>
              <Image
                style={styles.icon}
                source={require('../icon/settings.png')}
              />
              <TouchableOpacity
                style={{width: 300}}
                onPress={() => {
                  this.props.navigation.navigate('Parametre');
                }}>
                <Text style={styles.text_style}>Paramètre de compte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    left: (widthScreen * 3) / 100,
    textAlignVertical: 'center',
  },
  photo: {
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  photo_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%',
  },
  features_container: {
    marginTop: '15%',
    borderTopWidth: 1,
    width: '90%',
    alignItems: 'center',
  },
  text_style: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
  icon: {
    width: 20,
    height: 20,
  },
  text_container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
    marginBottom: 5,
  },
  logo: {
    position: 'absolute',
    top: 20,
    width: 150,
    height: 30,
    resizeMode: 'contain',
  },
  logout: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  touchableLogout: {
    left: (widthScreen * 82) / 100,
    width: 35,
    height: 35,
    top: 20,
  },
  header: {
    width: widthScreen,
    flexDirection: 'row',
    height: (heightScreen * 10) / 100,
  },
});
