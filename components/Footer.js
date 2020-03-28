import React,{Component} from 'react';
import { 
  StyleSheet, 
  View
  
   } from 'react-native';
import {Container, Header, Content
, Footer, FooterTab,Button, Subtitle} from 'native-base';
import * as Font from 'expo-font';

class FooterBase extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
            loading:true,
        }
  
       
    }

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }


  
    render(){

        return (  
           
                <Footer>
                    <FooterTab>
                        <Button full warning>
                            <Subtitle>FoodXyme</Subtitle>
                        </Button>
                    </FooterTab>
                </Footer>
            
        );
    }
}







export default FooterBase;
