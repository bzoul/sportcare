import axios from '../utils/axios';
import React from 'react';
import Config from '../config.js';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TopBarNavigator from '../components/blocs/Topbar';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  isLoading: boolean;
  userId: string;
  token: string;
  FcmDatasMonth: [];
  ImcDatasMonth: [];
  RmssdDatasMonth: [];
  FcmDatasWeek: [];
  ImcDatasWeek: [];
  RmssdDatasWeek: [];
  graphDatasMonth: IGraphDatasMonth;
  graphDatasWeek: IGraphDatasWeek;
}

export type TImcDatas = {
  data: string[];
  date: number[];
};
export type TFcmDatas = {
  data: number[];
  date: number[];
};
export type TRmssdDatas = {
  data: number[];
  date: number[];
};
export interface IGraphDatasMonth {
  ImcDatasMonth: TImcDatas;
  FcmDatasMonth: TFcmDatas;
  RmssdDatasMonth: TRmssdDatas;
}
export interface IGraphDatasWeek {
  ImcDatasWeek: TImcDatas;
  FcmDatasWeek: TFcmDatas;
  RmssdDatasWeek: TRmssdDatas;
}

type Stat = {
  IMC: string;
  FCM: number;
  RMSSD: number;
  date: number;
};

type IStats = Stat[];

export default class Stats extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      token: '',
      userId: '',
      isLoading: true,
      FcmDatasMonth: [],
      ImcDatasMonth: [],
      RmssdDatasMonth: [],
      graphDatasMonth: {
        FcmDatasMonth: {data: [], date: []},
        ImcDatasMonth: {data: [], date: []},
        RmssdDatasMonth: {data: [], date: []},
      },
      FcmDatasWeek: [],
      ImcDatasWeek: [],
      RmssdDatasWeek: [],
      graphDatasWeek: {
        FcmDatasWeek: {data: [], date: []},
        ImcDatasWeek: {data: [], date: []},
        RmssdDatasWeek: {data: [], date: []},
      },
    };
  }

  async onMount() {
    const userId = (await AsyncStorage.getItem('userId')) as unknown as string;
    this.setState({...this.state, userId});
  }

  async componentDidMount() {
    await this.onMount();

    await this.getDataMonth();

    await this.getDataWeek();
  }

  getDataMonth = async () => {
    let _graphDatas!: IGraphDatasMonth;

    let _ImcDatasMonth: {
      data: string[];
      date: number[];
    };
    let _FcmDatasMonth: {
      data: number[];
      date: number[];
    };
    let _RmssdDatasMonth: {
      data: number[];
      date: number[];
    };

    try {
      await axios
        .post<IStats>(`${Config.baseURL}/dailyReports/stats/`, {
          userId: this.state.userId,
          timeSpan: 'month',
        })
        .then(
          response => {
            if (response.status === 200) {
              let dataIMC: string[] = [];
              let dataFCM: number[] = [];
              let dataRMSSD: number[] = [];
              let dateIMC: number[] = [];
              let dateFCM: number[] = [];
              let dateRMSSD: number[] = [];
              response.data.forEach(data => {
                if (data.IMC !== undefined) {
                  dataIMC.push(data.IMC);
                  dateIMC.push(data.date);
                }
                if (data.FCM !== undefined) {
                  dataFCM.push(data.FCM);
                  dateFCM.push(data.date);
                }
                if (data.RMSSD !== undefined) {
                  dataRMSSD.push(data.RMSSD);
                  dateRMSSD.push(data.date);
                }
              });

              _ImcDatasMonth = {
                data: dataIMC,
                date: dateIMC,
              };

              _FcmDatasMonth = {
                data: dataFCM,
                date: dateFCM,
              };

              _RmssdDatasMonth = {
                data: dataRMSSD,
                date: dateRMSSD,
              };

              _graphDatas = {
                ImcDatasMonth: _ImcDatasMonth,
                FcmDatasMonth: _FcmDatasMonth,
                RmssdDatasMonth: _RmssdDatasMonth,
              };
            } else {
              console.log(response.status);
              console.log(response.data);
            }
          },
          error => {
            // handle error
            console.log('log ' + error);
          },
        );
    } catch (error) {
      console.error(error);
      return false;
    }
    this.setState({
      ...this.state,
      graphDatasMonth: _graphDatas,
      isLoading: false,
    });
  };

  getDataWeek = async () => {
    console.log('get stats data week');
    let _graphDatas!: IGraphDatasWeek;

    let _ImcDatasWeek: {
      data: string[];
      date: number[];
    };
    let _FcmDatasWeek: {
      data: number[];
      date: number[];
    };
    let _RmssdDatasWeek: {
      data: number[];
      date: number[];
    };

    try {
      await axios
        .post<IStats>(`${Config.baseURL}/dailyReports/stats/`, {
          userId: this.state.userId,
          timeSpan: 'week',
        })
        .then(
          response => {
            console.log('response', JSON.stringify(response));
            if (response.status === 200) {
              let dataIMC: string[] = [];
              let dataFCM: number[] = [];
              let dataRMSSD: number[] = [];
              let dateIMC: number[] = [];
              let dateFCM: number[] = [];
              let dateRMSSD: number[] = [];
              console.log(response.data);
              response.data.forEach(data => {
                if (data.IMC !== undefined) {
                  dataIMC.push(data.IMC);
                  dateIMC.push(data.date);
                }
                if (data.FCM !== undefined) {
                  dataFCM.push(data.FCM);
                  dateFCM.push(data.date);
                }
                if (data.RMSSD !== undefined) {
                  dataRMSSD.push(data.RMSSD);
                  dateRMSSD.push(data.date);
                }
              });

              _ImcDatasWeek = {
                data: dataIMC,
                date: dateIMC,
              };
              console.log(_ImcDatasWeek);
              _FcmDatasWeek = {
                data: dataFCM,
                date: dateFCM,
              };
              console.log(_FcmDatasWeek);
              _RmssdDatasWeek = {
                data: dataRMSSD,
                date: dateRMSSD,
              };
              console.log(_RmssdDatasWeek);
              _graphDatas = {
                ImcDatasWeek: _ImcDatasWeek,
                FcmDatasWeek: _FcmDatasWeek,
                RmssdDatasWeek: _RmssdDatasWeek,
              };
            } else {
              console.log(response.status);
              console.log(response.data);
            }
          },
          error => {
            // handle error
            console.log('log ' + error);
          },
        );
    } catch (error) {
      console.error(error);
      return false;
    }
    this.setState({
      ...this.state,
      graphDatasWeek: _graphDatas,
      isLoading: false,
    });
  };
  render() {
    return (
      <>
        {this.state.isLoading ? (
          <View style={styles.container}>
            <Spinner
              color="#0094ff"
              //visibility of Overlay Loading Spinner
              visible={this.state.isLoading}
              //Text with the Spinner
              textContent={'Chargement des données\n statistiques...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />
          </View>
        ) : (
          <View style={styles.main_container}>
            <View style={styles.header}>
              <Text style={styles.textHeader}>Vos Statistiques</Text>
            </View>
            <SafeAreaProvider>
              <TopBarNavigator
                graphDatasMonth={this.state.graphDatasMonth}
                graphDatasWeek={this.state.graphDatasWeek}
              />
            </SafeAreaProvider>
          </View>
        )}
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
  main_container: {
    width: '100%',
    backgroundColor: 'white',
    height: '100%',
  },
  header: {
    width: widthScreen,
    height: (heightScreen * 10) / 100,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  textHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    left: (widthScreen * 3) / 100,
    textAlignVertical: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
    textAlign: 'center',
  },
});
