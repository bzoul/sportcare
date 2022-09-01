/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

interface ISportList {
  id: string;
  path: ImageSourcePropType;
  text: string;
}

const sportList = [
  {
    id: '60f1aca16f02c2b0ab96a521',
    path: require('../pics/running_sport.jpg'),
    text: 'Course à pied',
  },
  {
    id: '61692d3b25bec12f71f1b2c3',
    path: require('../pics/velo_sport.jpg'),
    text: 'Cyclisme',
  },
  {
    id: '60f1acd36f02c2868f96a522',
    path: require('../pics/natation_sport.jpg'),
    text: 'Natation',
  },
  {
    id: '622230e93993fd0013781b1b',
    path: require('../pics/muscu_sport.jpg'),
    text: 'Musculation',
  },
];

const SportImage = ({
  item,
  onPress,
}: {
  item: ISportList;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.touchableSport} onPress={onPress}>
    <Image style={styles.imageSport} source={item.path} />
    <Text style={styles.textSport}>{item.text}</Text>
  </TouchableOpacity>
);

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class TrainingChoice extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <View style={styles.header}>
          <View style={styles.topheader}>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
              }}
              onPress={() => {
                this.props.navigation.navigate('Training');
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
          <Text style={styles.textHeader}>Sélectionnez une activité</Text>
        </View>
        <View style={styles.main_container}>
          <FlatList
            data={sportList}
            renderItem={({item}) => (
              <SportImage
                item={item}
                onPress={() => {
                  this.props.navigation.navigate('TrainingResume', {
                    sportId: item.id,
                  });
                }}
              />
            )}
            keyExtractor={item => item.id}
          />
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
  flatList: {
    marginHorizontal: (widthScreen * 15) / 100,
    borderWidth: 1,
  },
  header: {
    width: widthScreen,
    height: (heightScreen * 20) / 100,
    backgroundColor: 'white',
  },
  topheader: {
    flexDirection: 'row',
    top: (heightScreen * 5) / 100,
    left: (widthScreen * 5) / 100,
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    top: (heightScreen * 7) / 100,
  },
  arrow: {
    resizeMode: 'contain',
    height: 35,
    width: 35,
    tintColor: 'black',
    transform: [{rotate: '90deg'}],
  },
  touchableSport: {
    height: (heightScreen * 15) / 100,
    marginHorizontal: (widthScreen * 15) / 100,
    marginVertical: (heightScreen * 1) / 100,
    alignItems: 'center',
  },
  imageSport: {
    resizeMode: 'contain',
    height: (heightScreen * 15) / 100,
  },
  textSport: {
    color: 'white',
    top: (heightScreen * -3) / 100,
    left: (widthScreen * -12) / 100,
    backgroundColor: 'rgba(0,0,0,0.4)',
    textAlign: 'left',
  },
  logo_image: {
    width: 150,
    height: 30,
    resizeMode: 'contain',
    left: (widthScreen * 50) / 100,
    top: 5,
  },
});
