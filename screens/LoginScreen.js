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
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';
import db from '../ConfiG';
import Icon from '@expo/vector-icons/Feather';
import { AntDesign } from '@expo/vector-icons';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      secureTextEntry:true
    };
  }
  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        Alert.alert('Login successful');
      })
      .catch((error) => {
        var errorCode = error.code;
        var message = error.message;
        return Alert.alert(message);
      });
  };

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
            <Text
              style={{
                color: 'black',
                fontSize: 30,
                fontWeight: 'bold',
              }}>
              Login
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
            <AntDesign name="mail" size={24} />
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
              marginLeft:-4,
              textAlign:'center'
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

          <View style={{}}>
            <TouchableOpacity
             onPress={() => {
                this.login(this.state.email, this.state.password);
                this.props.navigation.navigate('LoadingScreen')
              }}
              style={{
                backgroundColor: '#ffc34b',
                width: '30%',
                height: 40,
                padding: 8,
                borderRadius: 30,
                marginTop: 70,
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{ textAlign: 'center', fontSize: 15, color: 'black' }}>
                Login->
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: 340,
              fontWeight: 'bold',
              color: 'black',
            }}
            onPress={() => this.props.navigation.navigate('SignUpScreen')}>
            New User? Create an Account{' '}
          </Text>

          <Text
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: 365,
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
            }}
            onPress={() => this.props.navigation.navigate('ForgotPassword')}>
            Forgot Password?
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
