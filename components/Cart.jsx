import React, { useContext , useEffect, useState } from 'react';
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
import CartContext from './context';
import products from './ProductList';
import { useIsFocused } from "@react-navigation/core";


function Cart({ navigation }) {
  const cartData=useContext(CartContext);    
  //const
  const isFocused = useIsFocused();
  const [curVal,setCurVal]=useState(0);

  useEffect(() => {
    if (isFocused) {
      console.log("HELLO HOME");
    }
  }, [isFocused]);
 
  
  function getURL(id)
  {
    let currentItem=products.data.find(item => {
      return item.id == id;
       });
       return currentItem?.URI;
  }
  function getName(id)
  {
    let currentItem=products.data.find(item => {
      return item.id == id;
       });
       return currentItem?.company+' '+currentItem.name;
  }
  function getPrice(id)
  {
    let currentItem=products.data.find(item => {
      return item.id == id;
       });
       return currentItem?.desc.price;
  }
  function getTotalPrice(id)
  {
    let currentItem=products.data.find(item => {
      return item.id == id;
       });
       let qty=cartData.find(item => {
        return item.id == id;
         });
       return currentItem?.desc.price * qty.qty;
  }
  function addQTY(id)
  { 
    let cindex;
    cartData.forEach((element,index)=>{
      if (element.id===id)
      {
        cindex=index;
      }
    });  

    let qty=cartData[cindex].qty;
    let me ={id:id,qty:qty+1}

    const index = cindex;   
    if (index > -1) {  
      cartData.splice(index, 1); 
    }    
    cartData.push(me); 
    setCurVal(curVal+1);
  }
  
  function removeQTY(id)
  { 
    console.log("remoce");
    let cindex;
    cartData.forEach((element,index)=>{
      if (element.id===id)
      {
        cindex=index;
      }
    });  

    let qty=cartData[cindex].qty;
    if (qty===1)
    {
      let me ={id:id,qty:qty+1}
      const index = cindex;   
      if (index > -1) {  
        cartData.splice(index, 1); 
      }          
      setCurVal(curVal+1);
    }
    else{
      let me ={id:id,qty:qty-1}
      const index = cindex;   
      if (index > -1) {  
        cartData.splice(index, 1); 
      }    
      cartData.push(me); 
      setCurVal(curVal+1);
    }
    
  }
  function getTotalProductAmt()
  {
    let price =0;
    cartData.forEach((element)=>{
      let currentItemPrice=getTotalPrice(element.id);
      price=price+currentItemPrice;
    })
    return price;
  }
  return (
    <ScrollView>
    <View>
      <Text style={styles.title}>Current Cart</Text>
      <View>
        <View style={styles.productMainContainer}>
        {cartData.map((element)=>{
          return (
          <View key={element.id} style={styles.productContainer}>
            <Image source={getURL(element.id)}
                  style={styles.productImage1}
                  resizeMode='contain' />
            <View >
              <Text style={styles.productTitle}> Product Name and Brand :</Text>
              <Text style={styles.productValue}>{getName(element.id)}</Text>
              <Text style={styles.productTitle}>Quantity :</Text>
              <View style={styles.qtyView} >
                <Pressable onPress={()=>{addQTY(element.id)}}>
                <Image  style={styles.qtyImage} 
                        source={require("../img/plus.png")}
                        resizeMode="contain"
                />
                </Pressable>
                <Text style={[styles.productValue,styles.qtyText]}>{element.qty}</Text>
                <Pressable onPress={()=>{removeQTY(element.id)}}>
                <Image  style={styles.qtyImage} 
                        source={require("../img/minus.png")}
                        resizeMode="contain"
                />
                </Pressable>
              </View>
              <Text style={styles.productTitle}>Unit Price :</Text>
              <Text style={styles.productValue}>{getPrice(element.id)}</Text>
              <Text style={styles.productTitle}>Total Price :</Text>
              <Text style={styles.productValue}>{getTotalPrice(element.id)}</Text>
            </View>
          </View>
          )
        })}
          
        
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Total Amount : {getTotalProductAmt()}</Text>
      </View>
    </View>      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productImage1 :
  {
    height:150,
    width:150
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },  
  productContainer:
  {
      display:'flex',
      flexDirection:'row',
      padding:10,
      borderWidth:  1,
      borderColor:"green",
      borderRadius:10,
  },
  productMainContainer:{
    borderWidth:  2,
    borderRadius:10,
    margin:5
  },
  bottomContainer:{
    marginLeft:20,    
  },
  bottomText:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  productValue :
  {
    fontSize: 14,    
  },
  productTitle:
  {
    fontSize: 14,
    fontWeight: 'bold',
  },
  qtyImage:{
    height:30,
    width:30,
    marginRight:10,
    marginLeft:10
  },
  qtyView:{
    display:'flex',
    flexDirection:"row",    
  },
  qtyText:{
    fontSize:20,
    fontWeight: 'bold',
    color:"red",
    margin:1
  }

});


export default Cart;
