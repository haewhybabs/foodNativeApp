import React,{Component} from 'react';
import { 
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  TextInput
   } from 'react-native';

import {apiUrl,token} from '../Config';

import{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,Text,
    Col,Button,Icon, Subtitle,Thumbnail
} from 'native-base';
import {bindActionCreators} from 'redux';
import {addToCartAction} from '../redux/cart_action';
import {connect} from 'react-redux';

class Details extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
            vendor:[]
          
        }
  
       
    }



    componentDidMount(){
    
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url =apiUrl+'vendor/'+this.props.navigation.getParam('idvendors'); // site that doesn’t send Access-Control-*
        fetch(proxyurl+url,{headers: {'Content-Type': 'application/json','token':token}}) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => {
            if (!response.ok) {                      // *** Check errors
                throw new Error(                     // ***
                    "HTTP status " + response.status // ***
                );                                   // ***
            }                                        // ***
            return response.json();      
        })
        .then((contents)=>{
            
            this.setState({

                dataSource: contents.stock_list,
                vendor:contents.vendor,
                isLoading:false,

            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    addToCart = (item) =>{    

        this.props.addToCartAction({
            id:item.idstockdetails,
            name:item.name,
            price:item.stockprice,
            qty:1,
            details:[]
        });
    }
    
    
  
    render(){
        console.log(this.addToCart);
        const item=this.state.vendor;
        
        const category = [];
        const stock = this.state.dataSource;
        const stocklist=[];

        const addToCartSetup=(item)=>{
            this.addToCart(item);
        }

        if(stock.length>0){
            
            for(let i = 0; i< stock.length; i++){


                Object.keys(stock[i]).map(function(key,index) {
                    
                    category.push(

                        <View key={key}>
                            <Title style={{color:'black', fontSize:15,}}>{key}</Title>  
                            {stock[i][key].map((row, index) => (
                                
                               
                                <TouchableOpacity key={row.idstockdetails}  onPress={()=>addToCartSetup(row)}>
                                
                                    <Card>
                                        <CardItem style={{height:40}}>
                                            <Left>
                                            
                                                <Thumbnail
                                                    source={require('../assets/img/shopping-icon.svg')}
                                                    style={{width:40,height:30}}
                                                />  

                                                <View style={{alignItems:'flex-start', top:-5}}>
                                                    <Subtitle style={{color:'black', marginLeft:6}}>{row.name}</Subtitle>
                                                </View>
                                            
                                            </Left>
                
                                            <Right>
                                                <Subtitle style={{color:'black', marginLeft:6}}>‎₦ {row.stockprice}</Subtitle>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                            ))}
                        </View>       
                    )
                });

        
            }
        }
        
        
        
        
        return ( 
            

            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#ffb200" animating  />
            </View>
            :
            
                <Container style={{backgroundColor:'#efefef'}}>   
                    <Content>
                        <Card style={{alignItems:'center'}}>
                            <CardItem header>
                                <Icon name="map" style={{color:'#ffb200'}}/>
                                    <Title style={{color:'black'}}>{item[0].store_name}</Title>
                                <Icon name="heart" style={{color:'#ffb200'}} />
                            </CardItem>
                            
                        </Card>

                        {category}

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
        addToCartAction
    },dispatch)
}

export default connect(mapStateToProp,mapActionstoProps)(Details);
