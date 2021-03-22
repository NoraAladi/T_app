import React, { useState } from "react";
import { View, Image, ImageBackground, StatusBar, Dimensions, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Container, Text, Form, Item, Label, Input, Icon, Content, Button, Thumbnail, Header, Left, Body, Right, Title, CardItem, Card } from "native-base";
import { withNavigation } from "react-navigation"
import g from '../Gloabal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import i18n from '../i18n';
import style from '../Screens/DealsScreen/style';
const { width, height } = Dimensions.get("window");


function Footer({ navigation, tab }) {

  //const [tab, setTab] = useState(tab);
  // const [tab, setTab] = useState(1);

  const Offers = () => {
    //   setTab(1);
    navigation.navigate('DealScreen');
  }
  const Visits = () => {
    //  setTab(2);
    navigation.navigate('VisitsScreen');

  }
  const Search = () => {
    navigation.navigate('SearchScreen');
  }
  const MyOrders = () => {
    //  setTab(4);
    navigation.navigate('MyOrderScreen');

  }
  const Secvices = () => {
    navigation.navigate('Others');
  }

  return (
    <View
      style={{paddingTop: 30, }}>
      <View style={{
        position: 'absolute',
        elevation: 5, zIndex: 10,
        width: '15%',
        height: 50,
        Left: '42.5%', right: '42.5%', top: 0
      }}
        onStartShouldSetResponder={Search}
      />
      <View
        style={{
          flexDirection: 'row', justifyContent: 'center',
          // height: Platform.OS == "android" ? 55 : 70,
          backgroundColor: g.white,
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.37,
          shadowRadius: 3.49,
          elevation: 4,
          paddingHorizontal: 5,
          paddingVertical: 5


        }}>


        <View style={{  flexDirection: 'row', justifyContent: 'space-between' }} >
          <TouchableOpacity style={{
     
            borderColor: tab == 5 ? g.Blue : null, borderTopWidth: tab == 5 ? 2 : 0,
            justifyContent: 'center',marginTop:-5,
            alignContent: 'center', alignItems: 'center', width: g.windowWidth / 7
          }}
            onPress={Secvices}>
            <Image
              source={tab == 5 ? require('../Images/servicesActive.png') : require('../Images/servicesDeactivate.png')}
              style={{ width: 30, height: 30 }}
              resizeMode='contain'

            />
            <Text style={{
              fontFamily: g.Regular, marginTop: hp('-.5%'), color: tab == 5 ? g.Blue : 'black',
              marginLeft: 0, textAlign: 'center', fontSize: 12
            }}>{i18n.t(g.SERVISE)}</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{
            marginTop:-5,
            borderColor: tab == 4 ? g.Blue : null, borderTopWidth: tab == 4 ? 2 : 0,
            justifyContent: 'center',
            alignContent: 'center', alignItems: 'center', width: g.windowWidth / 7
          }}
            onPress={MyOrders}>
            <Image
              source={tab == 4 ? require('../Images/myOrdersActive.png') : require('../Images/myOrdersDeactivate.png')}
              style={{ width: 30, height: 30 }}
              resizeMode='contain'

            />
            <Text style={{
              fontFamily: g.Regular, marginTop: hp('-.5%'), color: tab == 4 ? g.Blue : 'black',
              marginLeft: 0, textAlign: 'center', fontSize: 12
            }}>{i18n.t(g.REQUEST)}</Text>

          </TouchableOpacity>

        </View>
        <TouchableOpacity
          activeOpacity={.9}
          onPress={Search}
          style={{ flex: 1 }}>
          <View style={{
            justifyContent: 'flex-start',
            alignItems: "center",
          }}
            onStartShouldSetResponder={Search}
          >


            <View style={[style.container, {
              zIndex: 20,
              height: 50,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              marginTop: -30,
            }]}
              onStartShouldSetResponder={Search}

            >

              <Icon
                type="AntDesign"
                name="search1" style={{
                  fontSize: 22, marginTop: hp('0%'), color: tab == 3 ? g.Blue : 'black'
                }}
              />


            </View>

            <Text style={{
              fontFamily: g.Regular, marginTop: Platform.OS == "android" ? hp('-1%') : 0,
              marginLeft: 0, color: tab == 3 ? g.Blue : 'black'
            }}>{i18n.t(g.SEARCH)}</Text>

          </View>
        </TouchableOpacity>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }} >

          <TouchableOpacity style={{
            marginTop:-5,
            borderColor: tab == 2 ? g.Blue : null, borderTopWidth: tab == 2 ? 2 : 0,
            justifyContent: 'center',
            alignContent: 'center', alignItems: 'center', width: g.windowWidth / 7
          }}
            onPress={Visits}>
            <Image
              source={tab == 2 ? require('../Images/medicalVisitsActive.png') : require('../Images/medicalVisitsDeactivate.png')}
              style={{ width: 30, height: 30 }}
              resizeMode='contain'

            />
            <Text style={{
              fontFamily: g.Regular, marginTop: hp('-.5%'), color: tab == 2 ? g.Blue : 'black',
              marginLeft: 0, textAlign: 'center', fontSize: 12
            }}>{i18n.t('ملفي')}</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{
            marginTop:-5,
            borderColor: tab == 1 ? g.Blue : null, borderTopWidth: tab == 1 ? 2 : 0,
            justifyContent: 'center',
            alignContent: 'center', alignItems: 'center', width: g.windowWidth / 7
          }}
            onPress={Offers}>
            <Image
              source={tab == 1 ? require('../Images/dealsActive.png') : require('../Images/dealsDeactivate.png')}
              style={{ width: 30, height: 30 }}
              resizeMode='contain'

            />
            <Text style={{
              fontFamily: g.Regular, marginTop: hp('-.5%'), color: tab == 1 ? g.Blue : 'black',
              marginLeft: 0, textAlign: 'center', fontSize: 12
            }}>{i18n.t(g.offer)}</Text>

          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
export default withNavigation(Footer)