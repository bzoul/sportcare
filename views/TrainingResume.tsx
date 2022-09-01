/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {getSport} from '../utils/getSport';
import {getIntensityColor} from '../utils/getIntensityColor';
import DatePicker from '../components/inputs/DatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postUserTraining} from '../utils/postUserTraining';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: any;
}

interface State {
  userId: string;
  sportId: string;
  sportName: string;
  intensityName: string;
  intensity: number;
  recap: string;
  duration: string;
  date: Date;
}

export const intensity = [
  {
    id: 1,
    name: 'Aucune',
    img: require('../icon/emoji-4.png'),
  },
  {
    id: 2,
    name: 'Faible',
    img: require('../icon/emoji-3.png'),
  },
  {
    id: 3,
    name: 'Modéré',
    img: require('../icon/emoji-2.png'),
  },
  {
    id: 4,
    name: 'Forte',
    img: require('../icon/emoji-1.png'),
  },
  {
    id: 5,
    name: 'Très forte',
    img: require('../icon/emoji-0.png'),
  },
];

export default class TrainingResume extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userId: '',
      sportId: '',
      sportName: '',
      intensityName: '',
      intensity: 0,
      recap: '',
      duration: '0',
      date: new Date(),
    };
  }

  onMount = async () => {
    const userId = (await AsyncStorage.getItem('userId')) as unknown as string;

    const {sportId} = this.props.route.params;
    const sportName = await getSport(sportId);
    this.setState({...this.state, sportId, sportName, userId});
  };

  componentDidMount() {
    this.onMount();
  }

  handleChangeDate = (date: Date) => {
    this.setState({...this.state, date});
  };

  handleValidate = async () => {
    const data = {
      userId: this.state.userId,
      date: this.state.date.toISOString(),
      sportID: this.state.sportId,
      effort: this.state.intensity,
      recap: this.state.recap,
      duration: parseInt(this.state.duration, 10),
    };

    try {
      const response = await postUserTraining(data);
      if (response?.status === 200) {
        Alert.alert('Votre entrainement a bien été enregistré', '', [
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

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.header}>
          <View style={styles.topheader}>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
              }}
              onPress={() => {
                this.props.navigation.navigate('TrainingChoice');
              }}>
              <Image
                style={styles.arrow}
                source={require('../icon/down-arrow.png')}
              />
            </TouchableOpacity>
            <Image
              style={styles.logo_image}
              source={require('../components/logos/logo_mobile.png')}
            />
          </View>
          <Text style={styles.textHeader}>Résumé de votre activité</Text>
        </View>
        <ScrollView>
          <Text style={styles.sport}>Sport: {this.state.sportName}</Text>
          <View style={styles.duree}>
            <Text style={styles.dureeText}>Durée de l'entrainement (min)</Text>
            <TextInput
              style={styles.input}
              placeholder="En minute"
              keyboardType="numeric"
              placeholderTextColor={'black'}
              onChangeText={duration => {
                this.setState({
                  ...this.state,
                  duration: duration.replace(/[^0-9]/g, ''), // Remove non numeric characters
                });
              }}
              value={this.state.duration}
            />
            <View style={styles.intensite}>
              <Text style={styles.dureeText}>Date</Text>
              <View>
                <DatePicker
                  defaultDate={this.state.date}
                  onChangeProps={this.handleChangeDate}
                />
              </View>
            </View>
            <View style={styles.intensite}>
              <Text style={styles.dureeText}>Intensité de l'effort</Text>
              <View style={styles.viewEmoji}>
                {intensity.map(element => (
                  <TouchableOpacity
                    key={element.id}
                    onPress={() => {
                      this.setState({
                        ...this.state,
                        intensityName: element.name,
                        intensity: element.id,
                      });
                    }}>
                    <Image style={styles.emoji} source={element.img} />
                  </TouchableOpacity>
                ))}
              </View>
              {this.state.intensity !== 0 && (
                <Text style={{color: getIntensityColor(this.state.intensity)}}>
                  {this.state.intensityName}
                </Text>
              )}
            </View>
            <View style={styles.intensite}>
              <Text style={styles.dureeText}>Commentaire</Text>
              <TextInput
                style={styles.inputCom}
                placeholder="Ressenti, progression, engouement etc.."
                keyboardType="default"
                placeholderTextColor={'black'}
                onChangeText={recap => this.setState({...this.state, recap})}
                value={this.state.recap}
                multiline={true}
              />
            </View>
            <View style={styles.finalButtonView}>
              <TouchableOpacity
                style={[styles.valide, {backgroundColor: 'red'}]}
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
                }}>
                <Text style={{textAlign: 'center', marginTop: 9}}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.valide, {backgroundColor: 'green'}]}
                onPress={() => {
                  this.handleValidate();
                }}>
                <Text style={{textAlign: 'center', marginTop: 9}}>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 80,
  },
  topheader: {
    flexDirection: 'row',
    margin: 10,
    left: (widthScreen * 5) / 100,
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
  },
  arrow: {
    resizeMode: 'contain',
    height: 35,
    width: 35,
    tintColor: 'black',
    transform: [{rotate: '90deg'}],
  },
  corps: {
    flex: 1,
    alignItems: 'center',
  },
  duree: {
    alignItems: 'center',
  },
  dureeText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    color: 'black',
    marginTop: 10,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  intensite: {
    alignItems: 'center',
    marginTop: (heightScreen * 5) / 100,
  },
  viewEmoji: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: (heightScreen * 5) / 100,
    width: (widthScreen * 55) / 100,
    top: 5,
  },
  emoji: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor: 'grey',
  },
  inputCom: {
    color: 'black',
    marginTop: 10,
    width: (widthScreen * 94) / 100,
    height: (heightScreen * 10) / 100,
    borderWidth: 1,
  },
  logo_image: {
    width: 150,
    height: 30,
    resizeMode: 'contain',
    left: (widthScreen * 50) / 100,
    top: 5,
  },
  finalButtonView: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  valide: {
    borderWidth: 1,
    width: 70,
    height: 40,
    marginHorizontal: 50,
    borderRadius: 5,
  },
  sport: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
