import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export default class Test extends React.Component<Props> {
  render() {
    return (
      <View>
        <ScrollView style={styles.main_container} />
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    width: '100%',
    backgroundColor: 'blue',
    height: '100%',
  },
});
