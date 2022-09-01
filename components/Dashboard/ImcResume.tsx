/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {getIMC, getIMCColor} from '../../utils/getIMC';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

type Props = {
  size: number | undefined;
  weight: number | undefined;
};

export default function ImcResume({size = 0, weight = 0}: Props) {
  const bmi = getIMC(weight, size / 100);
  let IMCStyle;

  const IMCColor = getIMCColor(bmi);
  IMCStyle = {...styles.IMC, backgroundColor: IMCColor};

  return (
    <View style={styles.IMCView}>
      <Text style={styles.textIMC}>Indice de masse corporelle</Text>
      <View
        style={{
          flexDirection: 'row',
          width: (widthScreen * 94) / 100,
          justifyContent: 'space-around',
        }}>
        <View style={styles.mensuration}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
            }}>
            Taille : {size !== 0 ? '\n' + size : '\n~'}
            cm
          </Text>
        </View>
        <View style={styles.mensuration}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
            }}>
            Poids : {weight !== 0 ? '\n' + weight : '\n~'}
            kg
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: (widthScreen * 94) / 100,
          justifyContent: 'space-around',
          top: -15,
        }}>
        <View style={IMCStyle}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
            }}>
            IMC :{bmi !== 0 ? '\n' + bmi.toFixed(0) : '\n~'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mensuration: {
    borderRadius: 40,
    height: (heightScreen * 5) / 100,
    width: (widthScreen * 20) / 100,
    borderWidth: 1,
    display: 'flex',
  },

  textIMC: {
    textAlign: 'center',
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
  },

  textBoxIMC: {
    fontSize: 12,
    color: 'white',
  },
  IMCView: {
    borderTopWidth: 0.75,
    borderColor: 'grey',
    left: (widthScreen * 3) / 100,
    width: (widthScreen * 94) / 100,
    height: (heightScreen * 20) / 100,
  },
  boiteIMC: {
    flexDirection: 'column',
    height: (heightScreen * 6) / 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  IMC: {
    height: (widthScreen * 15) / 100,
    width: (widthScreen * 20) / 100,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
  },
});
