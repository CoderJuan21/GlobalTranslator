/*<ScrollView style={{borderColor:'white', borderWidth:2.5, width:150, height:200}}>{ENDLANGUAGE.map(this._renderEndLanguage)}
            </ScrollView>*/

import React from 'react';
import {
  Text,
  Button,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
  Picker,
} from 'react-native';
import * as Speech from 'expo-speech';
import { Constants } from 'expo';
import Touchable from 'react-native-platform-touchable';

const STARTLANGUAGE = [
  { language: 'ar', text: 'Arabic' },
  { language: 'am', text: 'Armanian' },
  { language: 'bn', text: 'Bengali' },
  { language: 'pt-br', text: 'Brazilian Portuguese' },
  { language: 'ca', text: 'Catalan' },
  { language: 'zh-TW', text: 'Chinese Traditional' },
  { language: 'zh', text: 'Chinese' },
  { language: 'hr', text: 'Croatian' },
  { language: 'nl', text: 'Dutch' },
  { language: 'da', text: 'Danish' },
  { language: 'en', text: 'English' },
  { language: 'et', text: 'Estonian' },
  { language: 'fi', text: 'Finnish' },
  { language: 'fr', text: 'French' },
  { language: 'de', text: 'German' },
  { language: 'he', text: 'Hebrew' },
  { language: 'hi', text: 'Hindi' },
  { language: 'hu', text: 'Hungarian' },
  { language: 'it', text: 'Italian' },
  { language: 'id', text: 'Indonesian  ' },
  { language: 'ja', text: 'Japanese' },
  { language: 'ko', text: 'Korean' },
  { language: 'lv', text: 'Latvian' },
  { language: 'lt', text: 'Lithuanian' },
  { language: 'ms', text: 'Malay' },
  { language: 'no', text: 'Norwegian ' },
  { language: 'pl', text: 'Polish' },
  { language: 'pt', text: 'Portuguese' },
  { language: 'ru', text: 'Russian' },
  { language: 'ro', text: 'Romanian' },
  { language: 'sk', text: 'Slovak' },
  { language: 'sl', text: 'Slovenian' },
  { language: 'es', text: 'Spanish' },
  { language: 'sv', text: 'Swedish' },
  { language: 'th', text: 'Thai' },
  { language: 'tr', text: 'Turkish' },
  { language: 'vi', text: 'Vietnamese' },
];
const ENDLANGUAGE = [
  { language: 'ar', text: 'Arabic' },
  { language: 'am', text: 'Armanian' },
  { language: 'bn', text: 'Bengali' },
  { language: 'pt-br', text: 'Brazilian Portuguese' },
  { language: 'ca', text: 'Catalan' },
  { language: 'zh-TW', text: 'Chinese Traditional' },
  { language: 'zh', text: 'Chinese' },
  { language: 'hr', text: 'Croatian' },
  { language: 'nl', text: 'Dutch' },
  { language: 'da', text: 'Danish' },
  { language: 'en', text: 'English' },
  { language: 'et', text: 'Estonian' },
  { language: 'fi', text: 'Finnish' },
  { language: 'fr', text: 'French' },
  { language: 'de', text: 'German' },
  { language: 'he', text: 'Hebrew' },
  { language: 'hi', text: 'Hindi' },
  { language: 'hu', text: 'Hungarian' },
  { language: 'it', text: 'Italian' },
  { language: 'id', text: 'Indonesian  ' },
  { language: 'ja', text: 'Japanese' },
  { language: 'ko', text: 'Korean' },
  { language: 'lv', text: 'Latvian' },
  { language: 'lt', text: 'Lithuanian' },
  { language: 'ms', text: 'Malay' },
  { language: 'no', text: 'Norwegian ' },
  { language: 'pl', text: 'Polish' },
  { language: 'pt', text: 'Portuguese' },
  { language: 'ru', text: 'Russian' },
  { language: 'ro', text: 'Romanian' },
  { language: 'sk', text: 'Slovak' },
  { language: 'sl', text: 'Slovenian' },
  { language: 'es', text: 'Spanish' },
  { language: 'sv', text: 'Swedish' },
  { language: 'th', text: 'Thai' },
  { language: 'tr', text: 'Turkish' },
  { language: 'vi', text: 'Vietnamese' },
];

export default class TranslateScreen extends React.Component {
  static navigationOptions = {
    title: 'speak',
  };

  _fetchApitranslate = () => {
    const url =
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
      this.state.selectedStartLanguage +
      '&tl=' +
      this.state.selectedEndLanguage +
      '&dt=t&q=' +
      this.state.text;
    console.log(url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            result: responseJson[0][0][0],
          },
          function () {}
        );
        console.log(responseJson[0][0][0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      result: 'Nothing here yet... Set an input!',
      text: '',
      selectedStartLanguage: STARTLANGUAGE[0],
      selectedEndLanguage: ENDLANGUAGE[0],
      pitch: 1,
      rate: 0.75,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Choose A Language To Translate
          </Text>
        </View>
        <View style={styles.translateContainer}>
          <View
            style={{
              flex: 1,
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 20, color: '#f5a201' }}>From</Text>

            <Picker
              mode="dropdown"
              selectedValue={this.state.selectedStartLanguage}
              style={styles.picker}
              onValueChange={(itemvalue, itemindex) => {
                this.setState({ selectedStartLanguage: itemvalue });
              }}>
              {STARTLANGUAGE.map((item) => {
                return <Picker.Item label={item.text} value={item.language} />
              //  this._renderStartLanguage;
              })}
            </Picker>
          </View>

          <View
            style={{
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 20,
              flex: 1,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 20, color: '#f5a201' }}>To</Text>

            <Picker
              mode="dropdown"
              selectedValue={this.state.selectedEndLanguage}
              style={styles.picker}
              onValueChange={(itemvalue, itemindex) => {
                this.setState({ selectedEndLanguage: itemvalue });
              }}>
              {ENDLANGUAGE.map((item) => {
                return <Picker.Item label={item.text} value={item.language} />
               // this._renderEndLanguage
              })}
            </Picker>
            
          </View>
        </View>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder={'Enter Text'}
          onChangeText={(text) => this.setState({ text: text })}
        />

        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              width: '40%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginTop:20
            }}
            onPress={this._fetchApitranslate}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              {' '}
              Translate
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              width: '40%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginTop:20
            }}
            onPress={this._speak}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              Speak
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1 }}>
          <Text
            style={{
              flex: 1,
              marginTop: 70,
              borderColor: '#00537a',
              borderWidth: 3,
              height: 100,
            }}>
            {this.state.result}
          </Text>
        </View>
        <View style={{ flex: 2 }} />
      </View>
    );
  }
  _speak = () => {
    const start = () => {};
    const complete = () => {};

    Speech.speak(this.state.result, {
      language: this.state.selectedEndLanguage,
    });
    console.log('speak');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white',
    padding: 10,
  },
  headerContainer: {
    marginHorizontal: 30,
    marginTop: 5,
    height: 30,
    width: 280,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 40,
    color: 'black',
    marginLeft: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
  },
  translateContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  translateText: {
    fontSize: 10,
    color: 'black',
    marginVertical: 5,
  },
  textInput: {
    borderColor: 'black',
    height: 100,
    borderWidth: 2,
    borderRadius: 0,
    padding: 10,
    flex: 1,
    marginTop: 40,
  },
  selectedText: {
    color: '#00abff',
  },
  picker:{
    height: 30,
    width: '100%',
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    color: 'black',
  }
});
