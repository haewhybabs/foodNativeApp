import React,{Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity
   } from 'react-native';
import Splash from './components/Splash';
import PageHeader from './components/PageHeader';
import Navigator from './routes/HomeStack';
import { AppLoading } from "expo";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { NavigationContainer } from 'react-navigation';
import reducers from './reducers';

export default class App extends Component {
  constructor() {
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
      <Provider store={store}>
        <Splash/>
      </Provider>
    );
  }
}

const store = createStore(reducers);



