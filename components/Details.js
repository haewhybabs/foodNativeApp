import React,{Component} from 'react';
import { 
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
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
import {materialIcons, MaterialIcons} from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';

class Details extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
            vendor:[],
            modalOpen:false,
            soupCategory:[],
            mainMealCategory:[],
            supplements:[],
            checkedSupplements:[],
            currentItem:[],

          
        }
  
       
    }



    componentDidMount(){
    
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url =apiUrl+'vendor/'+this.props.navigation.getParam('idvendors'); // site that doesn’t send Access-Control-*
        fetch(url,{headers: {'Content-Type': 'application/json','token':token}}) // https://cors-anywhere.herokuapp.com/https://example.com
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
                soupCategory:contents.soupCategory,
                mainMealCategory:contents.mainMealCategory,
                supplements:contents.supplements
                

            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    addToCart = async(item,modalStatus) =>{    

    
        
        this._storeData();

        let Vendor = await AsyncStorage.getItem('cartVendor');
        let vendorCart = JSON.parse(Vendor);

        if(modalStatus==false){

            if(vendorCart.id == this.state.vendor[0].idvendors){
                this.props.addToCartAction({
                    id:item.idstockdetails,
                    name:item.name,
                    price:item.stockprice,
                    qty:1,
                    details:[]
                });
            }

            else{

                alert('Kindly checkout with '+ vendorCart.name + ' before you add a new item');
            }

            
        }    
    }

    _retrieveData = async()=> {

        let Vendor = await AsyncStorage.getItem('cartVendor');
        let vendorCart = JSON.parse(Vendor);
        return vendorCart;
    };

    _storeData()
    {
        let cartVendor = {
            name:this.state.vendor[0].store_name,
            id:this.state.vendor[0].idvendors
        };

        if(this.props.cart.length==0){

            AsyncStorage.setItem('cartVendor',
            JSON.stringify(cartVendor));

            return cartVendor;
        }
    }


  
    render(){
        
        const state=this.state;
        const item=state.vendor;
        
        
        const category = [];
        const stock = state.dataSource;
        const stocklist=[];

        /* Add to cart and Open Modal */
        const addToCartSetup=(item,status)=>{
             
            

            this.addToCart(item,status);



            if(status==true){

                this.setState({
                    modalOpen:status,
                    currentItem:item
                })
            }
        }
        
        /*Clse Modal */
        const modalCheck = (modalStatus)=>{
            
            this.setState({
                modalOpen:modalStatus
            })
            this.setState({
                checkedSupplements:[]
            })
        }
        
        /*Checkbox select and update cart */
        const supplementSelect = (item)=>{

            const id = item.idstockdetails;

            /**Check if the id is already in checked supplements */
            if(state.checkedSupplements.some(itemId=>id===itemId)){
                this.setState((state) => ({
                    checkedSupplements: state.checkedSupplements.filter(el => el!= id)
                }))
            }
            else{
                this.setState((state) => ({
                    checkedSupplements: [...state.checkedSupplements, item.idstockdetails]
                }))
            
            }

         
        }

        const supplementSubmit = async()=>{

            const currentItem = state.currentItem;
            const supplements = state.supplements;
            const checkedSupplementId = state.checkedSupplements;
            const checkedSupplements=[];

            var amount=0;

            if(checkedSupplementId.length>0){

                for (let i =0; i<supplements.length; i++){
                    for (let j =0; j<checkedSupplementId.length; j++){
                        if(supplements[i].idstockdetails==checkedSupplementId[j]){
                            checkedSupplements.push(supplements[i]);
                        }
                    }
                }
                
                

                for (let k=0; k<checkedSupplements.length; k++){
                    amount = amount+checkedSupplements[k].stockprice;
                }
            }

            const item = {

                id:currentItem.idstockdetails,
                name:currentItem.name,
                price:currentItem.stockprice + amount,
                qty:1,
                details:checkedSupplements
            }


            this._storeData();

            let Vendor = await AsyncStorage.getItem('cartVendor');
            let vendorCart = JSON.parse(Vendor);

           if(vendorCart.id == this.state.vendor[0].idvendors){
                this.props.addToCartAction(item);
            }

            else{

                alert('Kindly checkout with '+ vendorCart.name + ' before you add a new item');
            }

            this.setState({
                modalOpen:false,
                currentItem:[],
                checkedSupplements:[]


            })
            
        }

        

       

        if(stock.length>0){
            
            for(let i = 0; i< stock.length; i++){


                Object.keys(stock[i]).map(function(key,index) {
                    
                    category.push(

                        <View key={key}>
                            <Title style={{color:'black', fontSize:15,}}>{key}</Title>  
                            {stock[i][key].map((row, index) => (

                                state.soupCategory.name==key || state.mainMealCategory.name==key?

                                <TouchableOpacity key={row.idstockdetails}  onPress={()=>addToCartSetup(row,true)}>
                                   
                                        
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
                                    
                               
                                :
                                    <TouchableOpacity key={row.idstockdetails}  onPress={()=>addToCartSetup(row,false)}>
                                        
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


                <Modal visible={state.modalOpen}>
                    <View>                                            
                        <MaterialIcons
                            name='close'
                            size={24}
                            style={styles.modalToggle}
                            onPress={()=>modalCheck(false)}
                        />
                        <Title style={{color:'black', marginTop:10}}>Select the supplement for this meal</Title>
                        {state.supplements.map((item, index) => (
                            <Grid style={{marginTop:30}} key={item.idstockdetails}>
                                <Col>
                                    <CheckBox onPress={()=>supplementSelect(item)} checked={state.checkedSupplements.includes(item.idstockdetails)} />
                                </Col>
                                <Col>
                                    <Subtitle style={{color:'black'}}>{item.name}</Subtitle>
                                </Col>

                                <Col>
                                    <Subtitle style={{color:'black'}}>‎₦ {item.stockprice}</Subtitle>
                                </Col>  
                            </Grid>

                            
                        ))}

                        <View style={{marginTop:50}}>

                            <Button warning full onPress={()=>supplementSubmit()}>
                                <Text>Submit</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
                
                
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
  modalToggle:{
      marginBottom:0,
      borderWidth:1,
      borderColor:'#ffb200',
      padding:10,
      borderRadius:10,
      alignSelf:'center',
      marginTop:20,
  }
});

const mapStateToProp = (state) =>{

    return {
        cart:state.cart,
        user:state.user
    }
}

const mapActionstoProps = (dispatch) => {
    return bindActionCreators({
        addToCartAction
    },dispatch)
}

export default connect(mapStateToProp,mapActionstoProps)(Details);
