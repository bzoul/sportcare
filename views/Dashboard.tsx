/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Day from '../components/blocs/progressCircle';
import axios from '../utils/axios';
import Config from '../config';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {fetchUserInfos} from '../utils/userInfos';
import {AxiosResponse} from 'axios';
import {IDailyReports} from '../interfaces/IDailyReports.types';
import {IUserInfos} from '../interfaces/IUserInfos.types';
import {getLastReport} from '../utils/userLastReport';
import {getIMC} from '../utils/getIMC';
import ImcResume from '../components/Dashboard/ImcResume';
import LoadingSpinner from '../components/Dashboard/LoadingSpinner';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DailyCondition from '../components/Dashboard/DailyCondition';
import {getConditionColor} from '../utils/getConditionColor';
import {getLastWeekDailyReports} from '../utils/getLastWeekDailyReports';
import dayjs from 'dayjs';
import {getPercentageColor} from '../utils/getPercentageColor';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  userInfos: IUserInfos | null;
  lastReport: IDailyReports | null;
  tintColor: string;
  token: string;
  isloading: boolean;
  rmssdOfTheDay: number;
  listDailyReports: IDailyReportsModified[];
  imc: number;
  weight: number;
  height: number;
  lastData: any[];
  shapeOfTheDay: number;
}

interface IDailyReportsModified {
  d: string;
  percent: number;
  color: string;
}

