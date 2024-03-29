import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Colors from '../constants/Colors'


const MainButton = props => {
    return <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button} >
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
        </TouchableOpacity>
    
}

const styles = StyleSheet.create({
  button:{
    backgroundColor:Colors.primary,
    padding:20,
    borderRadius:30,
    //width:120
  },
  buttonText:{
    color:'white',
    fontFamily:'open-sans',
    fontSize:15,
    textAlign:'center'
  },

});


export default MainButton