import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import firebase from 'firebase';
import db from '../ConfiG';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/Feather';

export default class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmpwd: '',
      secureTextEntry:true,
      secureTextEntry2:true
    };
  }
  signUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        Alert.alert('User Signed Up Successfully' + response);
        var user = response.user;
        db.collection('users').add({
          email: email,
          password: password,
          name: '',
          account: '',
          image:
            'https://icon-library.com/images/avatar-png-icon/avatar-png-icon-3.jpg',
        });
        this.props.navigation.navigate('LoginScreen');
      })
      .catch(function (error) {
        var errorcode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

changeSecureText2=()=>{
    this.setState({secureTextEntry2:!this.state.secureTextEntry2})
  }
 changeSecureText=()=>{
    this.setState({secureTextEntry:!this.state.secureTextEntry})
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={require('../assets/GlobalTranslator.png')}>
          <View style={styles.headers}>
            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>
              Sign Up
            </Text>
            <Text style={{ marginTop: 10, color: 'black' }}>
              Sign in to continue
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              padding: 8,
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Email"
              onChangeText={(val) => {
                this.setState({ email: val });
              }}
              style={{
               paddingLeft: 20,
                width: '80%',
                borderRadius: 10,
                borderBottomWidth: 1,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              padding: 8,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft:-13
            }}>
            <AntDesign name="lock" size={24} />
            <TextInput
              secureTextEntry={this.state.secureTextEntry}
              placeholder="Password"
              onChangeText={(val) => {
                this.setState({ password: val });
              }}
              style={{
                paddingLeft: 20,
                width: '80%',
                borderRadius: 10,
                borderBottomWidth: 1,
              }}
            />
            <TouchableOpacity
              onPress={this.changeSecureText}
              style={{ marginLeft: -30 }}>
          {this.state.secureTextEntry?  <Icon name='eye-off' size={24}/>:  <Icon name='eye' size={24}/>}
          </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              padding: 8,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              secureTextEntry={this.state.secureTextEntry2}
              placeholder="Confirm Password"
              onChangeText={(val) => {
                this.setState({ confirmpwd: val });
              }}
              style={{
               paddingLeft: 20,
                width: '80%',
                borderRadius: 10,
                borderBottomWidth: 1,
              }}
            />
             <TouchableOpacity
              onPress={this.changeSecureText2}
              style={{ marginLeft: -30 }}>
          {this.state.secureTextEntry2?  <Icon name='eye-off' size={24}/>:  <Icon name='eye' size={24}/>}
          </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: 'center',
              marginTop: 50,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.signUp(this.state.email, this.state.password);
                this.props.navigation.navigate('LoginScreen');
              }}
              style={{
                backgroundColor: '#ffc34b',
                width: '40%',
                height: 40,
                padding: 8,
                borderRadius: 30,
                marginTop: -30,
                alignSelf: 'flex-end',
              }}>
              <Text style={{textAlign: 'center', fontSize: 15, color: 'black'  }}>
                
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

  <TouchableOpacity
              onPress={() => {
              this.props.navigation.navigate('LoginScreen');
              firebase.auth().signOut()
            }}
            style={styles.logOutButton}>
          <View style={{position: 'absolute',bottom: -40,}}>
            <AntDesign name="logout" color="black" size={RFValue(20)} />
            <Text style={{fontWeight:'bold'}}>Go Back To Login Screen</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 25,
    justifyContent: 'center',
  },
  headers: {
    width: '100%',
    height: 80,
    padding: 20,
    marginTop: 40,
  },
});
