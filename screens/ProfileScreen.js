import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { ImageBackground, Platform } from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from '@expo/vector-icons';
import db from '../ConfiG';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

export default class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      name: '',
      account: '',
      image: '#',
      email: '',
      id: '',
    };
  }
  getProfile = async () => {
    var pro = await db
      .collection('users')
      .where('email', '==', this.state.userId)
      .get();
    pro.docs.map((doc) => {
      console.log(doc.data());
      var fas = doc.data();
      this.setState({
        image: fas.image,
        name: fas.name,
        account: fas.account,
        id: doc.id,
        email: doc.data().email,
      });
    });
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);

    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: '#' });
      });
  };

  componentDidMount = () => {
    this.getProfile();
    this.fetchImage(this.state.userId);
  };

  onSubmit = async () => {
    await db.collection('users').doc(this.state.id).update({
      name: this.state.name,
      account: this.state.account,
      image: this.state.image,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
              this.props.navigation.navigate('LoginScreen');
              firebase.auth().signOut();
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: -600,
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
              }}>
              <AntDesign name="logout" color="black" size={RFValue(20)} />
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Logout</Text>
            </View>
          </TouchableOpacity>

          <Text
            style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>
            Profile Screen
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            margin: 0,
          }}>
          <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size="xlarge"
            onPress={() => this.selectPicture()}
            containerStyle={styles.imageContainer}
            showEditButton
          />
        </View>
        <View
          style={{
            width: '100%',
            padding: 8,
            marginTop: 50,
            justifyContent: 'center',
          }}>
          <Text style={{ paddingLeft: 40, fontWeight: 'bold' }}> Account </Text>
          <TextInput
            style={{
              borderBottomWidth: 2,
              borderRadius: 10,
              width: '80%',
              alignSelf: 'center',
              height: 30,
              paddingLeft: 10,
              backgroundColor: 'lightgrey',
            }}
            placeholder="Account"
            value={this.state.account}
            onChangeText={(val) => {
              this.setState({ account: val });
            }}
          />
        </View>

        <View
          style={{
            width: '100%',
            padding: 8,
            marginTop: -20,
            justifyContent: 'center',
          }}>
          <Text style={{ paddingLeft: 40, fontWeight: 'bold', marginTop: 20 }}>
            {' '}
            Name{' '}
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 2,
              borderRadius: 10,
              width: '80%',
              alignSelf: 'center',
              height: 30,
              paddingLeft: 10,
              backgroundColor: 'lightgrey',
            }}
            placeholder="First Last"
            value={this.state.name}
            onChangeText={(val) => {
              this.setState({ name: val });
            }}
          />
        </View>

        <View
          style={{
            width: '100%',
            padding: 8,
            marginTop: -20,
            justifyContent: 'center',
          }}>
          <Text style={{ paddingLeft: 40, fontWeight: 'bold', marginTop: 20 }}>
            Email
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 2,
              borderRadius: 10,
              width: '80%',
              alignSelf: 'center',
              height: 30,
              paddingLeft: 10,
              backgroundColor: 'lightgrey',
            }}
            placeholder={this.state.email}
            editable={false}
          />
        </View>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 40,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
            width: '40%',
            backgroundColor: 'black',
            padding: 10,
          }}
          value={this.state.email}
          onPress={this.onSubmit}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logOutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
});
