/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Day from '../components/blocs/progressCircle';
import {LineChart} from 'react-native-chart-kit';
import axios from '../utils/axios';
import Config from '../config.js';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import DailyFeelingsPicker from '../components/Electrocardiogramme/DailyFeelingsPicker';
// import NoTestToday from '../components/Electrocardiogramme/NoTestToday';
import {postDailyReports} from '../utils/postDailyReports';
import {fetchUserInfos} from '../utils/userInfos';
import {IUserInfos} from '../interfaces/IUserInfos.types';
import {getLastReport} from '../utils/userLastReport';
import {getIMC} from '../utils/getIMC';
import {IDailyReports} from '../interfaces/IDailyReports.types';
import {heartDateGenerator} from '../utils/heart-data-generator';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const chartConfig = {
  backgroundGradientFrom: '#ECEFF1',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#ECEFF1',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(62, 39, 35, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: true, // optional
};

interface State {
  userId: string;
  userInfos: IUserInfos | null;
  isLoading: boolean;
  dailyFeelings: number;
  noTestToday: boolean;
  testOfTheDay: {
    bpm: number;
    time: string;
    hrData: number[];
    currentStatus: number;
  };
  weight: string;
  size: string;
  mhr: string;
  rmssd: string;
  hr: number[];
  lastReport: IDailyReports | null;
}

