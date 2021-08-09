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
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from '@expo/vector-icons';

export default class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }
  render() {
    return (
      <View
        style={{
          marginTop: 30,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={require('../assets/GlobalTranslator.png')}>
          <View style={styles.headers}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color:'#e3ae44'
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
              position:'absolute',
              bottom:400,
            }}>
            <AntDesign name="mail" size={24} />
          <TextInput
            style={{
              paddingLeft: 20,
                width: '80%',
                borderRadius: 10,
                borderBottomWidth: 1,
            }}
            placeholder="Enter Email"
            onChangeText={(text) => {
              this.setState({ email: text });
            }}/>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              width: '60%',
              height: 30,
              padding: 10,
              borderRadius: 2,
              position:'absolute',
              bottom:350,
              justifyContent:'center',
              alignSelf:'center'
            }}
            onPress={() => {
              firebase.auth().sendPasswordResetEmail(this.state.email);
              Alert.alert('Email sent to reset password!');
            }}>
            <Text style={{ textAlign: 'center', color: 'white' }}>
              Send Reset Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{position:'absolute',bottom:300}}
            onPress={() => {
              this.props.navigation.navigate('LoginScreen');
            }}>
            <AntDesign name="logout" color="black" size={RFValue(20)} />
            <Text>Go Back</Text>
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
  headers:{
    width: '100%',
    height: 80,
    padding: 20,
    marginTop: 40,
    color:'#ffc34b'
  }
});
