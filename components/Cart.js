import React,{Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
   } from 'react-native';

class Cart extends Component{
    
    constructor(){
        super()
       
    }

    
    
    
   

  
    render(){

        return (  
            <View style={styles.container}>

                <Text>Shopping Cart</Text>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});


export default Cart;
