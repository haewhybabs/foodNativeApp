import React,{Component} from 'react';
import 
{ 
    StyleSheet,
    View,
    TouchableOpacity,
    AsyncStorage,
    Keyboard,
    ActivityIndicator,
}
from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import
{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,Text,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail
} 
from 'native-base';

import {apiUrl,token} from '../Config';
   

class Checkout extends Component{
    
    constructor(){
        super()

        this.state = {
            activeAddress:[],
            userAddress:[],
            service_charge:'',
            delivery_fee:'',
            totalAmount:'',
            isLoading:true,
        }
  
       
    }

    componentDidMount()
    {
        
        const user = this.props.user;
        const cartSummary = this.props.cartSummary;
        
    
        fetch(apiUrl+'checkout',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':token,
                'Authorization':'Bearer '+user.token
            },
            body: JSON.stringify({

                vendor_id:cartSummary.vendor_id,
                cartAmount:cartSummary.cart_amount
            })
            
        })
        .then(response => {
            
            if (!response.ok) {                      
                throw new Error(                    
                    "HTTP status " + response.status 
                );                                   
            }              
                            
            return response.json();      
        })
        .then((contents)=>{

            this.setState({

                activeAddress:contents.activeAddress,
                userAddress:contents.userAddress,
                service_charge:contents.service_charge,
                delivery_fee:contents.delivery_fee,
                totalAmount:contents.totalAmount,
                isLoading:false
            });
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    
    
    
    pressHandler =  () =>{
        this.props.navigation.navigate('Category')
    }

    changeAddress = () =>{

    }

  
    render(){

        
        const state=this.state;
        const address = [];
        
        address.push(

            state.activeAddress.active?

                <Card>
                    <CardItem>
                        <Left>
                            <View style={{alignItems:'flex-start', top:-5}}>
                                <Subtitle style={{color:'black',fontSize:20}}>{state.activeAddress.name}</Subtitle>
                                <Subtitle style={{color:'black',fontSize:15}}>{state.activeAddress.complete_address}</Subtitle>
                                {
                                    state.activeAddress.delivery_instruction ?
                                    <Subtitle style={{color:'black',fontSize:15}}>{state.activeAddress.delivery_instruction}</Subtitle>
                                    :
                                    null
                                }
                                
                            </View>
                        
                        </Left>

                        <Right>
                        <Button bordered warning onPress={this.changeAddress}><Text>Change Address</Text></Button>
                        </Right>
                    </CardItem>
                </Card>
            :

                <Card style={{alignItems:'center'}}>
                    <CardItem header>
                        
                        <Button bordered warning><Text>Add New Address</Text></Button>
                        
                    </CardItem>  
                </Card>
        )
        return ( 
            state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#ffb200" animating  />
            </View>
            : 
            <Container>
                <Content>
                    <Card style={{alignItems:'center'}}>
                        <CardItem header>
                            <Icon name="map" style={{color:'#ffb200'}}/>
                                <Title style={{color:'black'}}>{this.props.cartSummary.vendor}</Title>
                            <Icon name="heart" style={{color:'#ffb200'}} />
                        </CardItem>  
                    </Card>

                    {address}

                    <Card>
                        <CardItem>
                            <Body>
                                <Grid>
                                    <Col>
                                        <Subtitle style={{color:'black'}}>Sub Total:</Subtitle>
                                    </Col>
                                    <Col>
                                        <Subtitle style={{color:'black'}}>‎₦ {this.props.cartSummary.cart_amount}</Subtitle>
                                    </Col>
                                </Grid>

                                <Grid>
                                    <Col>
                                        <Subtitle style={{color:'black'}}>Delivery Fee:</Subtitle>
                                    </Col>
                                    <Col>
                                        <Subtitle style={{color:'black'}}>‎₦ {state.delivery_fee}</Subtitle>
                                    </Col>
                                </Grid>

                                {state.service_charge==0 ?
                                    null
                                    :
                                    
                                    <Grid>
                                        <Col>
                                            <Subtitle style={{color:'black'}}>Service Charge:</Subtitle>
                                        </Col>
                                        <Col>
                                            <Subtitle style={{color:'black'}}>‎₦ {state.service_charge}</Subtitle>
                                        </Col>
                                    </Grid>

                                
                                }


                                <Grid>
                                    <Col>
                                        <Title style={{color:'black'}}>Total:</Title>
                                    </Col>
                                    <Col>
                                        <Title style={{color:'black'}}>‎₦ {state.totalAmount}</Title>
                                    </Col>
                                </Grid>
                            </Body>
                            
                        </CardItem>
                    </Card>
                    
                    <View style={{marginTop:20}}>
                        <Button bordered full warning><Text>Pay ‎₦{state.totalAmount}</Text></Button>
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
      user:state.user,
      cartSummary:state.cartSummary
  }
}



export default connect(mapStateToProp)(Checkout);
