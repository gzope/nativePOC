import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Image
} from 'react-native';
import SubNavigator from './SubNavigator';
import Cart from './Cart';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CartContext from './context';
import CartUpdateContext from './cartUpdateContext';


const Tab = createBottomTabNavigator();

function App()  {
  //const cartData=[];
   const [cartQTY,setcartQTY]=useState(0);
   const [cartData,setCartData]=useState([]);
  // useEffect(()=>{

  // },[cartQTY]);
  console.log('cartData',cartData);
  return (  
    <NavigationContainer independent={true}>  
    <CartUpdateContext.Provider value={{cartQTY:cartQTY,setcartQTY:setcartQTY,setCartData:setCartData}} >
    <CartContext.Provider value={cartData} >
    <Tab.Navigator screenOptions={{
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'grey',
          tabBarShowLabel: true,
          
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        //headerBackVisible:false,
          headerShown:true,
        //headerBackTitle: 'back',

          tabBarStyle: {
            height: 60          
          },
        }}>
     <Tab.Screen name="Product" component={SubNavigator}
      options={{
        title:"Mobile Store",        
        headerTitle:"Store",
        tabBarIcon: ({ focused }) => {
          return (
            <View>
              <Image
                source={require("../img/mobile.png")}
                resizeMode="contain"
                style={{ width: 25 }}
              />
            </View>
          );
        },
      }}
      />
     <Tab.Screen name="Cart" component={Cart} 
     options={{
      title:"Cart",
      tabBarBadge:cartData.length,
      headerTitle:"Cart",
      tabBarIcon: ({ focused }) => {
        return (
          <View>
            <Image
              source={require("../img/cart-icon.png")}
              resizeMode="contain"
              style={{ width: 25 }}
            />
          </View>
        );
      },
    }} />
     </Tab.Navigator>  
     </CartContext.Provider>
     </CartUpdateContext.Provider> 
     </NavigationContainer> 
  );
}


export default App;
