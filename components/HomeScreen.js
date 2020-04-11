import React,{Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
   } from 'react-native';

class HomeScreen extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
            userdetails:[]
        }
  
       
    }
    
    
    pressHandler =  () =>{
        this.props.navigation.navigate('Category')
    }

  
    render(){

        return (  
            <View style={styles.container}>

                <Text>FoodXyme</Text>
                <Button title="Get Started" onPress={this.pressHandler}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});





export default HomeScreen;
