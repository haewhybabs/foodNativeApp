import React,{Component} from 'react';
import { 
  StyleSheet,
  View,
  TouchableOpacity,
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,Text,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row
} from 'native-base';


class Register extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
          
        }
  
       
    }


    loginHandler = () =>{
            
        this.props.navigation.navigate('Login');
    }

    
    
    
    
  
    render(){

        return ( 
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry/>
                        </Item>

                        <Item floatingLabel last>
                            <Label>Password Confirmation</Label>
                            <Input secureTextEntry/>
                        </Item>

                        <Item floatingLabel>
                            <Label>Address</Label>
                            <Input/>
                        </Item>

                        <Item floatingLabel>
                            <Label>Phone Number</Label>
                            <Input/>
                        </Item>
                        

                        <View style={{marginTop:50}}>
                            <Button warning full><Title>Register</Title></Button>
                        </View>
                        <View>
                            <Row>
                                <Text style={{marginLeft:10, marginTop:10}}>Already an account?</Text>
                                <TouchableOpacity onPress={this.loginHandler}>
                                    <Text style={{marginLeft:10, marginTop:10,color:'red'}}>Login here</Text>
                                </TouchableOpacity>
                            </Row>
                        </View>
                    </Form>
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


export default Register;
