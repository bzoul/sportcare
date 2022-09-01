/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import Day from '../../components/blocs/progressCircle';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

type Props = {
  rmssdOfTheDay: number;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  percentColor: string;
};

export default function DailyCondition({
  rmssdOfTheDay,
  navigation,
  percentColor,
}: Props) {
  return (
    <View style={styles.readinessView}>
      <View
        style={[
          styles.viewFormeToday,
          {position: 'absolute', right: 50, top: 13},
        ]}>
        <Text style={[styles.textFormeToday, {color: '#D6441D'}]}>Faible</Text>
      </View>
      <View
        style={[
          styles.viewFormeToday,
          {position: 'absolute', right: 25, bottom: 48},
        ]}>
        <Text style={[styles.textFormeToday, {color: '#F8991B'}]}>Basse</Text>
      </View>
      <View
        style={[
          styles.viewFormeToday,
          {position: 'absolute', left: 160, bottom: -30},
        ]}>
        <Text style={[styles.textFormeToday, {color: '#FCE50B'}]}>Normale</Text>
      </View>
      <View
        style={[
          styles.viewFormeToday,
          {position: 'absolute', left: 25, bottom: 50},
        ]}>
        <Text style={[styles.textFormeToday, {color: '#80BD00'}]}>Bonne</Text>
      </View>
      <View
        style={[
          styles.viewFormeToday,
          {position: 'absolute', left: 50, top: 10},
        ]}>
        <Text style={[styles.textFormeToday, {color: '#12A04A'}]}>Elevée</Text>
      </View>
      {rmssdOfTheDay === 0 ? (
        <>
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
            <Text style={{textAlign: 'center', marginBottom: 5}}>
              Aucun test de forme {'\n'} n'a été effectué aujourd'hui.
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
                navigation.navigate('Electrocardiogramme');
              }}>
              <Text style={{textAlign: 'center'}}>LANCER LE TEST</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Day
          textFontWeight="bold"
          textFontColor="grey"
          ringBgColor="#E0E0E0"
          textFontSize={30}
          ringColor={percentColor}
          percent={rmssdOfTheDay}
          text={rmssdOfTheDay + '%'}
          radius={100}
          bgRingWidth={14}
          viewType="bigone"
          testTime={''}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewFormeToday: {
    height: (heightScreen * 4) / 100,
    width: (widthScreen * 20) / 100,
  },
  textFormeToday: {
    textAlign: 'center',
    top: 5,
  },
  readinessView: {
    top: (heightScreen * 7) / 100,
    height: (heightScreen * 30) / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
