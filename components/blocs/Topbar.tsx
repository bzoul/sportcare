/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {LineChart} from 'react-native-chart-kit';
import {useState} from 'react';
import {
  IGraphDatasMonth,
  IGraphDatasWeek,
  TFcmDatasMonth,
  TImcDatasMonth,
  TRmssdDatasMonth,
  TFcmDatasWeek,
  TImcDatasWeek,
  TRmssdDatasWeek,
} from '../../views/Stats';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const Tab = createMaterialTopTabNavigator();

const currentDate = new Date();
const month = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Decembre',
];

const chartDataIMC = (ImcDatasMonth: TImcDatasMonth, Legend: string) => ({
  labels: ImcDatasMonth.date.map(date => date.toString()),
  datasets: [
    {
      data: ImcDatasMonth.data.map((data: string) => parseInt(data, 10)),
      color: (opacity = 1) => `rgba(62, 39, 35, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['IMC / jour ' + Legend], // optional
});

const chartDataFCM = (FcmDatasMonth: TFcmDatasMonth, Legend: string) => ({
  labels: FcmDatasMonth.date.map(date => date.toString()),
  datasets: [
    {
      data: FcmDatasMonth.data,
      color: (opacity = 1) => `rgba(62, 39, 35, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Frequence cardiaque max / jour ' + Legend], // optional
});

const chartDataRMSSD = (FcmDatasMonth: TFcmDatasMonth, Legend: string) => ({
  labels: FcmDatasMonth.date.map(date => date.toString()),
  datasets: [
    {
      data: FcmDatasMonth.data,
      color: (opacity = 1) => `rgba(62, 39, 35, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Moyenne RMSSD / jour ' + Legend], // optional
});

const chartConfig = {
  backgroundGradientFrom: '#ECEFF1',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#ECEFF1',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(62, 39, 35, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

type TFcm = {
  FcmDatasMonth: TFcmDatasMonth;
  FcmDatasWeek: TFcmDatasWeek;
};
function FCM({FcmDatasMonth, FcmDatasWeek}: TFcm) {
  const [btnColorSemaine, setBtnColorSemaine] = useState('white');
  const [btnColorMois, setBtnColorMois] = useState('orange');
  return (
    <View
      style={{
        flex: 1,

        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {FcmDatasMonth.data === undefined ? (
        <Text>No data</Text>
      ) : (
        <View style={{top: (heightScreen * 10) / 100}}>
          {btnColorMois === 'orange' ? (
            <LineChart
              data={chartDataFCM(
                FcmDatasMonth,
                '(Mois de ' + month[currentDate.getMonth()] + ')',
              )}
              width={(widthScreen * 94) / 100}
              height={(heightScreen * 23) / 100}
              chartConfig={chartConfig}
            />
          ) : (
            <LineChart
              data={chartDataFCM(FcmDatasWeek, '(Semaine passée)')}
              width={(widthScreen * 94) / 100}
              height={(heightScreen * 23) / 100}
              chartConfig={chartConfig}
            />
          )}
        </View>
      )}
      <View style={styles.scale}>
        <TouchableOpacity
          style={[styles.buttonScale, {backgroundColor: btnColorSemaine}]}
          onPress={() => {
            btnColorSemaine !== 'orange' ? setBtnColorMois('white') : false;
            btnColorSemaine !== 'orange' ? setBtnColorSemaine('orange') : false;
          }}>
          <Text>Semaine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonScale, {backgroundColor: btnColorMois}]}
          onPress={() => {
            btnColorMois !== 'orange' ? setBtnColorSemaine('white') : false;
            btnColorMois !== 'orange' ? setBtnColorMois('orange') : false;
          }}>
          <Text>Mois</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

type TImc = {
  ImcDatasMonth: TImcDatasMonth;
  ImcDatasWeek: TImcDatasWeek;
};
function IMC({ImcDatasMonth, ImcDatasWeek}: TImc) {
  const [btnColorSemaine, setBtnColorSemaine] = useState('white');
  const [btnColorMois, setBtnColorMois] = useState('orange');
  //var colorButton = "#FCB170";
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {ImcDatasMonth.data === undefined ? (
        <Text>No data</Text>
      ) : (
        <View style={{top: (heightScreen * 10) / 100}}>
          {btnColorMois === 'orange' ? (
            <LineChart
              data={chartDataIMC(
                ImcDatasMonth,
                '(Mois de ' + month[currentDate.getMonth()] + ')',
              )}
              width={(widthScreen * 94) / 100}
              height={(heightScreen * 23) / 100}
              chartConfig={chartConfig}
            />
          ) : (
            <LineChart
              data={chartDataIMC(ImcDatasWeek, '(Semaine passée)')}
              width={(widthScreen * 94) / 100}
              height={(heightScreen * 23) / 100}
              chartConfig={chartConfig}
            />
          )}
        </View>
      )}
      <View style={styles.scale}>
        <TouchableOpacity
          style={[styles.buttonScale, {backgroundColor: btnColorSemaine}]}
          onPress={() => {
            btnColorSemaine !== 'orange' ? setBtnColorMois('white') : false;
            btnColorSemaine !== 'orange' ? setBtnColorSemaine('orange') : false;
          }}>
          <Text>Semaine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonScale, {backgroundColor: btnColorMois}]}
          onPress={() => {
            btnColorMois !== 'orange' ? setBtnColorSemaine('white') : false;
            btnColorMois !== 'orange' ? setBtnColorMois('orange') : false;
          }}>
          <Text>Mois</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

type TRmssd = {
  RmssdDatasMonth: TRmssdDatasMonth;
  RmssdDatasWeek: TRmssdDatasWeek;
};
function RMSSD({RmssdDatasMonth, RmssdDatasWeek}: TRmssd) {
  const [btnColorSemaine, setBtnColorSemaine] = useState('white');
  const [btnColorMois, setBtnColorMois] = useState('orange');
  console.log('props', RmssdDatasMonth);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {RmssdDatasMonth.data === undefined ? (
        <Text>No data</Text>
      ) : (
        <View style={{top: (heightScreen * 10) / 100}}>
          {btnColorMois === 'orange' ? (
            <LineChart
              data={chartDataRMSSD(
                RmssdDatasMonth,
                '(Mois de ' + month[currentDate.getMonth()] + ')',
              )}
              width={(widthScreen * 94) / 100}
              height={(heightScreen * 23) / 100}
              chartConfig={chartConfig}
            />
          ) : (
            <LineChart
              data={chartDataRMSSD(RmssdDatasWeek, '(Semaine passée)')}
              width={(widthScreen * 94) / 100}
              height={(heightScreen * 23) / 100}
              chartConfig={chartConfig}
            />
          )}
        </View>
      )}
      <View style={styles.scale}>
        <TouchableOpacity
          style={[styles.buttonScale, {backgroundColor: btnColorSemaine}]}
          onPress={() => {
            btnColorSemaine !== 'orange' ? setBtnColorMois('white') : false;
            btnColorSemaine !== 'orange' ? setBtnColorSemaine('orange') : false;
          }}>
          <Text>Semaine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonScale, {backgroundColor: btnColorMois}]}
          onPress={() => {
            btnColorMois !== 'orange' ? setBtnColorSemaine('white') : false;
            btnColorMois !== 'orange' ? setBtnColorMois('orange') : false;
          }}>
          <Text>Mois</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

type TMyTabs = {
  graphDatasMonth: IGraphDatasMonth;
  graphDatasWeek: IGraphDatasWeek;
};
function MyTabs({graphDatasMonth, graphDatasWeek}: TMyTabs) {
  return (
    <>
      <Tab.Navigator
        initialRouteName="FCM"
        screenOptions={{
          tabBarActiveTintColor: '#0094ff',
          tabBarLabelStyle: {fontSize: 16},
          tabBarStyle: {backgroundColor: 'white'},
        }}>
        <Tab.Screen
          name="IMC"
          options={{tabBarLabel: 'IMC'}}
          children={() => (
            <IMC
              ImcDatasMonth={graphDatasMonth.ImcDatasMonth}
              ImcDatasWeek={graphDatasWeek.ImcDatasWeek}
            />
          )}
        />

        <Tab.Screen
          name="FCM"
          options={{tabBarLabel: 'FCM'}}
          children={() => (
            <FCM
              FcmDatasMonth={graphDatasMonth.FcmDatasMonth}
              FcmDatasWeek={graphDatasWeek.FcmDatasWeek}
            />
          )}
        />

        <Tab.Screen
          name="RMSSD"
          children={() => (
            <RMSSD
              RmssdDatasMonth={graphDatasMonth.RmssdDatasMonth}
              RmssdDatasWeek={graphDatasWeek.RmssdDatasWeek}
            />
          )}
          options={{tabBarLabel: 'RMSSD'}}
        />
      </Tab.Navigator>
    </>
  );
}

type TTopBarNavigator = {
  graphDatasMonth: IGraphDatasMonth;
  graphDatasWeek: IGraphDatasWeek;
};
export default function TopBarNavigator({
  graphDatasMonth,
  graphDatasWeek,
}: TTopBarNavigator) {
  return (
    <>
      <NavigationContainer independent>
        <MyTabs
          graphDatasMonth={graphDatasMonth}
          graphDatasWeek={graphDatasWeek}
        />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  scale: {
    flexDirection: 'row',
    top: (heightScreen * 20) / 100,
  },
  buttonScale: {
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
});
