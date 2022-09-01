import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {Dimensions, StyleSheet} from 'react-native';
const widthScreen = Dimensions.get('window').width;

type Props = {
  onGenderChange: (gender: number) => void;
  civility: number;
};

export default function GenderPicker({onGenderChange, civility}: Props) {
  return (
    <Picker
      style={styles.container}
      selectedValue={civility.toString()}
      onValueChange={itemValue => onGenderChange(parseInt(itemValue, 10))}>
      <Picker.Item label="Femme" value="0" />
      <Picker.Item label="Homme" value="1" />
    </Picker>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: (widthScreen * 40) / 100,
    height: 35,
    color: 'black',
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
