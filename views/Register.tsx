import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import Button from '../components/buttons/LogButton';
import Logo from '../components/logos/Logo';
import MyInformation from '../components/blocs/MyInformation';
import Password from '../components/inputs/PasswordInput';
import MyMeasure from '../components/inputs/MyMeasure';
import axios from 'axios';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface State {
  email: string;
  password: string;
  password2: string;
  name: string;
  firstname: string;
  title: string;
  cm: number;
  kg: number;
  civility: number;
  birthdate: Date;
}
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class Login extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
      name: '',
      firstname: '',
      title: '',
      cm: 0,
      kg: 0,
      civility: 0,
      birthdate: new Date(),
    };
  }
  updateKg = (data: number) => {
    this.setState({kg: data});
  };

  updateCm = (data: number) => {
    this.setState({cm: data});
  };

  updateCivility = (data: number) => {
    this.setState({civility: data});
  };

  updateBirthday = (data: Date) => {
    this.setState({birthdate: data});
  };

  updateName = (data: string) => {
    this.setState({name: data});
  };

  updateFirstname = (data: string) => {
    this.setState({firstname: data});
  };

  updateEmail = (data: string) => {
    this.setState({email: data});
  };

  updatePassword = (data: string) => {
    this.setState({password: data});
  };

  updatePassword2 = (data: string) => {
    this.setState({password2: data});
  };

  register() {
    const email = this.state.email;
    const password = this.state.password;
    const name = this.state.name;
    const firstname = this.state.firstname;
    const birthdate = this.state.birthdate;
    const heigth = this.state.cm;
    const weight = this.state.kg;
    const civility = this.state.civility;

    const json = {
      last_name: name,
      first_name: firstname,
      birthdate,
      address: '13006 Marseille Avenue du Prado',
      role: true,
      civility,
      email,
      password,
      coachId: '',
      heigth,
      weight,
    };
    axios
      .post('/register', json)
      .then(response => {
        if (response.status === 201) {
          Alert.alert('Successful registration', 'You can now log in');
        } else {
          Alert.alert('Registration failed', 'Please try again');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const image = {
      uri: 'https://cdn.discordapp.com/attachments/786976841851732038/830091403409358888/dzqdzqdzqd.png',
    };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios' ? true : false}
        style={styles.main_container}>
        <View style={styles.main_container}>
          <ImageBackground source={image} style={styles.image}>
            <View style={styles.top_container}>
              <Logo />
              <Text style={styles.title}>Create your account</Text>
            </View>
            <MyInformation
              birthdate={this.state.birthdate}
              civility={this.state.civility}
              updateEmail={(val: string) => this.updateEmail(val)}
              updateCivility={(val: number) => this.updateCivility(val)}
              updateName={(val: string) => this.updateName(val)}
              updateFirstname={(val: string) => this.updateFirstname(val)}
              updateBirthday={(val: Date) => this.updateBirthday(val)}
            />
            <Password
              updatePassword={(val: string) => this.updatePassword(val)}
              updatePassword2={(val: string) => this.updatePassword2(val)}
            />
            <MyMeasure
              updateCm={(val: number) => this.updateCm(val)}
              updateKg={(val: number) => this.updateKg(val)}
            />
            <View style={styles.button_container}>
              <Button
                title="Cancel"
                onClick={() => this.props.navigation.navigate('Login')}
                color="red"
                width="35%"
              />
              <Button
                title="Sign up"
                onClick={() => this.register()}
                color="green"
                width="35%"
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
  top_container: {
    height: '23%',
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
  title: {
    fontSize: 25,
    color: 'white',
    borderColor: 'white',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    textAlign: 'center',
    margin: '5%',
    paddingBottom: '2%',
    paddingTop: '2%',
  },
});
