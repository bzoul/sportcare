import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';

interface IProps {
  updatePassword: (data: string) => void;
  updatePassword2: (data: string) => void;
}

export default class PasswordInput extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  handlePassword = (e: string) => {
    this.props.updatePassword(e);
  };

  handlePassword2 = (e: string) => {
    this.props.updatePassword2(e);
  };
  render() {
    return (
      <View>
        <View style={styles.crea_container}>
          <Text style={styles.titre}> My password</Text>
          <View style={styles.text_placement}>
            <View style={styles.text_placement}>
              <TextInput
                style={styles.input_text}
                placeholder="Password"
                placeholderTextColor="grey"
                onChangeText={text => this.handlePassword(text)}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.input_text}
                placeholder="Password"
                placeholderTextColor="grey"
                onChangeText={text => this.handlePassword2(text)}
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  crea_container: {
    fontSize: 25,
    color: 'white',
    borderColor: 'white',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    textAlign: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    paddingBottom: '2%',
    paddingTop: '2%',
  },
  text_placement: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titre: {
    color: 'white',
    fontSize: 20,
    marginLeft: 30,
  },
  input_text: {
    width: '47%',
    height: 40,
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 10,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
  },
});
