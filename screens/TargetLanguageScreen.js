import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Picker,
  Button,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import db from '../ConfiG';
import localdb from '../localdb'
import { Feather } from '@expo/vector-icons'; 
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';

const TargetLanguage = [
  { language: 'en', text: 'English' },
  { language: 'ar', text: 'Arabic' },
  { language: 'hi', text: 'Hindi' },
  { language: 'es', text: 'Spanish' },
  { language: 'zh-CN', text: 'Chinese' },
  { language: 'vi', text: 'Vietnamese' },
  { language: 'bn', text: 'Bengali' },
  { language: 'ru', text: 'Russian' },
  { language: 'ja', text: 'Japanese' },
  { language: 'it', text: 'Italian' },
  { language: 'th', text: 'Thai' },
  { language: 'nl', text: 'Dutch' },
  { language: 'fr', text: 'French' },
  { language: 'he', text: 'Hebrew' },
  { language: 'ko', text: 'Korean' },
  { language: 'no', text: 'Norwegian ' },
  { language: 'id', text: 'Indonesian  ' },
  { language: 'pl', text: 'Polish' },
  { language: 'sv', text: 'Swedish' },
  { language: 'tr', text: 'Turkish' },
  { language: 'hr', text: 'Croatian' },
];


export default class TargetLanguageScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      primaryLanguage: 'en',
      translatedLanguage: 'en',
      currentQuestions: [],
      questions:[],
      icon:'play',
      selectedQuestion:null
    };
  }

  getresQuestions=()=>{
var rescategory = this.props.navigation.getParam('category')
var resturant = localdb[rescategory];
this.setState({questions:resturant})

  }
componentDidMount=()=>{
  this.setState({questions:[]})
  this.getresQuestions();
}
  findTranslation = () => {
    this.state.questions.map((item) => {
      this.fetchApitranslate(item.question, this.state.primaryLanguage);
    });
  };

  fetchApitranslate = (question,language) => {
    const url =
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
      'en' +
      '&tl=' +
      language +
      '&dt=t&q=' +
      question;
    console.log(url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          currentQuestions: [
            ...this.state.currentQuestions,
            responseJson[0][0][0],
          ],
        });
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Something went wrong. Try again later');
      });
  };

  fetchApitranslateSpeak = (question,primaryLanguage, targetLanguage) => {
    const url =
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
      primaryLanguage +
      '&tl=' +
      targetLanguage +
      '&dt=t&q=' +
      question;
    console.log(url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson[0][0][0];
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Something went wrong. Try again later');
      });
  };

  speak= async(language,text)=>{
    var result = await this.fetchApitranslateSpeak(text, this.state.primaryLanguage, this.state.translatedLanguage)
    const start =()=>{
      this.setState({icon:'stop'})
    }
    const done =()=>{
      this.setState({icon:'play'})
    }
Speech.speak(result,{language:language,onStart:start, onDone:done})
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Category Screen</Text>
      </View>
      <ScrollView>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <Text style={{fontSize:16,fontWeight:'bold'}}>Text</Text>
        <Text style={{fontSize:16,fontWeight:'bold'}}>Speech</Text>
        </View>
        <View style={styles.pickerdirection}>
          <Picker
            mode="dropdown"
            selectedValue={this.state.primaryLanguage}
            style={styles.picker}
            onValueChange={(itemvalue, itemindex) => {
              this.setState({ primaryLanguage: itemvalue });
            }}>
            {TargetLanguage.map((item) => {
              return <Picker.Item label={item.text} value={item.language} />;
            })}
          </Picker>

          <Picker
            mode="dropdown"
            selectedValue={this.state.translatedLanguage}
            style={styles.picker}
            onValueChange={(itemvalue, itemindex) => {
              this.setState({ translatedLanguage: itemvalue });
            }}>
            {TargetLanguage.map((item) => {
              return <Picker.Item label={item.text} value={item.language} />;
            })}
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.findTranslation();
            this.setState({ currentQuestions: [] });
          }}>
          <Text style={styles.buttonText}>Translate</Text>
        </TouchableOpacity>

        {this.state.currentQuestions.map((item,index) => {
          return( <View style={styles.questions}>
          <Text>{item}</Text>
          <TouchableOpacity
          onPress={()=>{
            this.setState({selectedQuestion:index})
            this.speak(this.state.translatedLanguage,item)
          }}>
          <FontAwesome name={this.state.selectedQuestion===index? this.state.icon: 'play'} size={24} color="black" />
          </TouchableOpacity>
          </View>)
        })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  picker: {
    height: 40,
    width: '50%',
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
  },
  pickerdirection: {
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    width: '40%',
    alignSelf: 'center',
    marginTop:20
  },
  buttonText: {
    textAlign: 'center',
  },
  questions:{
shadowColor:'black',
shadowOpacity:0.26,
shadowOffset:{width:0,height:2},
shadowRadius:1,
elevation:6,
backgroundColor:'#fd9429',
padding:20,
borderRadius:10,
flexDirection:'row',
marginTop:10,
justifyContent:'space-between',
width:'100%',
alignSelf:'center',
alignItems:'center'
  },
  header:{
    width: '100%',
    height: 50,
    paddingTop: 0,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:-40
  },
  headerTitle:{
    color: 'orange',
    fontSize: 20,
  }
});
