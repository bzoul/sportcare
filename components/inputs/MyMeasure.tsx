import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';

interface IProps {
  updateCm: (data: number) => void;
  updateKg: (data: number) => void;
}

export default class MyMeasure extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  handleCm = (e: number) => {
    this.props.updateCm(e);
  };

  handleKg = (e: number) => {
    this.props.updateKg(e);
  };
  render() {
    return (
      <View>
        <View style={styles.crea_container}>
          <Text style={styles.titre}>My measure</Text>
          <View style={styles.text_placement}>
            <TextInput
              style={styles.input_text}
              placeholder="cm"
              placeholderTextColor="grey"
              onChangeText={text => this.handleCm(parseInt(text, 10))}
              keyboardType="number-pad"
            />
            <TextInput
              style={styles.input_text}
              placeholder="kg"
              placeholderTextColor="grey"
              onChangeText={text => this.handleKg(parseInt(text, 10))}
              keyboardType="number-pad"
            />
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
    width: '45%',
    height: 40,
    borderWidth: 2,
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
  },
});
