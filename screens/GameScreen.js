import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'
import {Ionicons} from '@expo/vector-icons'
import BodyText from '../components/BodyText';


const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = props => {

  const initialGuess = generateRandomBetween(1, 100, props.userChoice)

  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setpastGuesses] = useState([initialGuess.toString()]);
  const [availableWidth,setAvailableWidth] =useState(Dimensions.get('window').width)
  const [availableHeight,setAvailableHeight] =useState(Dimensions.get('window').height)

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess+1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRounds(rounds + 1);
    setpastGuesses(curPastGues => [nextNumber.toString(),...curPastGues])
  };
  const renderList = (listLength,itemData) =><View style={styles.listItem}>
    <BodyText>#{listLength-itemData.index}</BodyText>
  <BodyText >{itemData.item}</BodyText>
  </View>

  let listContainerStyle = styles.listContainer

  if(availableWidth <350){
    listContainerStyle = listContainerBig
  }

useEffect(() => {
  const updateLayout = () => {
    setAvailableHeight(Dimensions.get('window').height)
    setAvailableWidth(Dimensions.get('window').width)
  } 

  Dimensions.addEventListener('change',updateLayout)
  return() => {//clean up func
    Dimensions.removeEventListener('change',updateLayout)

  }
})

if(availableHeight < 500){
  return(
    <View style={styles.screen}>
    <Text style={DefaultStyles.title}>Opponent's Guess</Text>
    <View style={styles.controls}>
    <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
      <Ionicons name='md-remove' size={24} color='white'/>
      </MainButton>
    <NumberContainer>{currentGuess}</NumberContainer>
      
      <MainButton
        onPress={nextGuessHandler.bind(this, 'greater')}>
      <Ionicons name='md-add' size={24} color='white'/>
      </MainButton>
      </View>
    <View style={styles.listContainer}>
    {/* <ScrollView contentContainerStyle={styles.list}>
      {pastGuesses.map((guess,index) => renderList(guess,pastGuesses.length-index)  )}
    </ScrollView> */}
    <FlatList 
    keyExtractor={(item) => item} 
    data={pastGuesses} 
    renderItem={renderList.bind(this,pastGuesses.length)}
    contentContainerStyle={styles.list}
    />
    </View>
  </View>
  )
}

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
        <Ionicons name='md-remove' size={24} color='white'/>
        </MainButton>
        <MainButton
          onPress={nextGuessHandler.bind(this, 'greater')}>
        <Ionicons name='md-add' size={24} color='white'/>
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
      {/* <ScrollView contentContainerStyle={styles.list}>
        {pastGuesses.map((guess,index) => renderList(guess,pastGuesses.length-index)  )}
      </ScrollView> */}
      <FlatList 
      keyExtractor={(item) => item} 
      data={pastGuesses} 
      renderItem={renderList.bind(this,pastGuesses.length)}
      contentContainerStyle={styles.list}
      />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //marginTop: 20,
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  listContainer:{
    flex:1,
    //width:'60%'
    width:'60%'
  },
  listContainerBig:{
    flex:1,
    //width:'60%'
    width:'80%'
  },
  list:{
    flexGrow:1,
    justifyContent:'flex-end'
  },
  listItem:{
    borderColor:'#ccc',
    borderWidth:1,
    padding:15,
    marginVertical:10,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-around',
    width:'100%'
  },
 controls:{
   flexDirection:'row',
   justifyContent:'space-around',
   width:'80%',
   alignItems:'center'
 }
});

export default GameScreen;
