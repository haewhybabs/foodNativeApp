import React,{Component} from 'react';
import { 
  StyleSheet, 
  TouchableOpacity,
  View,
  Text,
   } from 'react-native';

import{
  Container,Header,Body,CheckBox,Title,Card,
  CardItem,Left,Right,Content,Grid,
  Col,Icon, Subtitle,Thumbnail,Button
} from 'native-base';

import {connect} from 'react-redux';
import {removeFromCartAction,addToCartAction,saveCartSummaryAction} from '../redux/cart_action';
import {bindActionCreators} from 'redux';
import {AsyncStorage} from 'react-native';

class Cart extends Component{
    
    constructor(){
      super()
       
    }

    
    
    checkoutHandler  = async(totalAmount) => {
      let userDetails = this.props.user;
      let Vendor = await AsyncStorage.getItem('cartVendor');
      let vendorCart = JSON.parse(Vendor);
      this.props.saveCartSummaryAction({
        vendor_id:vendorCart.id,
        cart_amount:totalAmount,
        vendor:vendorCart.name
      });

      if(userDetails.token){
        this.props.navigation.navigate('Checkout');
      }
      else{
        this.props.navigation.navigate('Login');
      }

      
      
            
      
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
     
      this.props.addToCartAction(cart);


    }

  
    render(){

      const cartList=[];
      const cart=this.props.cart;
      var totalAmount = 0;

      const removeCart=(item)=>{
          this.removeCartAction(item);
      }
      if(cart.length>0){

        for(let i=0; i<cart.length; i++){
          totalAmount = totalAmount+cart[i].price * cart[i].qty;
          
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

                    {cart[i].details.map((row, index) => (
                      <Text key={cart[i].id+row.idstockdetails} style={{marginLeft:10}}>{row.name}</Text>
                    ))}
                   
                    
                    <Subtitle style={{color:'black', marginLeft:6}}>‎₦ {cart[i].price * cart[i].qty}</Subtitle>
                  </View>
                </Left>

                <Right>
                <Grid>
                  
                  <TouchableOpacity onPress={()=>this.updateQuantity(1,cart[i])}>
                    <Title style={{color:'black', marginRight:20, fontSize:40}}>+</Title>
                  </TouchableOpacity>
                    <Title style={{color:'#ffb200',fontSize:12,marginTop:10,marginRight:5}}>{cart[i].qty}</Title>
                    <TouchableOpacity onPress={()=>this.updateQuantity(0,cart[i])}>
                      <Title style={{color:'black', marginLeft:10, fontSize:50}}>-</Title>
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


              <Card style={{alignItems:'center'}}>
                <CardItem header>

                    <Left>

                      <View>
                        <Title style={{color:'black'}}>Sub Total:</Title>
                      </View>
                    
                    </Left>

                     <Right>

                      <View>
                        <Title style={{color:'black'}}>‎₦ {totalAmount}</Title>
                      </View>
                    
                    </Right>


                </CardItem>   
              </Card>

              <View>
                <Button full warning onPress={()=>this.checkoutHandler(totalAmount)}><Title>Checkout</Title></Button>
               </View>
              
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
      cart:state.cart,
      user:state.user
  }
}


const mapActionstoProps = (dispatch) => {
  return bindActionCreators({
      removeFromCartAction,
      addToCartAction,
      saveCartSummaryAction,
  },dispatch)
}

export default connect(mapStateToProp,mapActionstoProps)(Cart);
