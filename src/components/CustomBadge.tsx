import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Touchable from './Touchable';

const CustomBadge = ({
  label = '',
  onPress = () => {},
  textStyle = {},
  badgeStyle = {},
  activeColor = '#3F81D6',
  textActiveColor = '#FFFFFF',
  isActive = false,
}) => (
  <View style={styles.container}>
    <Touchable onPress={onPress}>
      <View
        style={[
          styles.touchableWrapper,
          {
            backgroundColor: isActive ? activeColor : 'transparent',
          },
          badgeStyle,
        ]}>
        <Text
          style={[
            styles.text,
            textStyle,
            {color: isActive ? textActiveColor : '#9ca3af'},
          ]}>
          {label}
        </Text>
      </View>
    </Touchable>
  </View>
);

const styles = StyleSheet.create({
  touchableWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#d6d3d1',
  },
  container: {
    marginRight: 8,
    overflow: 'hidden',
    borderRadius: 18,
  },
  text: {
    fontSize: 14,
  },
});

export default CustomBadge;
