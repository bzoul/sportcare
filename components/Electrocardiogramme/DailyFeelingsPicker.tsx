/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const widthScreen = Dimensions.get('window').width;

type Props = {
  onSelectDailyFeelings: (index: number) => void;
};

const emojiLink = [
  {
    link: require('../../icon/emoji-0.png'),
    color: 'red',
  },
  {
    link: require('../../icon/emoji-1.png'),
    color: 'orange',
  },
  {
    link: require('../../icon/emoji-2.png'),
    color: 'yellow',
  },
  {
    link: require('../../icon/emoji-3.png'),
    color: 'blue',
  },
  {
    link: require('../../icon/emoji-4.png'),
    color: 'green',
  },
];

export default function ({onSelectDailyFeelings}: Props) {
  const [dailyFeelings, setDailyFeelings] = useState(0);
  return (
    <View style={styles.formedujour}>
      <Text style={{textAlign: 'center'}}>Feeling du jour</Text>
      <View style={styles.viewEmoji}>
        {emojiLink.map((_emojiLink, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setDailyFeelings(index + 1);
              onSelectDailyFeelings(index + 1);
            }}>
            <Image
              style={[
                styles.emoji,
                {
                  tintColor:
                    dailyFeelings === index + 1 ? _emojiLink.color : 'grey',
                },
              ]}
              source={_emojiLink.link}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formedujour: {
    alignItems: 'center',
    margin: 10,
  },
  viewEmoji: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',

    width: (widthScreen * 55) / 100,
  },
  emoji: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});
