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
import Category from './components/Category';
import PageHeader from './components/PageHeader';
import Navigator from './routes/HomeStack';
import { AppLoading } from "expo";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

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
      
      <Navigator/>
    );
  }
}



