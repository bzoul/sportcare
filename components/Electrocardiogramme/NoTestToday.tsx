/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Day from '../../components/blocs/progressCircle';

const heightScreen = Dimensions.get('window').height;

type Props = {};

export default function ({}: Props) {
  return (
    <View style={styles.bpmView}>
      <Day
        textFontWeight="bold"
        textFontColor="grey"
        ringBgColor="#F3F3F2"
        textFontSize={30}
        ringColor="white"
        percent="0"
        text=""
        radius={100}
        bgRingWidth={14}
        viewType="bigone"
        testTime={''}
      />
      <View style={{position: 'absolute'}}>
        <Text style={{textAlign: 'center', marginBottom: 15}}>
          Aucun enregistrement du rythme {'\n'} cardiaque n'a été réalisé
          aujourd'hui.
        </Text>
        <TouchableOpacity
          style={{
            borderColor: 'black',
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            paddingVertical: 2,
            width: 170,
            alignSelf: 'center',
          }}
          onPress={() => {
            console.log('LAUNCHE TEST');
          }}>
          <Text style={{textAlign: 'center'}}>LANCER MON TEST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bpmView: {
    height: (heightScreen * 40) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
