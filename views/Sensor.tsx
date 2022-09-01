/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import {heartDateGenerator} from '../utils/heart-data-generator';

interface Props {
  navigation: any;
}

interface IDataHR {
  shape: number;
  tiredness: number;
  originalAvgHR: number;
  originalRR: number;
  simulatedAvgHR: number;
  simulatedRR: number;
  data: number[];
}

const Sensor = () => {
  const [shape, setShape] = useState('');
  const [tiredness, setTiredness] = useState('');
  const [calculOk, setCalculOk] = useState(false);
  const [dataHR, setDataHR] = useState<IDataHR | null>(null);
  const [isInputOk, setIsInputOk] = useState(false);

  const calculate = async () => {
    const shapeFloat = parseInt(shape, 10) / 100;
    const tirednessFloat = parseInt(tiredness, 10) / 100;

    setDataHR(await heartDateGenerator(shapeFloat, tirednessFloat));
    setCalculOk(true);
  };

  useEffect(() => {
    if (
      parseInt(shape, 10) >= 0 &&
      parseInt(shape, 10) <= 100 &&
      parseInt(tiredness, 10) >= 0 &&
      parseInt(tiredness, 10) <= 100
    ) {
      setIsInputOk(true);
    } else {
      setIsInputOk(false);
    }
  }, [shape, tiredness]);

  return (
    <View style={styles.main_container}>
      <Text style={styles.title}>Sensor</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setShape}
          value={shape}
          placeholder="Shape in %"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setTiredness}
          defaultValue={tiredness}
          placeholder="Tiredness in %"
          keyboardType="numeric"
        />
        <Button
          title="Press me"
          onPress={() => calculate()}
          disabled={!isInputOk}
        />
      </SafeAreaView>
      {calculOk && (
        <>
          <Text>Shape : {dataHR?.shape}</Text>
          <Text>Tiredness : {dataHR?.tiredness}</Text>
          <Text>Original average heart rate : {dataHR?.originalAvgHR}</Text>
          <Text>Original RR interval : {dataHR?.originalRR}</Text>
          <Text>Simulated average heart rate : {dataHR?.simulatedAvgHR}</Text>
          <Text>Simulated RR interval : {dataHR?.simulatedRR}</Text>
          <Text>Data array : {dataHR?.data.map(val => val + ' - ')}</Text>
        </>
      )}
    </View>
  );
};

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
  title: {
    textAlign: 'center',
    fontSize: 32,
    margin: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: 'grey',
  },
});

export default Sensor;
