
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


import SearchScreen from '../Screens/SearchScreen/Search';
import SearchListScreen from '../Screens/SearchScreen/SearchList';
import DispenseScreen from '../Screens/SearchScreen/DispenseScreen';

import Others from '../Screens/Others/Others';
import JobsScreen from '../Screens/Others/Jobs';
import AboutScreen from '../Screens/Others/About';
import ContactScreen from '../Screens/Others/Contact';
import EmergencyScreen from '../Screens/Others/Emergency';

import ProfileScreen from '../Screens/ProfileScreen/Profile';
import EditMedicalScreen from '../Screens/ProfileScreen/EditMedicalData';
import EditPassScreen from '../Screens/ProfileScreen/EditPassword';
import EditProfileScreen from '../Screens/ProfileScreen/EditUserData';
import UserManagementScreen from '../Screens/ProfileScreen/UserManagement';

import NewUserScreen from '../Screens/NewUserScreen/newUser';
import ThanksDispense from '../Screens/SearchScreen/ThanksDispense';
import MyOrderScreen from '../Screens/MyOrderScreen/myOrder';

import SignUpHaveCode from '../Screens/SignupScreen/SignUpHaveCode';

import Upload from '../Screens/LoginScreen/Upload';

import SideBar from './SideBar';

import { Dimensions, I18nManager } from 'react-native';
const { height, width } = Dimensions.get("window");

const Navigator = createStackNavigator({

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

  SignUpHaveCode:
 {
   screen: SignUpHaveCode,
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
  
  

 
  ProfileScreen:
  {
    screen: ProfileScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
   },
   

   NewUserScreen:
 {
   screen: NewUserScreen,
   navigationOptions:
   {
     headerMode: 'none',
     header: null,
     drawerLockMode: 'locked-closed'
   },
 },
  
 DispenseScreen:
 {
   screen: DispenseScreen,
 navigationOptions:
   {
     headerMode: 'none',
     header: null,
     drawerLockMode: 'locked-closed'
   },
  },
  


 
 
 Others:
 {
   screen: Others,
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


  JobsScreen:
 {
   screen: JobsScreen,
   navigationOptions:
   {
     headerMode: 'none',
     header: null,
     drawerLockMode: 'locked-closed'
   },
  },
  

  AboutScreen:
 {
   screen: AboutScreen,
   navigationOptions:
   {
     headerMode: 'none',
     header: null,
     drawerLockMode: 'locked-closed'
   },
  },
  

  ContactScreen:
 {
   screen: ContactScreen,
   navigationOptions:
   {
     headerMode: 'none',
     header: null,
     drawerLockMode: 'locked-closed'
   },
  },
  
  EmergencyScreen:
  {
    screen: EmergencyScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },


  EditMedicalScreen:
  {
    screen: EditMedicalScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  
  EditPassScreen:
  {
    screen: EditPassScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  
  EditProfileScreen:
  {
    screen: EditProfileScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },
  
  
  UserManagementScreen:
  {
    screen: UserManagementScreen,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },

  ThanksDispense:
  {
    screen: ThanksDispense,
    navigationOptions:
    {
      headerMode: 'none',
      header: null,
      drawerLockMode: 'locked-closed'
    },
  },

MyOrderScreen : {
    screen: MyOrderScreen,
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
