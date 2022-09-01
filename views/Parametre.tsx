/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import axios from '../utils/axios';
import config from '../config';
import {fetchUserInfos} from '../utils/userInfos';
import DatePicker from '../components/inputs/DatePicker';
import GenderPicker from '../components/inputs/GenderPicker';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  _id: string;
  civility: number;
  lastName: string;
  firstName: string;
  birthdate: Date;
  password: string;
  confirmPassword: string;
}
export default class Parametre extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      _id: '',
      civility: 0,
      lastName: '',
      firstName: '',
      birthdate: new Date(),
      password: '',
      confirmPassword: '',
    };
  }

  modifyUser = () => {
    const json = {
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      birthdate: this.state.birthdate,
      civility: this.state.civility,
    };

    axios.patch(`${config.baseURL}/users/${this.state._id}`, json).then(
      () => {
        Alert.alert('Vous avez mis à jour vos information.');
      },
      error => {
        if (error.message.includes('400')) {
          Alert.alert('Email ou password invalide.');
        }
        console.error(error.response);
      },
    );
  };

  changePassword = () => {
    if (this.state.password === this.state.confirmPassword) {
      axios
        .patch(`${config.baseURL}/users/${this.state._id}`, {
          password: this.state.password,
        })
        .then(() => {
          Alert.alert('Vous avez changé votre mot de passe.');
        })
        .catch(error => {
          console.error(error.response);
        });
    } else {
      Alert.alert('Les mots de passe ne correspondent pas.');
    }
  };

  async onMount() {
    const userInfos = await fetchUserInfos();
    if (userInfos) {
      this.setState({
        _id: userInfos._id,
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
        birthdate: new Date(userInfos.birthdate),
        civility: userInfos.civility,
      });
    }
  }

  componentDidMount() {
    this.onMount();
  }

  handleBirthdateChange = (date: Date) => {
    this.setState({...this.state, birthdate: date});
  };

  handleGenderChange = (gender: number) => {
    this.setState({...this.state, civility: gender});
  };

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.header}>
          <View style={styles.topheader}>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
              }}
              onPress={() => {
                this.props.navigation.navigate('Profil');
              }}>
              <Image
                style={styles.arrow}
                source={require('../icon/down-arrow.png')}
              />
            </TouchableOpacity>
            <Image
              style={styles.logo_image}
              source={require('../components/logos/logo_mobile.png')}
            />
          </View>
          <Text style={styles.textHeader}>Paramètres du compte</Text>
        </View>
        <View style={styles.myInfos}>
          <Text style={styles.titres}>Mettre à jour mes informations</Text>
          <View style={styles.nomprenom}>
            <View style={{flexDirection: 'column'}}>
              <Text>Nom</Text>
              <TextInput
                style={styles.input}
                placeholder={this.state.lastName}
                keyboardType="default"
                placeholderTextColor="grey"
                value={this.state.lastName}
                onChangeText={newLastName =>
                  this.setState({...this.state, lastName: newLastName})
                }
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text>Prénom</Text>
              <TextInput
                style={styles.input}
                placeholder={this.state.firstName}
                keyboardType="default"
                value={this.state.firstName}
                placeholderTextColor="grey"
                onChangeText={newFirstName =>
                  this.setState({...this.state, firstName: newFirstName})
                }
              />
            </View>
          </View>
          <View style={[styles.nomprenom, {marginVertical: 20}]}>
            <View style={{flexDirection: 'column'}}>
              <Text>Date de naissance</Text>
              <DatePicker
                defaultDate={this.state.birthdate}
                onChangeProps={this.handleBirthdateChange}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text>Civilité</Text>
              <GenderPicker
                civility={this.state.civility}
                onGenderChange={this.handleGenderChange}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.buttonConfirm, {marginTop: -5}]}
            onPress={this.modifyUser}>
            <Text>CONFIRMER</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mdp}>
          <Text style={styles.titres}>Mettre à jour mon mot de passe</Text>
          <View style={styles.nomprenom}>
            <View style={{flexDirection: 'column'}}>
              <Text>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                keyboardType="default"
                placeholderTextColor="grey"
                value={this.state.password}
                onChangeText={newPassword =>
                  this.setState({...this.state, password: newPassword})
                }
                secureTextEntry={true}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text>Confirmer le mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                keyboardType="default"
                placeholderTextColor="grey"
                value={this.state.confirmPassword}
                onChangeText={confirmNewPassword =>
                  this.setState({
                    ...this.state,
                    confirmPassword: confirmNewPassword,
                  })
                }
                secureTextEntry={true}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.buttonConfirm, {marginTop: 10}]}
            onPress={this.changePassword}>
            <Text>CONFIRMER</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.mesures}>
          <Text style={styles.titres}>Mettre à jour mes mensurations</Text>
          <View style={styles.nomprenom}>
            <View style={{flexDirection: 'column'}}>
              <Text>Taille</Text>
              <TextInput
                style={styles.input}
                placeholder="Taille actuelle"
                keyboardType="default"
                placeholderTextColor="grey"
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text>Poids</Text>
              <TextInput
                style={styles.input}
                placeholder="Poids actuel"
                keyboardType="default"
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.buttonConfirm, {marginTop: 10}]}
            onPress={() => {}}>
            <Text>CONFIRMER</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  flatList: {
    marginHorizontal: (widthScreen * 15) / 100,
    borderWidth: 1,
  },
  header: {
    width: widthScreen,
    height: (heightScreen * 18) / 100,
    backgroundColor: 'white',
  },
  topheader: {
    flexDirection: 'row',
    top: (heightScreen * 5) / 100,
    left: (widthScreen * 5) / 100,
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    top: (heightScreen * 6) / 100,
  },
  arrow: {
    resizeMode: 'contain',
    height: 35,
    width: 35,
    tintColor: 'black',
    transform: [{rotate: '90deg'}],
  },
  logo_image: {
    width: 150,
    height: 30,
    resizeMode: 'contain',
    left: (widthScreen * 50) / 100,
    top: 5,
  },
  titres: {
    fontSize: 20,
  },
  myInfos: {
    height: (heightScreen * 28) / 100,
    width: (widthScreen * 94) / 100,
    marginHorizontal: (widthScreen * 3) / 100,
    borderBottomWidth: 1,
  },
  nomprenom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    borderWidth: 1,
    width: (widthScreen * 40) / 100,
    height: 35,
    color: 'black',
  },
  mdp: {
    marginTop: 20,
    height: (heightScreen * 17) / 100,
    width: (widthScreen * 94) / 100,
    marginHorizontal: (widthScreen * 3) / 100,
    borderBottomWidth: 1,
  },
  mesures: {
    marginTop: 20,
    height: (heightScreen * 15) / 100,
    width: (widthScreen * 94) / 100,
    marginHorizontal: (widthScreen * 3) / 100,
  },
  buttonConfirm: {
    alignSelf: 'center',
    borderWidth: 1,
    backgroundColor: '#0094ff',
    borderColor: 'grey',
    padding: 3,
  },
});
