import React from 'react'
import {Text,View,StyleSheet,Button} from 'react-native'
import Color from '../constants/Colors'

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <Text >The Game is Over!!!</Text>
            <Text>The number of rounds: {props.roundNumber}</Text>
            <Text>The number entered and guessed was same as: {props.guessNumber}</Text>
            <Button title='NEW GAME' onPress={props.resetFunc}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
})

export default GameOverScreen