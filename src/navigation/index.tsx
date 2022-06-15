import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from '../screens/Details';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{
          headerTitle: 'Images',
        }}
        component={Home}
      />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return <MainStack />;
}
