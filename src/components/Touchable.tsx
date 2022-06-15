import React from 'react';
import {Pressable} from 'react-native';
import propTypes from 'prop-types';

const Touchable = (props : any) => (
  <Pressable
    style={props.style}
    android_ripple={{color: 'rgba(0,0,0,0.1)', borderless: false}}
    disabled={props.disabled}
    delayLongPress={900}
    onLongPress={() => {
      props.onLongPress();
    }}
    onPress={() => {
      props.onPress();
    }}>
    {props.children}
  </Pressable>
);

export default Touchable;
Touchable.propTypes = {
  rippleEffect: propTypes.string,
  disabled: propTypes.bool,
  onPress: propTypes.func,
  children: propTypes.any,
  style: propTypes.object,
  noTime: propTypes.bool,
  noStyle: propTypes.bool,
  onLongPress: propTypes.func,
  implementStyle: propTypes.object,
};
Touchable.defaultProps = {
  rippleEffect: 'dark',
  disabled: false,
  onPress: () => {},
  onLongPress: () => {},
  children: null,
  implementStyle: {
    width: '100%',
  },
  style: {zIndex: 9999},
  noTime: true,
  noStyle: false,
};
