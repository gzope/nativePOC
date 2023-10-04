import React from 'react';
import {  
  Button
} from 'react-native';
import Home from './Home';
import Product from './Product';
import ProductDesc from './ProductDesc';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function SubNavigator(): JSX.Element {
  
  return (    
    <NavigationContainer independent={true}>    
    <Stack.Navigator screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        //headerBackVisible:false,
        headerShown:false        
      }}>
      
      <Stack.Screen name="HomeScreen" component={Home} options={{ 
        headerTitle: 'Mobile Store',
        headerRight: () => (
          <Button
            onPress={() => console.log('try to go home')}
            title="Info"
            color="#fff"
          />
        ),
       }} />   
      <Stack.Screen name="Product" component={Product} />   
      <Stack.Screen name="ProductDesc" component={ProductDesc} />        
      </Stack.Navigator>
    </NavigationContainer>      
  );
}


export default SubNavigator;
