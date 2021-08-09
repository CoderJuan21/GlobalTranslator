import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Picker,
  Alert,
  ScrollView
} from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from '@expo/vector-icons';
import db from '../ConfiG';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import * as Speech from 'expo-speech';

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

export default class SaveConvoScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allSentences: [],
      currentUser: firebase.auth().currentUser.email,
      sentence: '',
      primaryLanguage: 'en',
      translatedLanguage: 'en',
      selectedQuestion:null,
      icon:'play',
    };
  }

  deleteSentence = async (id) => {
db.collection("sentences").doc(id).delete().then(()=>{
  console.log("doc deleted successfully")
  this.getSentence()
}).catch((error)=>{
console.log("error")
})
  }

  addSentence = async () => {
    db.collection('sentences').add({
      email: this.state.currentUser,
      sentence: this.state.sentence,
    });
    this.getSentence();
  };
  getSentence = async () => {
    this.setState({ allSentences: [] });
    var response = await db
      .collection('sentences')
      .where('email', '==', this.state.currentUser)
      .get();
    console.log(response.docs);
    response.docs.map((doc) => {
      var temp = this.state.allSentences;
      var t = doc.data();
      t['id'] = doc.id;
      temp.push(t);
      this.setState({ allSentences: temp });
      console.log(doc.data());
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


  componentDidMount = () => {
    this.getSentence();
  };
  render() {
    return (
      <View style={styles.container}>
       <View style={styles.header}>
        <Text style={styles.headerTitle}>Save Questions And Words</Text>
      </View>
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
        <View
          style={{
            borderWidth: 1,
            flexDirection: 'row',
            width: '80%',
            height: 30,
            borderRadius: 8,
            paddingLeft: 10,
            marginTop: 20,
            alignSelf:'center'
          }}>
          <TouchableOpacity
            onPress={() => {
              this.addSentence();
            }}>
            <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={{ width: '80%', paddingLeft: 10, }}
            placeholder="Add a sentence"
            onChangeText={(val) => {
              this.setState({ sentence: val });
            }}
          />
        </View>
        <ScrollView>
        {this.state.allSentences.map((item,index) => {
          return(
          <View style={styles.sentencess}>
            <Text style={{fontSize:16, width:'70%'}}>{item.sentence}</Text>
            <TouchableOpacity
             onPress={()=>{
            this.setState({selectedQuestion:index})
            this.speak(this.state.translatedLanguage,item.sentence)
          }}>
            <FontAwesome name={this.state.selectedQuestion===index? this.state.icon: 'play'} size={24} color="black" />
            </TouchableOpacity>
            
             <TouchableOpacity
             onPress={()=>{
               this.deleteSentence(item.id)
             }}>
            <Feather name="trash-2" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )})}
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
  sentencess: {
    backgroundColor: '#eee',
    width:'90%',
    marginTop:10,
    padding:6,
    flexDirection:'row',
    justifyContent:'space-between',
    elevation:10,
    alignSelf:'center'
  },
  header: {
    width: '100%',
    height: 40,
    paddingTop: 36,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-40
  },
  headerTitle: {
    color: 'orange',
    fontSize: 20,
    alignContent:'center',
    marginTop:-30
  },
});
