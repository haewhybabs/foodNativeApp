import React,{Component} from 'react';
import { 
  StyleSheet, 
  TouchableOpacity,
  View,
  Text,
  Button
   } from 'react-native';

import{
  Container,Header,Body,CheckBox,Title,Card,
  CardItem,Left,Right,Content,Grid,
  Col,Icon, Subtitle,Thumbnail
} from 'native-base';

import {connect} from 'react-redux';
import {removeFromCartAction} from '../redux/cart_action';
import {addToCartAction} from '../redux/cart_action';
import {bindActionCreators} from 'redux';
import InputSpinner from "react-native-input-spinner";

class Cart extends Component{
    
    constructor(){
        super()
       
    }

    
    checkoutHandler(){

    }
    
    removeCartAction = (item) =>{    

      this.props.removeFromCartAction(item);
    }

    updateQuantity = (type, cart) =>{
      if(type==1){
        cart.qty=cart.qty+1
      }
      else{
        if(cart.qty>1){
          cart.qty=cart.qty-1;
        }
        cart.qty=cart.qty;
        
      }
      console.log(cart);
      this.props.addToCartAction(cart);


    }

  
    render(){
     
      const cartList=[];
      const cart=this.props.cart;

      const removeCart=(item)=>{
          this.removeCartAction(item);
      }
      if(cart.length>0){

        for(let i=0; i<cart.length; i++){
          
          
          cartList.push(

            <Card key={cart[i].id}>
              <CardItem>
                <Left>
                  <Thumbnail
                    source={require('../assets/img/shopping-icon.svg')}
                    style={{width:40,height:30}}
                  />  
                  <View style={{alignItems:'flex-start', top:-5}}>
                    <Subtitle style={{color:'black', marginLeft:6}}>{cart[i].name}</Subtitle>
                    <Text style={{marginLeft:10}}>Sub Title</Text>
                    
                    <Subtitle style={{color:'black', marginLeft:6}}>‎₦ {cart[i].price * cart[i].qty}</Subtitle>
                  </View>
                </Left>

                <Right>
                <Grid>
                  
                  <TouchableOpacity onPress={()=>this.updateQuantity(1,cart[i])}>
                    <Title style={{color:'black', marginRight:10, fontSize:23}}>+</Title>
                  </TouchableOpacity>
                    <Title style={{color:'#ffb200',fontSize:12,marginTop:5}}>{cart[i].qty}</Title>
                    <TouchableOpacity onPress={()=>this.updateQuantity(0,cart[i])}>
                      <Title style={{color:'black', marginLeft:10, fontSize:23}}>-</Title>
                  </TouchableOpacity>
                </Grid>
                
                  <TouchableOpacity onPress={()=>removeCart({id:cart[i].id})}>
                    <Subtitle style={{color:'red'}}>Remove</Subtitle>
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </Card>
          );
        };
      }


        return (  
          <Container style={{backgroundColor:'#efefef'}}>   
            <Content>
              <Card style={{alignItems:'center'}}>
                <CardItem header>
                    <Icon name="map" style={{color:'#ffb200'}}/>
                        <Title style={{color:'black'}}>Cart Food</Title>
                    <Icon name="heart" style={{color:'#ffb200'}}/>
                </CardItem>   
              </Card>
              
              
              {cartList}

               <Button title="Checkout" onPress={this.checkoutHandler} color='#ffb200'/>

               
              
            </Content>
           
          </Container>

        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});


const mapStateToProp = (state) =>{
  return {
      cart:state.cart
  }
}


const mapActionstoProps = (dispatch) => {
  return bindActionCreators({
      removeFromCartAction,
      addToCartAction
  },dispatch)
}

export default connect(mapStateToProp,mapActionstoProps)(Cart);
