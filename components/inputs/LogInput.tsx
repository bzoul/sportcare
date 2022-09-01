import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

interface Props {
  updateEmail: (e: any) => void;
  updatePassword: (e: any) => void;
}

export default class LogInput extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  handleEmail = (e: string) => {
    this.props.updateEmail(e);
  };
  handlePassword = (e: string) => {
    this.props.updatePassword(e);
  };

  render() {
    return (
      <View style={styles.text_input_container}>
        <TextInput
          style={styles.input_text}
          placeholder="example@email.com"
          placeholderTextColor="grey"
          onChangeText={text => this.handleEmail(text)}
        />
        <TextInput
          style={styles.input_text}
          placeholder=" Password"
          onChangeText={text => this.handlePassword(text)}
          placeholderTextColor="grey"
          secureTextEntry={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text_input_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_text: {
    width: '80%',
    borderWidth: 2,
    marginBottom: 25,
    marginTop: 25,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
  },
});
