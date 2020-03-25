import React,{Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Thumbnail
} from 'native-base';
import {apiUrl,token,vendorImage} from '../Config';

export default class List extends Component {
    constructor() {
        super()
        this.state = {

            dataSource:[],
            isLoading:true,
        }
    }

    componentDidMount()
    {
    
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = apiUrl+'category/'+this.props.navigation.getParam('idcategories'); 
        fetch(proxyurl+url,{headers: {'Content-Type': 'application/json','token':token}})
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

                dataSource: contents.vendors,
                isLoading:false

            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    renderItem = ({item,index}) =>{
        let {container,cardText,card,cardImage} =styles
        return(

            <Card>
                <CardItem>
                    <TouchableOpacity style={card} onPress={() => this.props.navigation.navigate('Details',item)}>
                        <Image
                            source ={{uri:vendorImage+item.logo}}
                            style={{width:'100%',height:200}}
                        />  
                        <Title style={{color:'black'}}> {item.store_name} </Title>

                        <Left>
                            <Subtitle style={{color:'black'}}>Opens at {item.open_at}</Subtitle>
                        </Left>

                        <Right>
                            <Subtitle style={{color:'black'}}>Closes at{item.close_at}</Subtitle>
                        </Right>     
                    </TouchableOpacity>
                </CardItem>
            </Card>

            // <View style={container}>
            //     <TouchableOpacity style={card} onPress={() => this.props.navigation.navigate('Details',item)}>
            //         <Image style={cardImage} source ={{uri:vendorImage+item.logo}}/>
            //         <Text style={cardText}>{item.store_name}</Text>

            //         <View style={{flex:1,flexDirection:'row'}}>
            //             <Text style={{marginTop:15}}>Opens at {item.open_at}</Text>
            //             <View style={{flex:1}}>
            //                 <Text style={{textAlign: 'right', marginTop:15}}>Closes at{item.close_at}</Text>
            //             </View>
                        
            //         </View>
            //     </TouchableOpacity>                
            // </View>
        )
    }

    FlatListItemSeparator = () => {
        return (
        <View
            style={{
            height: 1,
            width: "100%",
            backgroundColor: "#ffb200",
            }}
        />
        );
    }


    render(){
        
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
                                <Title style={{color:'black'}}>Our Vendors</Title>
                            <Icon name="heart" style={{color:'#ffb200'}} />
                        </CardItem>
                        
                    </Card>

                    <FlatList

                        style={styles.container}
                        data={this.state.dataSource}
                        keyExtractor={(item,index) =>index.toString()}
                        renderItem={this.renderItem}
                        
                    />

                </Content>
            </Container>


           
            
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:40
    },
    cardText:{

        marginLeft:5,
        marginTop:10,
        fontSize:17
    },
    card:{
        backgroundColor:'#fff',
        marginBottom:10,
        marginLeft:'2%',
        width:'96%',
        height:300,
        shadowColor:'#ffb200',
        shadowOpacity:1,
        shadowOffset:{
            width:2,
            height:2
        }
    },
    cardImage:{
        width:'100%',
        height:200,
        resizeMode:'cover'
    },
    

})
