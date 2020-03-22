import React,{Component} from 'react';

import { createStackNavigator } from 'react-navigation-stack';


import {Text,TouchableOpacity} from 'react-native';
import{Title} from 'native-base';
import { createAppContainer } from 'react-navigation';

import Category from './Category';
import Vendors from './List';
import Details from './Details';
import CartIcon from './CartIcon';
import Cart from './Cart';
import HomeScreen from './HomeScreen';

class Splash extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true
        }
  
       
    }
  
    render(){

        return (  
            <Navigator/>
        );
    }
}






export default Splash;

const screens = {

    Splash: {
        screen: HomeScreen,
        navigationOptions: () => ({
            title: 'FoodXyme',
            headerBackTitle: null,
            // headerStyle: {
            //     backgroundColor: '#ffb200'
            // }
        }),
    },
    Category: {
        screen: Category
    },
    Vendors: {
        screen: Vendors
    },
    Details: {
        screen: Details,
        navigationOptions:({navigation}) => ({
            
            headerBackTitle: null,
            headerRight: (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}>

                    <CartIcon/>
                </TouchableOpacity>
               
            )
            
            
        }),

    },
    Cart: {
        screen: Cart
    },
}
const HomeStack =createStackNavigator(screens);

const Navigator=createAppContainer(HomeStack);
