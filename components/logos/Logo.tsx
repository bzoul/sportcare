import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const Logo = props => {
  return (
    <View style={[styles.logo_container, {top: props.top}]}>
      <Image style={styles.logo} source={require('./logo_mobile.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titre: {
    color: 'white',
    fontSize: 25,
  },
  logo: {
    width: 250,
    resizeMode: 'contain',
  },
});
export default Logo;
