import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import StartScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'
//import AppLoading from 'expo-app-loading'
//import Font from 'expo-font'


// fetchFonts = () => {
//   return Font.loadAsync({
//     'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
//   })
// }

export default function App() {

  const [userNumber,setUserNumber] = useState();
  const [guessRound,setGuessRound] = useState(0)
  const [dataLoaded,setDataLoaded] = useState(false)

  // if(!dataLoaded){
  //   return (
  //   <AppLoading 
  //   startAsync={fetchFonts} 
  //   onFinish={()=>setDataLoaded(true)}
  //   onError={(error) => console.log(error)}
  //   />
  //   )
  // }

  const resetGameHandler = () =>{
    setGuessRound(0)
    setUserNumber(null)
  }

  const startGameHandler = (selectedNumber) =>{
    setUserNumber(selectedNumber);
    setGuessRound(0)
  }

  const gameOverHandler = (numofRound) => {
    setGuessRound(numofRound);
  }

  let content = <StartScreen onStartGame={startGameHandler}/>

  if(userNumber && guessRound <=0){
    content=<GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  }
  else if(guessRound > 0){
    content=<GameOverScreen roundNumber={guessRound} guessNumber={userNumber} resetFunc={resetGameHandler}/>
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess a number'/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1,

  }
});
