import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const LogInput = ({place1, place2}) => {
  return (
    <View style={styles.text_placement}>
      <TextInput
        style={styles.input_text}
        placeholder={place1}
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.input_text}
        placeholder={place2}
        placeholderTextColor="grey"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text_input_container: {},
  input_text: {
    width: '47%',
    height: 40,
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 10,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text_placement: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default LogInput;
