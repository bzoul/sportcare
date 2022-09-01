import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';

interface Props {
  color: string;
  height?: string;
  onClick: () => void;
  radius?: string;
  width: string;
  title: string;
  navigation?: any;
}

const Button: React.FC<Props> = ({color, height, onClick, width, title}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.appButtonContainer,
        {backgroundColor: color, width: width, height: height},
      ]}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default Button;
