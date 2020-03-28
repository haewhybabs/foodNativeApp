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

import {apiUrl,token} from '../Config';

export default class Category extends Component{
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true
        }

        
    }


    componentDidMount(){
    
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url =apiUrl+'categories'; // site that doesn’t send Access-Control-*
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

                dataSource: contents.categories,
                isLoading:false

            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    renderItem = ({item,index}) =>{
      
        return(
        <TouchableOpacity style={{flex:1, flexDirection:'row',marginBottom:4,}} onPress={() => this.props.navigation.navigate('Vendors',item)}>
            <Image style={{width:80, height:80, margin:5}} source ={{uri:item.icon}}/>
            <View style={{flex:1, justifyContent:'center', marginLeft:5}}>
                <Text style={{fontSize:18, marginBottom:15}}>{item.name}</Text>
            </View>
        </TouchableOpacity>
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
        <View style={styles.container}>

            <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item,index)=>index.toString()}
            ItemSeparatorComponent = { this.FlatListItemSeparator }
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});



