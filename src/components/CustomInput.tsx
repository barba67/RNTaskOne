import React from 'react';
import {View, TextInput} from 'react-native';
import Touchable from './Touchable';

export default function CustomInput(props: any) {
  const {
    onPress = () => {},
    mainStyle,
    isReadOnly = false,
  } = props;


// because of the lack of time i did not implement the right and left icon

//   let leftIcon = () => (

//   );

//   let rightIcon = () => (
//     
//   );

  return (
    <View style={{...mainStyle}}>
      <Touchable onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            editable={!isReadOnly}
            placeholderTextColor="#a1a1aa"
            style={{
              height: 50,
              fontSize: 16,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#d6d3d1',
              width: '100%',
              color: '#18181b',
              textAlign: 'left',
              paddingHorizontal: 15,
            }}
            {...props}
          />
        </View>
      </Touchable>
    </View>
  );
}
