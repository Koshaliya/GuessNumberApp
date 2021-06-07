import React from 'react'
import {Text,View,StyleSheet,Button,Image, Dimensions, ScrollView} from 'react-native'
import Color from '../constants/Colors'
import BodyText from '../components/BodyText' 
import TitleText from '../components/TitleText' 
import Colors from '../constants/Colors'
import MainButton from '../components/MainButton'


const GameOverScreen = props => {
    return(
        <ScrollView>
        <View style={styles.screen}>
            <TitleText >The Game is Over!!!</TitleText>
            <View style={styles.imageContainer}>
            <Image 
            source={require('../assets/success.png')} 
            //source={{uri:'https://miro.medium.com/max/10368/0*A1rWDvguoY1j8w5I.'}}
            style={styles.image}/>
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.bodyText}>Your phone needed <Text style={styles.highlight}>{props.roundNumber}</Text> rounds to guess the number {' '}
            <Text style={styles.highlight}>{props.guessNumber}</Text>
            </BodyText>
            </View>
            <MainButton onPress={props.resetFunc}>NEW GAME</MainButton>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    imageContainer:{
        width:Dimensions.get('window').width * 0.7,
        height:Dimensions.get('window').width * 0.7,
        overflow:'hidden',
        borderRadius:Dimensions.get('window').width * 0.7 / 2,
        marginVertical:Dimensions.get('window').height / 30
    },
    image:{
        width:'100%',
        height:'100%'
    },
    resultContainer:{
        marginHorizontal:30,
        marginVertical:Dimensions.get('window').height / 60
    },
    highlight:{
        color:Colors.primary,
        fontFamily:'open-sans-bold'
    },
    bodyText:{
        textAlign:'center',
        fontSize:Dimensions.get('window').height < 400 ? 15 : 18
    }
    
})

export default GameOverScreen

//local image width and height no need
//web image need

//text pass styles to -> nested text 

//margin horizontal ||

//Nativebase.io - pre built component 

//rap scrollview with view for width , android- to scroll flex:1
//containContainerStyle - scrollview : small list, flatlist: biglist
//flexGrow

