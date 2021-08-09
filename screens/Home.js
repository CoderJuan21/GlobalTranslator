import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/Feather';
import firebase from 'firebase'
import {RFValue} from 'react-native-responsive-fontsize'

export default class Home extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>


<TouchableOpacity
 activeOpacity={0.6}
      onPress={()=>{
        this.props.navigation.navigate('CategoryScreen')
      }}
      style={{alignItems:'center'}}>
      <Card style={{ marginVertical:10, marginHorizontal:20, padding: 20, height:150, overflow:'hidden', width:300 }}>
      <Image source={require('../assets/bg.jpg')} style={{zIndex:-1,position:'absolute',resizeMode:'stretch', borderRadius:10}}/>
        <Text style={{ fontSize: 30, fontWeight: '500', color:'black' }}>Categories</Text>
        <Text style={{ fontSize: 15,color:'black' }}>
          View frequent questions in each catergories!
        </Text>
        <View style={{ alignItems: 'flex-end' }}>
          <FontAwesome
            name="long-arrow-right"
            size={24}
            color="black"
          />
        </View>
      </Card>
      </TouchableOpacity>

      <TouchableOpacity
 activeOpacity={0.6}
      onPress={()=>{
        this.props.navigation.navigate('Translate')
      }}
      style={{alignItems:'center'}}>
      <Card style={{ marginVertical:10, marginHorizontal:20, padding: 20, height:150, overflow:'hidden', width:300 }}>
      <Image source={require('../assets/bg.jpg')} style={{zIndex:-1,position:'absolute',resizeMode:'stretch', borderRadius:10}}/>
        <Text style={{ fontSize: 30, fontWeight: '500', color:'black' }}>Instant Translation</Text>
        <Text style={{ fontSize: 15,color:'black' }}>
         Find out the translation for your custom questions!
        </Text>
        <View style={{ alignItems: 'flex-end' }}>
          <FontAwesome
            name="long-arrow-right"
            size={24}
            color="black"
          />
        </View>
      </Card>
      </TouchableOpacity>

     <TouchableOpacity
 activeOpacity={0.6}
      onPress={()=>{
        this.props.navigation.navigate('Save')
      }}
      style={{alignItems:'center'}}>
      <Card style={{ marginVertical:10, marginHorizontal:20, padding: 20, height:150, overflow:'hidden', width:300 }}>
      <Image source={require('../assets/bg.jpg')} style={{zIndex:-1,position:'absolute',resizeMode:'stretch', borderRadius:10}}/>
        <Text style={{ fontSize: 30, fontWeight: '500', color:'black' }}>Save Questions</Text>
        <Text style={{ fontSize: 15,color:'black' }}>
          Save your most frequently asked questions!
        </Text>
        <View style={{ alignItems: 'flex-end' }}>
          <FontAwesome
            name="long-arrow-right"
            size={24}
            color="black"
          />
        </View>
      </Card>
      </TouchableOpacity>
 <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
              this.props.navigation.navigate("LoginScreen");
              firebase.auth().signOut()
            }}
          > 
          <AntDesign name="logout" color="black" size={RFValue(20)}/>
            <Text>Logout</Text>
          </TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#727272"
  },
  header: {
    width: '100%',
    height: 80,
    paddingTop: 36,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'orange',
    fontSize: 30,
    marginTop:-25
  },
});