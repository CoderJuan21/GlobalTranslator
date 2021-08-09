import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
export default class ConverterScreen extends Component{
  state = {
    text: '',
    upText: '',
    lowText: '',
  }

  handleTextChange = (t) => {
    this.setState({ text: t });
  }

  handleUpTextChange = (t) => {
    this.setState({ upText: t.toUpperCase() });
  }

  handleLowTextChange = (t) => {
    this.setState({ lowText: t.toLowerCase() });
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.text}>Convert Text</Text>
        <TextInput
            style={{
          padding: 10,
            marginTop: 50,
           width: '85%',
               alignSelf: 'center',
            backgroundColor: 'white',
          }}
          value={this.state.upText}
          onChangeText={this.handleUpTextChange}
        placeholder="Make UpperCase"
        placeholderTextColor="#ffba42"
/>
        <TextInput
         style={{
          padding: 10,
        marginTop: 50,
           width: '85%',
           alignSelf: 'center',
           backgroundColor: 'white',
          }}
          value={this.state.lowText}
          placeholder="Make LowerCase"
          placeholderTextColor="#ffba42"
          autoCapitalize="characters"
          onChangeText={this.handleLowTextChange}
/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:
   {
    flex: 1,
    paddingTop: 115,
    backgroundColor: '#013c58',
    padding: 8,
  },
  text: 
  {
    marginLeft:40,
    marginTop:20,
    fontSize:40,
    fontWeight:'bold',
    color:"#f5a201"
},
});