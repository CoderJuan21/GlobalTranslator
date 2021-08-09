import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs'; 
import AppNavigator from './navigation/navigate'
import {SafeAreaProvider} from 'react-native-safe-area-view';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import ConverterScreen from './screens/ConverterScreen';
import TranslateScreen from './screens/TranslateScreen' ;

export default class App extends React.Component{
 render(){
   return(
     <AppNavigator/>
   )
 }
}
