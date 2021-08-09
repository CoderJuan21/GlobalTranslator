import * as React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import firebase from 'firebase';

export default class LoadingScreen extends React.Component{
  checkLogin=()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.navigation.navigate('Home')
      }
      else{
        this.props.navigation.navigate('LoginScreen')
      }
    })
  }

  componentDidMount=()=>{
    this.checkLogin();
  }
  
  render(){
    return(
      <View style = {styles.container}>
      <ActivityIndicator size="large"/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
    marginTop:25,
    justifyContent:'center'
  },
})