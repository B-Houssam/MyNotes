import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Text,
  Image,
  StatusBar,
} from 'react-native';

import Splash from './components/splashScreen';
import Home from './components/homePage';
import Add from './components/add';
import Loc from './components/loc';
import Edit from './components/edit';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends Component {
  state = {};

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="splash">
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="loc" component={Loc} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="add" component={Add} />
          <Stack.Screen name="edit" component={Edit} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
