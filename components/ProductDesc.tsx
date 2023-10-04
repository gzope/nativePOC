import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function ProductDesc({ navigation }:any): JSX.Element {
  
  return (
    <ScrollView>
    <View>
      <Text>ProductDesc Page</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('HomeScreen')}
      />
    </View>      
    </ScrollView>
  );
}


export default ProductDesc;