export default class Electrocardiogramme extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userId: '',
      userInfos: null,
      isLoading: true,
      dailyFeelings: 0,
      noTestToday: true,
      testOfTheDay: {
        bpm: 0,
        time: '',
        hrData: [],
        currentStatus: 0,
      },
      weight: '',
      size: '',
      mhr: '',
      rmssd: '',
      hr: [],
      lastReport: null,
    };
  }

  async componentDidMount() {
    await this.getData();
    await this.getAccountData();
  }
  getData = async () => {
    try {
      const userId = (await AsyncStorage.getItem(
        'userId',
      )) as unknown as string;
      const userInfos = await fetchUserInfos();
      if (userInfos) {
        this.setState({...this.state, userId, userInfos});
      }
      if (userId) {
        const lastReport = await getLastReport(userId);
        if (lastReport) {
          this.setState({
            ...this.state,
            lastReport: lastReport,
            weight: lastReport.weight.toString(),
            size: lastReport.size.toString(),
            mhr: lastReport.mhr.toString(),
            rmssd: lastReport.rmssd.toString(),
          });
        }
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  getAccountData = async () => {
    let idReportOfTheDay;

    try {
      await axios
        .get(`${Config.baseURL}/dailyReports/date/${this.state.userId}`)
        .then(
          response => {
            if (response.status === 200) {
              if (response.data[0] !== undefined) {
                idReportOfTheDay = response.data[0]._id;
              } else {
                this.setState({
                  isLoading: false,
                });
              }
            } else {
              this.setState({
                isLoading: false,
              });
            }
          },
          error => {
            this.setState({
              isLoading: false,
            });
            // handle error
            console.error('log ' + error);
          },
        );
    } catch (e) {
      return false;
    }

    if (idReportOfTheDay !== undefined) {
      try {
        await axios
          .get(
            `${Config.baseURL}/cardiacRecords/dailyReport/` + idReportOfTheDay,
          )
          .then(
            response => {
              if (response.status === 200) {
                if (response.data[0] !== undefined) {
                  let _bpm = response.data[0].bpm;
                  let _hrData = response.data[0].hrData;
                  let _time = new Date(0, 0, 0, 0, 1, 23);
                  let _dailyFeelings = response.data[0].dailyFeelings;
                  let _currentStatus = 4;
                  this.setState({
                    noTestToday: false,
                    dailyFeelings: _dailyFeelings,
                    testOfTheDay: {
                      bpm: (_bpm * 100) / 120,
                      hrData: _hrData,
                      time: _time.getMinutes() + ':' + _time.getSeconds(),
                      currentStatus: _currentStatus,
                    },
                    isLoading: false,
                  });
                } else {
                  this.setState({
                    isLoading: false,
                  });
                }
              } else {
                this.setState({
                  isLoading: false,
                });
              }
            },
            error => {
              console.error(error);
            },
          );
      } catch (e) {
        return false;
      }
    }
  };

  handleDailyFeeling = (index: number) => {
    this.setState({...this.state, dailyFeelings: index});
  };

  handleValidate = async () => {
    const data = {
      userId: this.state.userId,
      dailyFeelings: this.state.dailyFeelings,
      size: parseInt(this.state.size, 10),
      weight: parseInt(this.state.weight, 10),
      rmssd: parseInt(this.state.rmssd, 10),
      mhr: parseInt(this.state.mhr, 10),
      bmi: getIMC(
        parseInt(this.state.weight, 10),
        parseInt(this.state.size, 10) / 100,
      ),
    };

    try {
      const response = await postDailyReports(data);
      if (response?.status === 200) {
        Alert.alert('Votre rapport journalier à bien été enregistré', '', [
          {
            text: 'OK',
            onPress: () => this.props.navigation.navigate('Dashboard'),
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Une erreur est survenue');
    }
  };

  handleSimulate = async () => {
    try {
      const fake = await heartDateGenerator(
        0.7,
        1 - (this.state.dailyFeelings - 1) / 4,
      );

      this.setState({
        ...this.state,
        mhr: fake.mhr.toString(),
        rmssd: fake.rmssdFromIA.toFixed(2).toString(),
        hr: fake.hr.slice(0, 60),
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const HRchartData = {
      labels: [],
      datasets: [
        {
          data: this.state.hr,
          color: (opacity = 1) => `rgba(62, 39, 35, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
      legend: ['Battement par minute'], // optional
    };
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Spinner
            //visibility of Overlay Loading Spinner
            visible={this.state.isLoading}
            //Text with the Spinner
            textContent={'Loading...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      );
    }

    return (
      <>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            width: '100%',
          }}>
          <View style={styles.header}>
            <View style={styles.entete}>
              <TouchableOpacity
                style={styles.touchableArrow}
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
                }}>
                <Image
                  style={styles.arrow}
                  source={require('../icon/down-arrow.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <DailyFeelingsPicker
              onSelectDailyFeelings={this.handleDailyFeeling}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.textInput}>Poids (Kg)</Text>
              <TextInput
                style={styles.input}
                placeholder={this.state.weight}
                keyboardType="numeric"
                placeholderTextColor={'black'}
                onChangeText={weight => {
                  this.setState({
                    ...this.state,
                    weight: weight.replace(/[^0-9.]/g, ''), // Remove non numeric characters
                  });
                }}
                value={this.state.weight}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textInput}>Taille (cm)</Text>
              <TextInput
                style={styles.input}
                placeholder={this.state.size}
                keyboardType="numeric"
                placeholderTextColor={'black'}
                onChangeText={size => {
                  this.setState({
                    ...this.state,
                    size: size.replace(/[^0-9.]/g, ''), // Remove non numeric characters
                  });
                }}
                value={this.state.size}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textInput}>Rythme cardiaque max.</Text>
              <TextInput
                style={styles.input}
                placeholder={this.state.mhr}
                keyboardType="numeric"
                placeholderTextColor={'black'}
                onChangeText={mhr => {
                  this.setState({
                    ...this.state,
                    mhr: mhr.replace(/[^0-9.]/g, ''), // Remove non numeric characters
                  });
                }}
                value={this.state.mhr}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textInput}>RMSSD</Text>
              <TextInput
                style={styles.input}
                placeholder={this.state.rmssd}
                keyboardType="numeric"
                placeholderTextColor={'black'}
                onChangeText={rmssd => {
                  this.setState({
                    ...this.state,
                    rmssd: rmssd.replace(/[^0-9.]/g, ''), // Remove non numeric characters
                  });
                }}
                value={this.state.rmssd}
              />
            </View>
            {/* {!this.state.noTestToday ? (
              <NoTestToday />
            ) : (
              <View style={styles.bpmView}>
                <Day
                  textFontWeight="bold"
                  textFontColor="black"
                  ringBgColor="#E0E0E0"
                  textFontSize={30}
                  ringColor="#0094ff"
                  percent={this.state.testOfTheDay.bpm}
                  text={this.state.testOfTheDay.bpm}
                  radius={100}
                  bgRingWidth={14}
                  viewType="Electro"
                  testTime={this.state.testOfTheDay.time}
                />
              </View>
            )} */}
            {this.state.hr.length > 0 && (
              <View style={styles.chartView}>
                <LineChart
                  data={HRchartData}
                  width={(widthScreen * 94) / 100}
                  height={(heightScreen * 23) / 100}
                  chartConfig={chartConfig}
                  fromZero={true}
                />
              </View>
            )}
            <View style={styles.finalButtonView}>
              <TouchableOpacity
                style={[styles.valide, {backgroundColor: 'red'}]}
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 16, color: 'white'}}>
                  Annuler
                </Text>
              </TouchableOpacity>
              {this.state.userInfos?.role && (
                <TouchableOpacity
                  style={[styles.valide, {backgroundColor: 'cyan'}]}
                  onPress={this.handleSimulate}>
                  <Text
                    style={{textAlign: 'center', fontSize: 16, color: 'black'}}>
                    Simuler
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.valide, {backgroundColor: 'green'}]}
                onPress={this.handleValidate}>
                <Text
                  style={{textAlign: 'center', fontSize: 16, color: 'white'}}>
                  Valider
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  main_container: {
    width: '100%',
    backgroundColor: 'white',
    height: '100%',
  },
  entete: {
    width: (widthScreen * 94) / 100,
    flexDirection: 'row',
  },
  heart: {
    resizeMode: 'contain',
    height: 35,
    width: 35,
    tintColor: 'grey',
    left: (widthScreen * 70) / 100,
  },
  arrow: {
    resizeMode: 'contain',
    height: 35,
    width: 35,
    tintColor: 'black',
    transform: [{rotate: '90deg'}],
  },
  touchableArrow: {
    height: 35,
    width: 35,
    left: (widthScreen * 5) / 100,
  },
  header: {
    left: (widthScreen * 3) / 100,
    margin: 10,
  },
  bpmView: {
    height: (heightScreen * 40) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartView: {
    borderWidth: 1,
    left: (widthScreen * 3) / 100,
    width: (widthScreen * 94) / 100,
    height: (heightScreen * 28) / 100,
    alignContent: 'center',
  },
  valide: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  finalButtonView: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  textInput: {
    color: 'black',
    // fontSize: 16,
    // fontWeight: 'bold',
  },
  input: {
    color: 'black',
    marginTop: 10,
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
});
