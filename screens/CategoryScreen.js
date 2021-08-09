/*R<esturants - Can I Have a menu? What is there to drink? Can I Have...? How much is the bill? What are the specials for today? Can I have a new ...(Fork, Spoon, Napkin)? Where is ... ___?  What do you call the waiter, Waitress, Chef, Manager, Busboy, Busgirl?  

Travel - Can you take me to? Where is ... ?  How far away is ... ? When does the ... (train, bus, ...) arrive? Are there any tourist attractions? Where is a good resturant? Where are there fun (Family) activities? 

Meeting someone new - How are you?, How is ... ?  How old are you? Goodmorning, Goodnight. What are your hobbies? Describe yourself or someone else, Physically or Personality wise.  Where do you live?Where are you orignially from?  Do you have any siblings? What grade are you in? Whats your favorite color? What is your Job? Where is your job?  

Asking about the weather, News. - Whats the weather for today?  Is it snowing? Is it Raining, Sleeting, Haliing.  What is the tempeture outside?  Is it dangerous to drive?  Is it icy outside?  Anything new happening?  Whats the score between ... and ...?  

House Objects - Television , Desk , Chair , Water bottle , phone,  kitchen , living room, dining room , bedroom, bathroom, laundry room,  laundry,  basket,  floor , wall, roof, cup , spoon , fork , knife, butter knife, house, apartment, mansion , 

School - Teacher, student, classmate, whiteboard, chalkboard, pencil, pen, binder, folder, backpack, eraser, hallway , classroom , computer , desk , cafeteria, library, gym , math, english, social studies, science, music , language arts,   
*/
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Card from '../components/Card';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/Feather';
import firebase from 'firebase'
import {RFValue} from 'react-native-responsive-fontsize'

export default class CategoryScreen extends React.Component{
  render(){
  return (
    <View style={styles.container}>
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Category Screen</Text>
      </View>

 <TouchableOpacity
 activeOpacity={0.6}
      onPress={()=>{
        this.props.navigation.navigate('TargetLanguageScreen',{category:'Resturant'})
      }}
      style={{alignItems:'center'}}>
      <Card style={{ marginVertical:10, marginHorizontal:20, padding: 20, height:150, overflow:'hidden', width:300}}>
      <Image source={require('../assets/resturant.png')} style={{zIndex:-1,position:'absolute',resizeMode:'stretch', borderRadius:2}}/>
        <Text style={{ fontSize: 30, fontWeight: '500', color:'black' }}>Restaurant</Text>
        <Text style={{ fontSize: 15,color:'black' }}>
          
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
        this.props.navigation.navigate('TargetLanguageScreen',{category:'Travel'})
      }}
      style={{alignItems:'center'}}>
      <Card style={{ marginVertical:10, marginHorizontal:20, padding: 20, height:150, overflow:'hidden', width:300 }}>
      <Image source={require('../assets/travel.png')} style={{zIndex:-1, position:'absolute',resizeMode:'stretch', borderRadius:2,}}/>

        <Text style={{ fontSize: 30, fontWeight: '500' }}>Travel</Text>
        <Text style={{ fontSize: 15 }}>
         
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
        this.props.navigation.navigate('TargetLanguageScreen',{category:'Introductions'})
      }}
      style={{alignItems:'center'}}>
      <Card style={{  marginVertical:10, marginHorizontal:20, padding: 20, height:150, overflow:'hidden', width:300 }}>
      <Image source={require('../assets/introduction.png')} style={{zIndex:-1, position:'absolute',resizeMode:'stretch', borderRadius:2,}}/>
        <Text style={{ fontSize: 30, fontWeight: '500' , flexDirection:'row'}}>Introductions</Text>
        <Text style={{ fontSize: 15 }}>
         
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
        this.props.navigation.navigate('TargetLanguageScreen',{category:'NewsAndWeather'})
      }}
      style={{alignItems:'center'}}>
      <Card style={{  marginVertical:10, marginHorizontal:20, padding: 20, height:150, overflow:'hidden', width:300 }}>
      <Image source={require('../assets/Weather.png')} style={{zIndex:-1, position:'absolute',resizeMode:'stretch', borderRadius:2,}}/>
        <Text style={{ fontSize: 30, fontWeight: '500' }}>Weather/News</Text>
        <Text style={{ fontSize: 15 }}>
       
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
        this.props.navigation.navigate('TargetLanguageScreen',{category:'HouseObjects'})
      }}
      style={{alignItems:'center'}}>
      <Card style={{  marginVertical:10, marginHorizontal:20, padding: 20, height:150, overflow:'hidden', width:300 }}>
      <Image source={require('../assets/HomeItems.png')} style={{zIndex:-1, position:'absolute',resizeMode:'stretch', borderRadius:2,}}/>
        <Text style={{fontSize: 30, fontWeight: '900',width:180,height:35,color:'white' }}>Home Items</Text>
        <Text style={{ fontSize: 15 }}>
         
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
        this.props.navigation.navigate('TargetLanguageScreen',{category:'School'})
      }}
      style={{alignItems:'center'}}>
      <Card style={{  marginVertical:10, marginHorizontal:20, padding: 20, height:150, overflow:'hidden', width:300 }}>
      <Image source={require('../assets/School.png')} style={{zIndex:-1, position:'absolute',resizeMode:'stretch', borderRadius:2,}}/>
        <Text style={{ fontSize: 30, fontWeight: '900',width:100,height:35 , color:'white'}}>School</Text>
        <Text style={{ fontSize: 15 }}>
        
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
              this.props.navigation.navigate("Home");
            }}
          > 
          <AntDesign name="logout" color="#ffc34b" size={RFValue(20)}/>
            <Text>Go Back</Text>
          </TouchableOpacity>
          </ScrollView>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ccc"
  },
  header: {
    width: '100%',
    height:60,
    paddingTop: 36,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'orange',
    fontSize: 20,
    marginTop:-25
  },
});