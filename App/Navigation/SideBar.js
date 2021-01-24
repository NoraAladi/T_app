import React from "react";
import {
  Image,
  Dimensions,
  TouchableOpacity,
  View, I18nManager
} from "react-native";

import {
  Text,
  Icon,
} from "native-base";
import { withNavigation, NavigationActions, StackActions } from "react-navigation"
import AsyncStorage from "@react-native-community/async-storage";
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

function SideBar({ navigation }) {
  const { t, i18n } = useTranslation();

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({
      routeName: 'HomeScreen',      // name of the screen you want to navigate
      params: {
        login_: true,
        signup_: false
        // this second parameter is for sending the params
      }
    })],
  });

  const logout = () => {
    navigation.dispatch(resetAction);
  }

  return (
    <>
      <View style={{
        backgroundColor: '#227D6E',
        flex: 1,
        paddingTop: 38,
        paddingRight: 25
      }}>

        <TouchableOpacity onPress={() => {
          navigation.closeDrawer()
          navigation.navigate('HomeScreen')

        }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: 'flex-end',
              alignItems: "center",
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: "#FFFFFF",
                  fontFamily: "Cairo",
                  marginLeft: 30,
                  marginRight: 20
                }}
              >
                الصفحة الرئيسية
            </Text>
            </View>
            <Icon name='home' type='MaterialIcons' style={{ fontSize: 25, color: 'white' }} />

            {/**<Image
              source={require('../Images/sidehome.png')}
              style={{
                width: 25, height: 25
              }}
              resizeMode="contain"
            /> */}


          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
             i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
             .then(() => {
            I18nManager.forceRTL(i18n.language === 'ar');
             RNRestart.Restart();
             });
            
  }} >
          <View
            style={{
              flexDirection: "row",
              justifyContent:'flex-end',
              alignItems: "center",
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
          <View>
            <Text
              style={{
                fontSize: 15,
                color: "#FFFFFF",
                fontFamily: "Cairo",
                marginLeft:30,
                marginRight:20,
                fontFamily:"Cairo"
              }}
            >
               {t('تغيير اللغة')}
            </Text>
          </View>

          <Icon name='language' type='MaterialIcons' style={{fontSize:25,color:'white'}} />


      </View>
    </TouchableOpacity>
      </View>


    </>
  )
};

export default withNavigation(SideBar)