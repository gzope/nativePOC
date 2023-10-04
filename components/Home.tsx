import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Pressable
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MobileList from "./MobileList";
function Home({ navigation } : any ){

  function goToProduct(e:any)
  {
    navigation.push('Product',{id:e})
  }  
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title} >Mobile Store</Text>
      
      <View >
        <Text style={styles.brandHeader}>iPhone</Text>
      </View>
      <View style={styles.tileContainer}>
      <ScrollView horizontal>
        {MobileList.data.map((Element)=>{
          return (
            (Element.company=='Apple') &&(
              <Pressable key={Element.id} onPress={()=>{goToProduct(Element.id)}}>
                <View key={Element.id} style={styles.tile}>            
                  <Image
                    style= {{flex:1 , width: undefined, height: undefined}}
                    source={Element.URI}
                    resizeMode ='contain'                
                  />                   
                  <Text style={styles.productDesc}>{Element.name}</Text>
                  <Text style={styles.productDesc}>{Element.company}</Text>
                </View>
            </Pressable>  )
          )
        })}        
        </ScrollView>
      </View>
      <View >
        <Text style={styles.brandHeader}>Samsung</Text>
      </View>
      <View style={styles.tileContainer}>
      <ScrollView horizontal>
        {MobileList.data.map((Element)=>{
          return (
            (Element.company=='Samsung') &&(
              <Pressable key={Element.id} onPress={()=>{goToProduct(Element.id)}}>
                <View  style={styles.tile}>
                <Image
                  style= {{flex:1 , width: undefined, height: undefined}}
                  source={Element.URI}
                  resizeMode ='contain'               
                 />               
                <Text style={styles.productDesc}>{Element.name}</Text>
                <Text style={styles.productDesc}>{Element.company}</Text>
                </View> 
              </Pressable> )
          )
        })}        
        </ScrollView>
      </View>
    </View>      
    </ScrollView>
  );


}

const styles = StyleSheet.create({
  container: {    
    marginLeft:10,
    marginRight:10
  },
  tileContainer:{
    display:'flex',
    flexDirection:'row'
  },
  tile:{
    height:200,
    width:200,
    margin:10
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  brandHeader:{
    textAlign:'center',
    fontSize: 16,
    marginBottom:10,
    marginTop:20
  },
  productImage
  :{ },
  productDesc:{
    textAlign:'center',
    fontSize: 14
  }

});

export default Home;
