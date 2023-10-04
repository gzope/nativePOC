import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import products from './ProductList';
import CartContext from './context';
import cartUpdateContext from './cartUpdateContext';

function Product({ route,navigation }) {
   const { id } = route.params;
  const [currentProduct,setCurrentProduct]=useState({});
  const [currentsubProduct,setCurrentsubProduct]=useState({});
  const [cartStatus,setCartStatus]=useState(false);
  const cartData=useContext(CartContext);   
  const cartUpdateData=useContext(cartUpdateContext);  


  useEffect(()=>{
    let currentItem=products.data.find(item => {
                    return item.id == id;
                     });
    setCurrentProduct(currentItem);
    setCurrentsubProduct(currentItem.desc);    
    let cindex;
    cartData.forEach((element,index)=>{
      if (element.id===id)
      {
        cindex=index;
      }
    });
    if (cindex > -1) {
      setCartStatus(true);
    }
  },[]);  

  function addToCart(id)
  {    
    setCartStatus(true);
    let me ={id:id,qty:1}
    cartData.push(me); 
    cartUpdateData.setcartQTY(cartUpdateData.cartQTY+1);    
  }
  function deleteCart(id)
  {   
    setCartStatus(false);    

    let cindex;
    cartData.forEach((element,index)=>{
      if (element.id===id)
      {
        cindex=index;
      }
    });  
    const index = cindex;   
    if (index > -1) {  
      cartData.splice(index, 1); 
    }
    cartUpdateData.setcartQTY(cartUpdateData.cartQTY-1); 
  }
  return (
    <ScrollView>
    <View>
      <Text style={styles.productTitle}>{currentProduct.name}</Text>
      <View style={styles.productDesc}> 
        <ScrollView>
                <View style={styles.productImage}>
                {currentProduct.URI && (<Image
                  source={currentProduct.URI}
                  style={styles.productImage1}
                  resizeMode='contain'                                 
                 /> )}
                 </View>
                 <View>
                  <Text style={styles.productDescContent}> Brand : {currentProduct.company}</Text>
                  <Text style={styles.productDescContent}> Models : {currentsubProduct.models}</Text>
                  <Text style={styles.productDescContent}> SAR : {currentsubProduct.sar}</Text>
                  <Text style={styles.productDescContent}> SAR EU : {currentsubProduct.sar_eu}</Text>
                  <Text style={styles.productDescContent}> Price : {currentsubProduct.price}</Text>
                 </View>
        </ScrollView>
      </View> 
      <View style={styles.button}>    
        {!cartStatus && 
        <Button        
          title="Add to Cart"
          onPress={() => {addToCart(currentProduct.id)}}
        />
       }  
        {cartStatus && (<Button        
          title="Remove from Cart"          
          onPress={() => {deleteCart(currentProduct.id)}}
        />) } 
      </View>
      <View style={styles.button}>    
       <Button
        title="Go to Home"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      </View>
    </View>      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productTitle :
  {
    textAlign:'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:10,
    marginBottom:20
  },
  productDesc :{
    // backgroundColor:"red",
    display:'flex',
    flexDirection:"column",
    alignItems:'center'
  },
  productImage :{
    height:400,
    width:300,
    // backgroundColor:"blue"    
  },  
  productImage1 :{
     height:"100%",
     width:"100%"
  }, 
  productDescContent:
  {
    fontSize: 16,    
    marginTop:10,    
  },
  button:{
    margin:10
  }
});

export default Product;
