import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/buttons/LogButton';
import Logo from '../components/logos/Logo';
import LogInput from '../components/inputs/LogInput';
import axios from '../utils/axios';
import jwt_decode from 'jwt-decode';
import {IJWTDecode} from '../interfaces/IJWTDecode.types';

interface State {
  navigation: any;
  email: string;
  password: string;
}
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      navigation: null,
      email: '',
      password: '',
    };
    this.checkStoredToken();
  }

  // Save JWT Token in phone storage
  storeToken = async (token: string) => {
    try {
      const decoded = jwt_decode<IJWTDecode>(token);
      const userId = decoded.userId;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userId', userId);
    } catch (e) {
      console.error('storeToken ' + e);
    }
  };

  updateEmail = (data: string) => {
    this.setState({email: data});
  };

  updatePassword = (data: string) => {
    this.setState({password: data});
  };

  checkStoredToken = async () => {
    try {
      const valueToken = await AsyncStorage.getItem('token');
      if (valueToken !== null) {
        const decoded = jwt_decode<IJWTDecode>(valueToken);
        const exp = decoded.exp;
        if (Date.now() < exp * 1000) {
          this.props.navigation.navigate('TabNavigator', {screen: 'Dashboard'});
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  login() {
    var log = this.state.email;
    var pass = this.state.password;
    const json = {
      email: log,
      password: pass,
    };
    axios.post('/login', json).then(
      response => {
        if (response.status === 200) {
          axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
          this.storeToken(response.data.token);
          this.props.navigation.navigate('TabNavigator', {
            screen: 'DashboardStack',
          });
        } else {
          console.log('error: ' + response.data);
        }
      },
      error => {
        if (error.message.includes('400')) {
          Alert.alert('Email ou password invalide.');
        } else {
          Alert.alert(error.message);
        }
      },
    );
  }

  // TODO METTRE UNE SCROLL VIEW

  render() {
    const image = require('../pics/backgroundLogin.jpg');
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios' ? true : false}
        style={styles.main_container}>
        <View style={styles.main_container}>
          <ImageBackground source={image} style={styles.image}>
            <Logo top="-10%" />
            <LogInput
              updateEmail={(val: string) => this.updateEmail(val)}
              updatePassword={(val: string) => this.updatePassword(val)}
            />
            <View style={styles.button_container}>
              <Button
                title="S'enregistrer"
                onClick={() => this.props.navigation.navigate('Register')}
                color="grey"
                width="40%"
              />
              <Button
                title="Se connecter"
                onClick={() => this.login()}
                color="#0094ff"
                width="40%"
              />
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: 'white',
  },
  button_container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: '100%',
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
});
