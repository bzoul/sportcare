/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Table, Rows} from 'react-native-table-component';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {getUserTraining} from '../utils/getUserTraining';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ITraining} from '../interfaces/ITraining.types';
import {DateData} from 'react-native-calendars/src/types';
import {getSport} from '../utils/getSport';
import {intensity} from './TrainingResume';
import dayjs from 'dayjs';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  tableData: string[][] | undefined;
  userTraining: ITraining[];
  selectedTraining: ITraining | null;
  markedDates: IMarkedDates;
}

interface IMarkedDates {
  [key: string]: {selected: boolean; selectedColor: string};
}

export default class Training extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tableData: undefined,
      userTraining: [],
      selectedTraining: null,
      markedDates: {},
    };
  }

  async onMount() {
    const userId = (await AsyncStorage.getItem('userId')) as unknown as string;
    const data = await getUserTraining(userId); // TODO trier par date

    if (data) {
      const lastData = data.sort(function (a: ITraining, b: ITraining) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      const selectedSportName = await getSport(lastData[0].sportID);
      this.setState({
        ...this.state,
        userTraining: data,
        selectedTraining: data[0] ? {...lastData[0], selectedSportName} : null,
        tableData: data[0] ? this.dataToTable(data[0]) : undefined,
      });
    }
  }

  dataToTable(training: ITraining) {
    const tableData: string[][] = [];
    if (training.duration) {
      tableData.push(["Temps d'effort", training.duration.toString() + ' min']);
    }
    if (training.effort) {
      tableData.push([
        "Intensité de l'effort",
        intensity.find(el => el.id === training.effort)?.name ?? '',
      ]);
    }
    return tableData;
  }

  async selectTraining(dayDate: DateData) {
    const date = dayDate.dateString;
    const training = this.state.userTraining.find(
      element => element.date.slice(0, 10) === date,
    );
    if (training) {
      const selectedSportName = await getSport(training.sportID);

      this.setState({
        ...this.state,
        selectedTraining: {...training, selectedSportName},
        tableData: this.dataToTable(training),
      });
    }
  }

  markDate = () => {
    console.log('MARK DATE CALLED');
    const markedDate: IMarkedDates = {};
    this.state.userTraining.forEach(element => {
      markedDate[element.date.slice(0, 10)] = {
        selected: true,
        selectedColor: '#00adf5',
      };
    });
    this.setState({...this.state, markedDates: markedDate});
  };

  async componentDidMount() {
    await this.onMount();
    this.markDate();
  }

  handleSelection = (dayDate: DateData) => {
    console.log('HANDLE SELECTION CALLED');
    this.selectTraining(dayDate);
  };

  render() {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Vos entrainements</Text>
          <TouchableOpacity
            // style={{
            //   width: 60,
            //   height: 60,
            //   marginRight: 20,
            // }}
            onPress={() => {
              this.props.navigation.navigate('TrainingChoice');
            }}>
            <Image style={styles.plus} source={require('../icon/plus.png')} />
          </TouchableOpacity>
        </View>
        <View style={{height: 'auto', maxHeight: heightScreen, flex: 1}}>
          <ScrollView style={styles.main_container}>
            <View style={styles.calendarView}>
              <Calendar
                style={styles.calendar}
                current={Date()}
                markedDates={this.state.markedDates}
                onDayPress={this.handleSelection}
              />
            </View>
            {this.state.selectedTraining && (
              <View style={styles.textView}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Entraînement du{' '}
                  {dayjs(this.state.selectedTraining.date).format('DD/MM/YYYY')}
                  : {this.state.selectedTraining.selectedSportName}
                </Text>
                <Table borderStyle={{borderWidth: 2, borderColor: '#0094ff'}}>
                  <Rows data={this.state.tableData} textStyle={styles.data} />
                </Table>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Récapitulatif :
                </Text>
                <Text>{this.state.selectedTraining.recap}</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    width: widthScreen,
    height: (heightScreen * 10) / 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  plus: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    // position: 'absolute',
    marginRight: 20,
  },
  textHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    left: (widthScreen * 3) / 100,
    textAlignVertical: 'center',
  },
  calendarView: {
    left: (widthScreen * 3) / 100,
    width: (widthScreen * 94) / 100,
    height: (heightScreen * 47) / 100,
    top: (heightScreen * 3) / 100,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    width: (widthScreen * 85) / 100,
  },
  textView: {
    left: (widthScreen * 3) / 100,
    top: (heightScreen * 6) / 100,
    width: (widthScreen * 94) / 100,
    height: (heightScreen * 30) / 100,
  },
  data: {
    textAlign: 'center',
  },
});
