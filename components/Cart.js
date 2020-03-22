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

class Cart extends Component{
    
    constructor(){
        super()
       
    }

    
    checkoutHandler(){

    }
    
   

  
    render(){
      // console.log(this.props.cart)
      const cartList=[];
      const cart=this.props.cart;
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
                    
                    <Subtitle style={{color:'black', marginLeft:6}}>‎₦ {cart[i].price}</Subtitle>
                  </View>
                </Left>

                <Right>
                  <Subtitle style={{color:'black', marginLeft:6}}>{cart[i].qty}</Subtitle>
                  <TouchableOpacity>
                    <Subtitle style={{color:'black'}}>Remove</Subtitle>
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

export default connect(mapStateToProp)(Cart);
