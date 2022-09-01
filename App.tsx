import React from 'react';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import Chat from './views/Chat';
import Profil from './views/Profil';
import Stats from './views/Stats';
import Electrocardiogramme from './views/Electrocardiogramme';
import Training from './views/Training';
import TrainingChoice from './views/TrainingChoice';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TrainingResume from './views/TrainingResume';
import Parametre from './views/Parametre';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: () => {
        let iconName;

        if (route.name === 'DashboardStack') {
          iconName = require("./icon/page-d'accueil.png");
        } else if (route.name === 'ProfilStack') {
          iconName = require('./icon/user.png');
        } else if (route.name === 'TrainingStack') {
          iconName = require('./icon/running.png');
        } else if (route.name === 'Stats') {
          iconName = require('./icon/statistics.png');
        } else if (route.name === 'Tchat') {
          iconName = require('./icon/chat.png');
        }

        // You can return any component that you like here!

        return <Image style={styles.icon} source={iconName} />;
      },

      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: [{display: 'flex', height: 80}, null],
      tabBarShowLabel: false,
      tabBarInactiveBackgroundColor: '#0094ff',
      tabBarLabelStyle: {color: 'white'},
      tabBarActiveBackgroundColor: '#87CEFA',
    })}>
    <Tab.Screen name="DashboardStack" component={DashboardStack} />
    <Tab.Screen name="TrainingStack" component={TrainingStack} />
    <Tab.Screen name="Stats" component={Stats} />
    {/* <Tab.Screen name="Tchat" component={Chat} /> */}
    <Tab.Screen name="ProfilStack" component={ProfilStack} />
  </Tab.Navigator>
);

const ProfilStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Profil" component={Profil} />
    <Stack.Screen name="Parametre" component={Parametre} />
  </Stack.Navigator>
);

const TrainingStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Training" component={Training} />
    <Stack.Screen name="TrainingChoice" component={TrainingChoice} />
    <Stack.Screen name="TrainingResume" component={TrainingResume} />
  </Stack.Navigator>
);

const DashboardStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Electrocardiogramme" component={Electrocardiogramme} />
  </Stack.Navigator>
);
class App extends React.Component {
  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  icon: {
    width: 35,
    height: 35,
  },
  substract: {
    width: 35,
    height: 35,
  },
});

export default App;