export default class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userInfos: null,
      lastReport: null,
      tintColor: '',
      token: '',
      isloading: true,
      rmssdOfTheDay: 0,
      listDailyReports: [],
      imc: 0,
      weight: 0,
      height: 0,
      lastData: [],
      shapeOfTheDay: 0,
    };
  }

  onMount = async () => {
    const data = await fetchUserInfos();
    if (data) {
      this.setState({
        ...this.state,
        userInfos: data,
      });
      const lastReport = await getLastReport(data._id);
      if (lastReport) {
        this.setState({
          ...this.state,
          imc: getIMC(lastReport?.weight, lastReport?.size / 100),
          lastReport: lastReport,
        });
      }
    }
  };

  stopLoading = () => {
    this.setState({...this.state, isloading: false});
  };

  async componentDidMount() {
    await this.onMount();
    // await this.getAccountData();
    await this.getLastData();
    this.getRmssdOfTheDay();
    this.stopLoading();
  }

  getLastData = async () => {
    if (!this.state.userInfos) {
      return;
    }

    const lastData = await getLastWeekDailyReports(this.state.userInfos?._id);
    if (lastData) {
      this.setState({...this.state, lastData});
    }
  };

  getRmssdOfTheDay = () => {
    if (!this.state.lastData) {
      return;
    }
    const dataOfTheDay = this.state.lastData.filter(data => {
      return (
        dayjs(data.date).format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY')
      );
    });
    if (dataOfTheDay.length === 0) {
      return;
    }

    this.setState({
      ...this.state,
      rmssdOfTheDay: dataOfTheDay[0].rmssd,
      shapeOfTheDay: dataOfTheDay[0].percentage,
    });
  };

  getAccountData = async () => {
    let obj = {
      d: '',
      percent: 0,
      color: '#F3F3F2',
    };
    let _weight = 0;
    let _height = 0;
    let _listDailyReportsModified = [obj, obj, obj, obj, obj];
    let _tintColor = '#0453F7';
    let _rmssdOfTheDay = 0;
    let isSuccess = false;
    try {
      if (this.state.userInfos !== null) {
        await axios
          .get(`${Config.baseURL}/users/${this.state.userInfos._id}`)
          .then(
            (response: AxiosResponse<IUserInfos>) => {
              if (response.status === 200) {
                _tintColor = getConditionColor(response.data.condition);
                isSuccess = true;
              } else {
                console.error('id invalid ' + this.state.userInfos?._id);
              }
            },
            error => {
              console.error('log ' + error);
            },
          );
        if (isSuccess) {
          await axios
            .get(
              `${Config.baseURL}/dailyReports/date/${this.state.userInfos._id}`,
            )
            .then(
              (response: AxiosResponse<IDailyReports[]>) => {
                if (response.status === 200) {
                  if (response.data[0] !== undefined) {
                    _rmssdOfTheDay = response.data[0].rmssd;
                    _height = response.data[0].size;
                    _weight = response.data[0].weight;
                  }
                } else {
                  console.error(response);
                }
              },
              error => {
                console.error('Error :' + error);
              },
            );

          await axios
            .get(
              `${Config.baseURL}/dailyReports/dateMinus5/${this.state.userInfos._id}`,
            )
            .then(
              (response: AxiosResponse<IDailyReports[]>) => {
                if (response.status === 200) {
                  if (response.data !== undefined && response.data !== null) {
                    const decalage = 6 - new Date().getDay(); // TODO FIX LES BONNES DATA
                    response.data.forEach(report => {
                      const numberDay = new Date(report.date).getDay() - 1; // TODO FIX LA DATE ET LA COULEUR
                      const day = weekday[numberDay];
                      obj = {
                        d: day,
                        percent: report.rmssd,
                        color: '#E0E0E0', // Background color of circle with data
                      };
                      _listDailyReportsModified[numberDay + decalage] = obj;
                    });

                    _listDailyReportsModified.forEach((report, index) => {
                      if (report.percent === 0) {
                        var test = index - decalage;
                        if (test < 0) {
                          test = 7 - index - decalage;
                        }

                        obj = {
                          d: weekday[test],
                          percent: 0,
                          color: '#F3F3F2', //Background color of circle with no data
                        };
                        _listDailyReportsModified[index] = obj;
                        console.log(_listDailyReportsModified);
                      }
                    });
                  }
                } else {
                  console.error(response);
                }
              },
              error => {
                console.error('log ' + error);
              },
            );
        }
      }
      console.log('listDailyReportsModified');
      console.log(_listDailyReportsModified);
      this.setState({
        tintColor: _tintColor,
        rmssdOfTheDay: _rmssdOfTheDay,
        listDailyReports: _listDailyReportsModified,
        weight: _weight,
        height: _height,
        isloading: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        {this.state.isloading ? (
          <LoadingSpinner isLoading={this.state.isloading} />
        ) : (
          <View
            style={{backgroundColor: 'white', height: '100%', width: '100%'}}>
            <DashboardHeader
              navigation={this.props.navigation}
              userInfos={this.state.userInfos}
              tintColor={getConditionColor(this.state.userInfos?.condition)}
            />
            <View
              style={{
                borderColor: 'grey',
                borderWidth: 0.25,
                width: (widthScreen * 94) / 100,
                left: (widthScreen * 3) / 100,
              }}
            />

            <View
              style={{
                height: heightScreen - (heightScreen * 28) / 100,
                top: -20,
              }}>
              <View style={styles.formeJournaliere}>
                <Text style={styles.titreFormeJournaliere}>
                  Forme journalière
                </Text>
                {/* <View style={styles.week}>
                  {console.log('listdailyreports petits')}
                  {console.log(this.state.listDailyReports)}
                  {this.state.listDailyReports.map((DailyReport, index) => (
                    <Day
                      key={index}
                      textFontWeight="normal"
                      textFontColor="grey"
                      ringBgColor={DailyReport.color}
                      ringColor={getConditionColor(
                        this.state.userInfos?.condition,
                      )}
                      percent={DailyReport.percent}
                      text={DailyReport.d}
                      radius={25}
                      viewType={'littleOne'}
                      testTime={''}
                    />
                  ))}
                </View> */}
                <View style={styles.week}>
                  {this.state.lastData.map((DailyReport, index) => (
                    <Day
                      key={index}
                      textFontWeight="normal"
                      textFontColor="grey"
                      ringBgColor={'#F3F3F2'}
                      ringColor={DailyReport.color}
                      percent={DailyReport.percentage.toFixed(2)}
                      text={DailyReport.day}
                      radius={25}
                      viewType={'littleOne'}
                      testTime={''}
                    />
                  ))}
                </View>

                <DailyCondition
                  navigation={this.props.navigation}
                  percentColor={getPercentageColor(this.state.shapeOfTheDay)}
                  rmssdOfTheDay={parseFloat(
                    this.state.shapeOfTheDay.toFixed(2),
                  )}
                />
              </View>
              <ImcResume
                size={this.state.lastReport?.size}
                weight={this.state.lastReport?.weight}
              />
            </View>
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
  spinnerTextStyle: {
    color: '#FFF',
  },
  logo_image: {
    width: 150,
    height: 30,
    resizeMode: 'contain',
  },
  header: {
    left: (widthScreen * 3) / 100,
    width: (widthScreen * 94) / 100,
    top: (heightScreen * 3) / 100,
    height: (heightScreen * 15) / 100,
    flexDirection: 'row',
  },
  like_logo: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    tintColor: 'blue',
    top: '9%',
  },
  bpm: {
    flexDirection: 'row',
    left: 10,
    top: (heightScreen * 7.35) / 100,
  },
  textWelcom: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    left: (widthScreen * 1) / 100,
  },
  textNotif: {
    fontSize: 16,
    color: 'orange',
    left: (widthScreen * 1) / 100,
  },
  formeView: {
    borderRadius: 40,
    height: (heightScreen * 5) / 100,
    width: (widthScreen * 20) / 100,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
  mensuration: {
    borderRadius: 40,
    height: (heightScreen * 5) / 100,
    width: (widthScreen * 20) / 100,
    borderWidth: 1,
    display: 'flex',
  },
  emoji: {
    resizeMode: 'contain',
    height: '90%',
    width: '90%',
    flex: 1,
  },
  heart: {
    resizeMode: 'contain',
    height: '90%',
    width: '90%',
    flex: 1,
  },
  formeJournaliere: {
    height: (heightScreen * 53) / 100,
    width: (widthScreen * 94) / 100,
    left: (widthScreen * 3) / 100,
  },
  titreFormeJournaliere: {
    top: (heightScreen * 4) / 100,
    fontSize: 20,
  },
  week: {
    flexDirection: 'row',
    top: (heightScreen * 5) / 100,
    justifyContent: 'space-around',
  },
  dayText: {
    color: 'grey',
  },
  formeToday: {
    flexDirection: 'row',
    top: (heightScreen * 2) / 100,
  },
  viewFormeToday: {
    height: (heightScreen * 4) / 100,
    width: (widthScreen * 20) / 100,
  },
  textFormeToday: {
    textAlign: 'center',
    color: 'white',
    top: 5,
  },
  textIMC: {
    textAlign: 'center',
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
  },
  arrow: {
    height: 20,
    width: 20,
  },
  containerForme: {
    flexDirection: 'column',
    height: (heightScreen * 6) / 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: (widthScreen * 20) / 100,
    width: (widthScreen * 20) / 100,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
  },
  readinessView: {
    top: (heightScreen * 8) / 100,
    height: (heightScreen * 30) / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
