import styles from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform,
    AppState, ImageBackground, I18nManager, Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';

class DataHidden extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={{
                alignItems: 'center', justifyContent: 'center'
                , marginBottom: 'auto', marginTop: 'auto',
            }}>



                <Image
                    style={{ marginTop: 25, width: 175, height: 175, marginTop: 100, }}
                    resizeMode='contain'
                    source={require('../../Images/dataHidden.png')} />
                <Text style={[styles.username, { marginTop: hp('0%'), marginLeft: 0, marginRight: 0,fontSize:16 }]}>
                    {g.HIDE_DONE}
                </Text>

            </View>
        );

    }
}
export default withNavigation(DataHidden);
