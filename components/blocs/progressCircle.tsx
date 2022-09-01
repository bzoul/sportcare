/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, Image, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

/**
 * Function that calculates rotation of the semicircle for firstProgressLayer
 * ( when percent is less than equal to 50 ) or for the secondProgressLayer
 * when percent is greater than 50.
 **/
const rotateByStyle = (percent, base_degrees, clockwise) => {
  let rotateBy = base_degrees;
  if (clockwise) {
    rotateBy = base_degrees + percent * 3.6;
  } else {
    //anti clockwise progress
    rotateBy = base_degrees - percent * 3.6;
  }
  return {
    transform: [{rotateZ: `${rotateBy}deg`}],
  };
};

const renderThirdLayer = (
  percent,
  commonStyles,
  ringColorStyle,
  ringBgColorStyle,
  clockwise,
  bgRingWidth,
  progressRingWidth,
  innerRingStyle,
  startDegrees,
  text,
  viewType,
  testTime,
) => {
  let rotation = 45 + startDegrees;
  let offsetLayerRotation = -135 + startDegrees;
  if (!clockwise) {
    rotation += 180;
    offsetLayerRotation += 180;
  }
  if (percent > 50) {
    /**
     * Third layer circles default rotation is kept 45 degrees for clockwise rotation, so by default it occupies the right half semicircle.
     * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
     * before passing to the rotateByStyle function
     **/

    return (
      <>
        <View
          style={[
            styles.secondProgressLayer,
            rotateByStyle(percent - 50, rotation, clockwise),
            commonStyles,
            ringColorStyle,
          ]}
        />
      </>
    );
  } else {
    return (
      <>
        <View
          style={[
            styles.offsetLayer,
            innerRingStyle,
            ringBgColorStyle,
            {transform: [{rotateZ: `${offsetLayerRotation}deg`}]},
          ]}
        />
      </>
    );
  }
};

