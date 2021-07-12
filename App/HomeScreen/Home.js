import React, { useEffect, useState } from 'react'
import {
  View, AppState,
} from 'react-native'
import { withNavigation } from "react-navigation";
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from './SplashScreen';
import OnBoard from './OnBoard';


function Home({ navigation }) {

  const params = navigation.state.params || {};
  const logout_ = params.logout_ ? params.logout_ : false

  const [splash, isSplash] = useState(true)
  const [start, isStart] = useState(true)
  const [token, istoken] = useState(false)

  const [appState, setAppState] = useState(AppState.currentState);


  useEffect(() => {
    Orientation.lockToPortrait()

    console.disableYellowBox = true;
    AsyncStorage.getItem('start').then(val => {
      if (val != 'disabled') {
        setTimeout(function () {
          isSplash(false)
        }, 3000);
      }
    })

    if (appState == 'active') {
      console.log(appState);
    }
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };

  }, [appState]);



  const handleAppStateChange = (state) => {
    console.log(state);

  }

  AsyncStorage.getItem('start').then(val => {
    if (val == 'disabled') {
      isStart(false)

    }
    else {
      isStart(true)
    }
  })


  AsyncStorage.getItem('app_Token').then(val => {
    if (val != null) {
      istoken(true)
      navigation.replace('SearchScreen')
      return true
    }
    else {
      istoken(false)
      return false
    }
  })


  return (
    <>
      <View>
        {

          splash && !token && !logout_ && navigation.getParam('noSplash') != 'noSplash' ?
            <SplashScreen />
            :
            start && !token ?

              <OnBoard />
              :
              null
        }
      </View>
    </>
  );

}
export default withNavigation(Home);