import React, { Component } from 'react';
import RootNavigator from './Navigation/RootNavigator';
import './i18n';
import { createStore , applyMiddleware  } from 'redux' ;
import { Provider } from 'react-redux' ;
import Reducers from './Reducers';
import ReduxThunk from  'redux-thunk';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class App extends Component {
  
  render() {
    return (
      <>
        <Provider store={createStore(Reducers , {}  , applyMiddleware(ReduxThunk))}>
        <RootNavigator /> 
        <StatusBar backgroundColor={'white'} barStyle="dark-content" />
        </Provider>

      </>
    );
  }
}