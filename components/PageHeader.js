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


class PageHeader extends Component{
    
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
            
                <Container style={{backgroundColor:'#efefef'}}>
                    <Header style={{backgroundColor:'#ffb200'}}><Title>FoodXyme</Title></Header>
                    <Content>
                        <Card style={{alignItems:'center'}}>
                            <CardItem header>
                                <Icon name="map" style={{color:'#ffb200'}}/>
                                    <Title>Your opps</Title>
                                <Icon name="heart" style={{color:'#ffb200'}}/>
                            </CardItem>
                            
                        </Card>
                    </Content>
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


export default PageHeader;
