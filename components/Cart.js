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
import { FlatList } from 'react-native-gesture-handler';

class Cart extends Component{
    
    constructor(){
        super()
       
    }

    
    checkoutHandler(){

    }
    
   
    renderItem = ({item,index}) =>{
      
      return(
        <Card>
          <CardItem>
            <Left>
              <Thumbnail
                source={require('../assets/img/shopping-icon.svg')}
                style={{width:40,height:30}}
              />  
              <View style={{alignItems:'flex-start', top:-5}}>
                <Subtitle style={{color:'black', marginLeft:6}}>{item.name}</Subtitle>
                <Text style={{marginLeft:10}}>Sub Title</Text>
                
                <Subtitle style={{color:'black', marginLeft:6}}>‎₦ {item.price}</Subtitle>
              </View>
            </Left>

            <Right>
              <Subtitle style={{color:'black', marginLeft:6}}>{item.qty}</Subtitle>
              <TouchableOpacity>
                <Subtitle style={{color:'red'}}>Remove</Subtitle>
              </TouchableOpacity>
            </Right>
          </CardItem>
        </Card>
      )
  }

  
    render(){
   
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
              
              
             
              <FlatList
              data={this.props.cart}
              keyExtractor={(item,index)=>index.toString()}
              renderItem={this.renderItem}
              />
              

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
