import style from '../Screens/Others/style';
import React, { Component } from 'react';
import {
    View, Image, Text, Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import g from '../Gloabal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class HeaderNav extends Component {

    render() {
        return (
            <View
                onStartShouldSetResponder={() => {
                    this.props.navigation.pop()
                }}
                style={style.head}>
                <Icon name='arrowright' type='AntDesign' style={[style.icon,{ 
                    marginTop: Platform.OS == "android" ? 8 : 40,fontSize: 22,}]} />
                <Text style={[style.txtBold,{paddingHorizontal: 10,fontSize:18 , 
                marginTop : Platform.OS == "android" ? 0 : 30}]}>{this.props.title}</Text>

            </View>
        );

    }
}
export default withNavigation(HeaderNav);
