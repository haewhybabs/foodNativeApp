import React,{Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
   } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
class CartIcon extends Component{
    
    constructor(){
        super()
       
    }



  
    render(){
        
        return (  
            <View style={{padding:5}}>
              <View style={{position:'absolute', height:30,width:30,borderRadius:15,
                backgroundColor:'#ffb200',right:15,bottom:15,alignItems:'center',
                justifyContent:'center',zIndex:2000
            }}>
                <Text style={{color:'white', fontWeight:'bold'}}>{this.props.cart.length}</Text>
              </View>

                <Icon name="ios-cart" size={30} />
                
            </View>
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
export default connect(mapStateToProp)(CartIcon);
