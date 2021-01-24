
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '../Packages/react-navigation-stack';
import { createDrawerNavigator } from '../Packages/react-navigation-drawer';

import HomeScreen from '../HomeScreen/index';
import VerificationScreen from '../Screens/LoginScreen/verify';
import LoginScreen from '../Screens/LoginScreen/index';
import ForgetScreen from '../Screens/LoginScreen/Forget';
import EnterpassScreen from '../Screens/LoginScreen/Enterpass';
import PatientCodeScreen from '../Screens/LoginScreen/PatientCode';
import SignUpScreen from '../Screens/SignupScreen/SignUp';
import ThankUScreen from '../Screens/SignupScreen/ThankU';

import DealScreen from '../Screens/DealsScreen/index';
import DealsModelScreen from '../Screens/DealsScreen/Model';

import VisitsScreen from '../Screens/VisitsScreen/Visits';


import Test from '../Screens/test/Test';

import SearchScreen from '../Screens/SearchScreen/Search';
import SearchListScreen from '../Screens/SearchScreen/SearchList';



import SideBar from './SideBar';

import { Dimensions, I18nManager } from 'react-native';
const { height, width } = Dimensions.get("window");

const Navigator = createStackNavigator({

 /* Test:
  {
    screen: Test,
 ,*/
  



  HomeScreen:
  {
    screen: HomeScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },

  SearchScreen:
  {
    screen: SearchScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },

 SearchListScreen : 
  {
    screen: SearchListScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  VerificationScreen:
  {
    screen: VerificationScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  LoginScreen:
  {
    screen: LoginScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  EnterpassScreen:
  {
    screen: EnterpassScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  
 
  ForgetScreen:
  {
    screen: ForgetScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  PatientCodeScreen: {
    screen: PatientCodeScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  ThankUScreen: {
    screen: ThankUScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  DealScreen: {
    screen: DealScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  DealsModelScreen: {
    screen: DealsModelScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },

  VisitsScreen: {
    screen: VisitsScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },

});
/*
const DrawerNavigator = createDrawerNavigator(
    {
      Home: {
        screen: Navigator,
        navigationOptions: ({ navigation }) => ({
          //drawerLockMode: "locked-closed"
        })
      },
      
    },
    {
      contentComponent: SideBar,
      drawerWidth:width*0.65,
      drawerPosition: 'left'
    }
  );
*/
export default createAppContainer(Navigator);
