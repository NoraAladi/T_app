import styles from './style';
import React, { Component, useEffect, useState } from 'react'
import {
  Text, View, ScrollView, Image,
  TouchableOpacity, Platform, AppState, ImageBackground, I18nManager
} from 'react-native'
import { withNavigation } from "react-navigation";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from './SplashScreen';
import OnBoard from './OnBoard';


function Home({ navigation }) {

  const [splash, isSplash] = useState(true)
  const [start, isStart] = useState(true)
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

  return (
    <>
      <View>
        {
          splash ?
            <SplashScreen />
            :
            start ?
              <OnBoard />
              :
              null
        }
      </View>
    </>
  );

}
export default withNavigation(Home);
