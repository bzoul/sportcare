import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import BirthdatePicker from '../inputs/DatePicker';
import GenderPicker from '../inputs/GenderPicker';

interface IProps {
  birthdate: Date;
  civility: number;
  updateName: (data: string) => void;
  updateFirstname: (data: string) => void;
  updateEmail: (data: string) => void;
  updateBirthday: (data: Date) => void;
  updateCivility: (data: number) => void;
}

export default class LogInput extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  handleName = (e: string) => {
    this.props.updateName(e);
  };

  handleFirstname = (e: string) => {
    this.props.updateFirstname(e);
  };

  handleEmail = (e: string) => {
    this.props.updateEmail(e);
  };

  //lance la fonction updatePassword du composant Login
  handleBirthday = (e: Date) => {
    this.props.updateBirthday(e);
  };

  handleCivility = (e: number) => {
    this.props.updateCivility(e);
  };

  render() {
    return (
      <View>
        <Text style={styles.titre}> My Informations</Text>
        <View style={styles.crea_container}>
          <View style={styles.text_placement}>
            <TextInput
              style={styles.input_text}
              placeholder="Name"
              placeholderTextColor="grey"
              onChangeText={text => this.handleName(text)}
            />
            <TextInput
              style={styles.input_text}
              placeholder="Firstname"
              placeholderTextColor="grey"
              onChangeText={text => this.handleFirstname(text)}
            />
          </View>
          <View style={styles.text_placement}>
            <BirthdatePicker
              defaultDate={this.props.birthdate}
              onChangeProps={this.handleBirthday}
            />
            <GenderPicker
              civility={this.props.civility}
              onGenderChange={this.handleCivility}
            />
          </View>
          <TextInput
            style={[styles.input_text, styles.width]}
            placeholder="example@email.com"
            placeholderTextColor="grey"
            onChangeText={text => this.handleEmail(text)}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  crea_container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_text: {
    width: '45%',
    height: 40,
    borderWidth: 2,
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
  },
  text_placement: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  picker_text: {
    width: '45%',
    height: 40,
    borderWidth: 2,
    marginBottom: 1,
    borderColor: 'green',
    backgroundColor: 'red',
    borderRadius: 1,
    color: 'white',
  },
  width: {
    width: '75%',
  },
  titre: {
    color: 'white',
    fontSize: 20,
    marginLeft: 30,
    marginBottom: 10,
  },
  bloc_container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
