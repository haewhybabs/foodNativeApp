import { createStackNavigator } from 'react-navigation-stack';

import React,{Component} from 'react';
import {Text,TouchableOpacity} from 'react-native';
import{Title} from 'native-base';
import { createAppContainer } from 'react-navigation';
import Splash from '../components/Splash';
import Category from '../components/Category';
import Vendors from '../components/List';
import Details from '../components/Details';
import Cart from '../components/Cart';


const screens = {

    Splash: {
        screen: Splash,
        navigationOptions: () => ({
            title: 'FoodXyme',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#ffb200'
            }
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
                    <Text>Checkout</Text>
                </TouchableOpacity>
            )
            
            
        }),

    },
    Cart: {
        screen: Cart
    },
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);