const CircularProgress = ({
  percent,
  radius,
  bgRingWidth,
  progressRingWidth,
  ringColor,
  ringBgColor,
  textFontSize,
  textFontWeight,
  textFontColor,
  clockwise,
  bgColor,
  startDegrees,
  text,
  viewType,
  testTime,
}) => {
  const commonStyles = {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    borderTopWidth: progressRingWidth,
    borderLeftWidth: progressRingWidth,
    borderBottomWidth: progressRingWidth,
    borderRightWidth: progressRingWidth,
  };

  /**
   * Calculate radius for base layer and offset layer.
   * If progressRingWidth == bgRingWidth, innerRadius is equal to radius
   **/
  const widthDiff = progressRingWidth - bgRingWidth;
  const innerRadius = radius - progressRingWidth + bgRingWidth + widthDiff / 2;

  const innerRingStyle = {
    width: innerRadius * 2,
    height: innerRadius * 2,
    borderRadius: innerRadius,
    borderTopWidth: bgRingWidth,
    borderLeftWidth: bgRingWidth,
    borderBottomWidth: bgRingWidth,
    borderRightWidth: bgRingWidth,
  };

  const ringColorStyle = {
    borderRightColor: ringColor,
    borderTopColor: ringColor,
  };

  const ringBgColorStyle = {
    borderRightColor: ringBgColor,
    borderTopColor: ringBgColor,
  };

  const thickOffsetRingStyle = {
    borderRightColor: bgColor,
    borderTopColor: bgColor,
  };

  let rotation = -135 + startDegrees;
  /**
   * If we want our ring progress to be displayed in anti-clockwise direction
   **/
  if (!clockwise) {
    rotation += 180;
  }
  let firstProgressLayerStyle;
  /* when ther ring's border widths are different and percent is less than 50, then we need an offsetLayer
   * before the original offser layer to avoid ring color of the thick portion to be visible in the background.
   */
  let displayThickOffsetLayer = false;
  if (percent > 50) {
    firstProgressLayerStyle = rotateByStyle(50, rotation, clockwise);
  } else {
    firstProgressLayerStyle = rotateByStyle(percent, rotation, clockwise);
    if (progressRingWidth > bgRingWidth) {
      displayThickOffsetLayer = true;
    }
  }

  let offsetLayerRotation = -135 + startDegrees;
  if (!clockwise) {
    offsetLayerRotation += 180;
  }

  return (
    <>
      <View style={[styles.container, {width: radius * 2, height: radius * 2}]}>
        {viewType === 'bigone' ? (
          <>
            <View
              style={{
                position: 'absolute',
                borderWidth: 1,
                borderColor: '#D6441D',
                height: 10,
                top: -10,
                left: 99,
              }}
            />
            <View
              style={{
                position: 'absolute',
                borderWidth: 1,
                borderColor: '#80BD00',
                height: 10,
                bottom: 8,
                left: 38,
                transform: [{rotate: '35deg'}],
              }}
            />
            <View
              style={{
                position: 'absolute',
                borderWidth: 1,
                borderColor: '#12A04A',
                width: 10,
                top: 65,
                left: -6,
                transform: [{rotate: '20deg'}],
              }}
            />
            <View
              style={{
                position: 'absolute',
                borderWidth: 1,
                borderColor: '#F8991B',
                width: 10,
                top: 65,
                right: -5,
                transform: [{rotate: '-25deg'}],
              }}
            />
            <View
              style={{
                position: 'absolute',
                borderWidth: 1,
                borderColor: '#FCE50B',
                width: 10,
                top: 185,
                right: 32,
                transform: [{rotate: '45deg'}],
              }}
            />
          </>
        ) : (
          <></>
        )}
        <View
          style={[
            styles.baselayer,
            innerRingStyle,
            {borderColor: ringBgColor, borderWidth: bgRingWidth},
          ]}
        />
        <View
          style={[
            styles.firstProgressLayer,
            firstProgressLayerStyle,
            commonStyles,
            ringColorStyle,
            {
              borderTopWidth: progressRingWidth,
              borderRightWidth: progressRingWidth,
            },
          ]}
        />
        {displayThickOffsetLayer && (
          <View
            style={[
              styles.offsetLayer,
              commonStyles,
              thickOffsetRingStyle,
              {
                transform: [{rotateZ: `${offsetLayerRotation}deg`}],
                borderWidth: progressRingWidth,
              },
            ]}
          />
        )}
        {renderThirdLayer(
          percent,
          commonStyles,
          ringColorStyle,
          ringBgColorStyle,
          clockwise,
          bgRingWidth,
          progressRingWidth,
          innerRingStyle,
          startDegrees,
          text,
          viewType,
          testTime,
        )}
        {viewType !== 'Electro' ? (
          <Text
            style={[
              styles.display,
              {
                fontSize: textFontSize,
                fontWeight: textFontWeight,
                color: textFontColor,
              },
            ]}>
            {text}
          </Text>
        ) : (
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row', top: -30}}>
              <Image
                style={{
                  height: 13,
                  width: 13,
                  top: 4,
                  right: 2,
                  tintColor: '#0094ff',
                }}
                source={require('../../icon/like.png')}
              />
              <Text>bpm</Text>
            </View>
            <Text
              style={[
                styles.display,
                {
                  top: -10,
                  fontSize: 37,
                  fontWeight: 'bold',
                  color: 'black',
                },
              ]}>
              {text}
            </Text>
            <Text style={{top: 17}}>{testTime}</Text>
            <TouchableOpacity
              style={{top: 25, borderWidth: 3, borderColor: 'white'}}
              onPress={() => {}}>
              <Text style={{fontWeight: 'bold', color: '#0094ff'}}>
                ANNULER
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

// default values for props
CircularProgress.defaultProps = {
  percent: 0,
  radius: 100,
  bgRingWidth: 5,
  progressRingWidth: 6,
  ringColor: '#e7e7e7',
  ringBgColor: 'grey',
  textFontSize: 14,
  textFontColor: 'black',
  textFontWeight: 'bold',
  clockwise: true,
  bgColor: 'white',
  startDegrees: 0,
};

/**
 * offsetLayer has transform:[{rotateZ: '-135deg'}] since
 * the offsetLayer rotation is fixed by us.
 **/
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  baselayer: {
    position: 'absolute',
  },
  firstProgressLayer: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  secondProgressLayer: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  offsetLayer: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  display: {
    position: 'absolute',
  },
});

export default CircularProgress;
