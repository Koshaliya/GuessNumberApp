import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Colors from '../constants/Colors'
import TitleText from '../components/TitleText'


const Header = props => {
    return(
    <View style={styles.header}>
        <TitleText >{props.title}</TitleText>
    </View>
    )
}

const styles = StyleSheet.create({
  header:{
      width:'100%',
      backgroundColor:Colors.primary,
      height:90,
      paddingTop:36,
      alignItems:'center',
      justifyContent:'center'
  },
//   headerTitle:{
//       color:'black',
//       fontSize:18,
//       fontFamily: 'open-sans-bold'
//   }
});


export default Header