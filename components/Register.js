import React,{Component} from 'react';
import { 
  StyleSheet,
  View,
  TouchableOpacity,
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,Text,
    Col,Button,Icon, Subtitle
} from 'native-base';


class Register extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
          
        }
  
       
    }

    
    
    
    
  
    render(){

        return ( 
            <View>
            
                <Container>
                   
                </Container>
            
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});


export default Register;
